(function($, Vue) {

    var DecoratorMixin = {

        computed: {
            children: function() {
                return this.model.widgets;
            }
        },
        methods: {

            removeWidget: function() {
                this.$store.commit('designer/widgets/remove', { parent: this.stack, widget: this.model });
            },

            showSettings: function() {

                this.$store.commit('modals/editor/show', {
                    name: 'shell-widgets-dialog',
                    context: { type: 'update', widget: this.widget },
                    original: this.model,
                    events: {
                        submit: (current) => { this.$store.commit('designer/params/update', { model: this.model, value: current }) },
                    }
                })
            },
        },
    };

    var BindingsMixin = {

        data: function() {
            return {
                bindings: this.bindings
            };
        },

        created: function() {

            this.$watch('$page', () => {
                try {
                    var bindings = this.$runtime.evaluateParams(this, this.widget.props, this.model.params);
                    this.bindings = bindings;
                } catch (e) {
                    console.log(e, e.stack);
                }
            }, {
                deep: true,
                immediate: true,
            });

            this.$watch('model', (model) => {
                try {
                    var bindings = this.$runtime.evaluateParams(this, this.widget.props, model.params)
                    this.bindings = bindings;
                } catch (e) {
                    console.log(e, e.stack);
                }
            }, {
                deep: true,
                immediate: true,
            });
        }
    };

    var SettingsMixin = {

        data: function() {
            return {
                settings: null
            };
        },

        created: function() {

            this.$watch('$page', () => {
                try {
                    var settings = this.$runtime.evaluateOverrides(this, this.model, this.model.overrides);
                    this.settings = settings;
                } catch (e) {
                    console.log(e, e.stack);
                }
            }, {
                deep: true,
                immediate: true,
            });

            this.$watch('model', (model) => {
                try {
                    var settings = this.$runtime.evaluateOverrides(this, model, model.overrides)
                    this.settings = settings;
                } catch (e) {
                    console.log(e, e.stack);
                }
            }, {
                deep: true,
                immediate: true,
            });
        }
    };

    let CompositeMixin = {

        computed: {

            children: function() {

                return this.items.length > 0
                    ? [ ...this.items ]
                    : [ JSON.parse(JSON.stringify(this.placeholder())) ]
            }
        },
    };

    let SortableMixin = {

        methods: {
            selectTarget: function() {
                this.$store.commit('designer/property/update', {
                    parent: this.model.designer,
                    property: 'unlocked',
                    value: true
                })
            },

            unselectTarget: function() {
                this.$store.commit('designer/property/update', {
                    parent: this.model.designer,
                    property: 'unlocked',
                    value: false
                })
            },
        }
    };

    Vue.component('shell-decorator-stub', {
        template: '#shell-decorator-stub',
        mixins: [ DecoratorMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
        },
    });

    Vue.component('shell-decorator-widget', {
        template: '#shell-decorator-widget',
        mixins: [ DecoratorMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
        },
    });

    Vue.component('shell-decorator-frame', {
        template: '#shell-decorator-frame',
        mixins: [ DecoratorMixin, BindingsMixin, SettingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
        },
    });

    Vue.component('shell-decorator-horizontal', {
        template: '#shell-decorator-horizontal',
        mixins: [ DecoratorMixin, CompositeMixin, SortableMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
        },
        computed: {
            items: function() {
                return this.model.widgets
            }
        },
        methods: {
            placeholder: function() {
                return this.$store.getters.palette.placeholder(`
                    <small>Horizontal Stack</small>
                    <div>Drop Here</div>
                `);
            }
        },
    });

    Vue.component('shell-decorator-vertical', {
        template: '#shell-decorator-vertical',
        mixins: [ DecoratorMixin, CompositeMixin, SortableMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean
        },
        computed: {
            items: function() {
                return this.model.widgets
            }
        },
        methods: {
            placeholder: function() {
                return this.$store.getters.palette.placeholder(`
                    <small>Vertical Stack</small>
                    <div>Drop Here</div>
                `);
            }
        },
    });

    Vue.component('shell-decorator-canvas', {
        template: '#shell-decorator-canvas',
        mixins: [ CompositeMixin, SortableMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
            scalable: Boolean,
        },
        computed: {
            items: function() {
                return this.page.root.widgets
            }
        },
        mounted: function() {

            if (!this.$route || !this.$route.meta.private) {
                return;
            }

            var dragged;

            let self = this;

            this.sortable = $(this.$el).sortable({

                drop: true,
                offset: 'position',

                containerSelector: '.wg.wg-sortable-container.wg-sortable-editable',
                itemSelector: '.wg.wg-sortable-item.wg-sortable-editable',
                excludeSelector: '.ge.ge-overlay, .dropdown-menu',

                verticalClass: 'wg-sortable-vertical',
                horizontalClass: 'wg-sortable-horizontal',
                placeholder: `
                    <div class="wg wg-sortable-placeholder">
                        <div class="wg wg-placeholder-container">
                            <div class="wg wg-placeholder-inner"></div>
                        </div>
                    </div>
                `,
                onDragStart: function(context, event, _super) {

                    _super(context, event);

                    let stack = $(context.$container).closest('.ge.ge-widget').get(0).__vue__;
                    let vue = context.$originalItem.find('.ge.ge-widget:first').get(0).__vue__;

                    dragged = {
                        stack: stack,
                        index: stack.items.indexOf(vue.model),
                        vue: vue,
                    };
                },
                onDrop: function(context, event, _super) {

                    _super(context, event);

                    let vue = context.location.$item.find('.ge.ge-widget:first').get(0).__vue__
                    let newStack = context.location.$container.closest('.ge.ge-widget').get(0).__vue__;

                    let newIndex = newStack.items.indexOf(vue.model) + (context.location.before ? 0 : 1);

                    let w = context.$item.data('widget');

                    if (w) {

                        self.$store.getters
                            .produce(w)
                            .then(newItem => {

                                if (newStack.model.designer.fill) {

                                    self.$store.commit('designer/widgets/clear', {
                                        parent: newStack.model
                                    });

                                    self.$store.commit('designer/widgets/insert', {
                                        parent: newStack.model,
                                        widget: newItem,
                                        index: 0
                                    });

                                } else {

                                    self.$store.commit('designer/widgets/insert', {
                                        parent: newStack.model,
                                        widget: newItem,
                                        index: newIndex
                                    });
                                }
                            })
                            .catch(() => {})

                    } else if (dragged) {

                        let oldStack = dragged.stack;
                        let oldIndex = dragged.index;
                        let oldItem = dragged.vue.model;

                        let newItem = Object.assign(JSON.parse(JSON.stringify(dragged.vue.model)));

                        if (oldStack != newStack) {

                            self.$store.commit('designer/widgets/remove', {
                                parent: oldStack.model,
                                widget: oldItem
                            });

                            if (newStack.model.designer.fill) {

                                self.$store.commit('designer/widgets/clear', {
                                    parent: newStack.model
                                });

                                self.$store.commit('designer/widgets/insert', {
                                    parent: newStack.model,
                                    widget: newItem,
                                    index: 0
                                });

                            } else {

                                self.$store.commit('designer/widgets/insert', {
                                    parent: newStack.model,
                                    widget: newItem,
                                    index: newIndex
                                });
                            }

                        } else if (newIndex != oldIndex && newIndex != oldIndex + 1) {

                            if (newIndex < oldIndex) {

                                self.$store.commit('designer/widgets/remove', {
                                    parent: oldStack.model,
                                    widget: oldItem
                                });

                                self.$store.commit('designer/widgets/insert', {
                                    parent: newStack.model,
                                    widget: newItem,
                                    index: newIndex
                                });

                            } else if (newIndex > oldIndex) {

                                self.$store.commit('designer/widgets/remove', {
                                    parent: oldStack.model,
                                    widget: oldItem
                                });

                                self.$store.commit('designer/widgets/insert', {
                                    parent: newStack.model,
                                    widget: newItem,
                                    index: newIndex - 1
                                });
                            }
                        }
                    }

                    context.$item.remove();
                }
            });
        },
        beforeDestroy() {
            this.sortable.sortable('destroy')
            this.sortable = null
        },
        methods: {
            placeholder: function() {
                return this.$store.getters.palette.placeholder(`
                    <small>Vertical Stack</small>
                    <div>Drop Here</div>
                `);
            }
        },
    });

    Vue.component('shell-decorator-repeater-vertical', {
        template: '#shell-decorator-repeater',
        mixins: [ DecoratorMixin, CompositeMixin, SortableMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean
        },
        computed: {
            items: function() {
                return this.model.widgets
            },
            children: function() {

                return this.items.length > 0
                    ? [ ...this.items ]
                    : [ JSON.parse(JSON.stringify(this.placeholder())) ]
            },
        },
        methods: {
            placeholder: function() {
                return this.$store.getters.palette.placeholder(`
                    <small>Vertical Repeater</small>
                    <div>Drop Here</div>
                `);
            }
        },
    });

    Vue.component('shell-decorator-repeater-horizontal', {
        template: '#shell-decorator-repeater',
        mixins: [ DecoratorMixin, CompositeMixin, SortableMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean
        },
        computed: {
            items: function() {
                return this.model.widgets
            },
            children: function() {

                return this.items.length > 0
                    ? [ ...this.items ]
                    : [ JSON.parse(JSON.stringify(this.placeholder())) ]
            },
        },
        methods: {
            placeholder: function() {
                return this.$store.getters.palette.placeholder(`
                    <small>Horizontal Repeater</small>
                    <div>Drop Here</div>
                `);
            }
        },
    });

    Vue.component('shell-decorator-layers', {
        template: '#shell-decorator-layers',
        mixins: [ DecoratorMixin, CompositeMixin, SortableMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean
        },
        computed: {
            items: function() {
                return this.model.widgets
            },
            children: function() {
                return this.items
            },
        },
    });

    Vue.component('shell-decorator-layers-item', {
        template: '#shell-decorator-layers-item',
        mixins: [ DecoratorMixin, CompositeMixin, SortableMixin, BindingsMixin ],
        props: {
            stack: Object,
            page: Object,
            model: Object,
            widget: Object,
            editable: Boolean
        },
        computed: {
            items: function() {
                return this.model.widgets
            },
            children: function() {

                if (!(this.stack.widgets && this.stack.widgets.length)) {
                    return [ ...this.stack.widgets ]
                }

                let last = null
                for (let i = this.stack.widgets.length - 1; i >= 0; i--) {
                    let w = this.stack.widgets[i]
                    if (!(w.designer && w.designer.hidden)) {
                        last = w
                        break
                    }
                }

                return (this.items.length > 0 || last != this.model)
                    ? [ ...this.items ]
                    : [ JSON.parse(JSON.stringify(this.placeholder())) ]
            },
        },
        methods: {
            placeholder: function() {
                return this.$store.getters.palette.placeholder(`
                    <small>Front Layer</small>
                    <div>Drop Here</div>
                `);
            }
        },
    });

})(jQuery, Vue);
