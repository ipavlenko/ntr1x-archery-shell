(function($, Vue, Core, Shell) {

    var runtime = Vue.service('runtime', {

        evaluate: function(self, b, v) {

            if (b && b.expression) {

                try {
                    if (b.strategy == 'eval') {
                        return self.$eval(b.expression);
                    } else if (b.strategy == 'wire') {
                        return _.get(self, b.expression, null);
                    } else {
                        return self.$interpolate(b.expression);
                    }
                } catch (e) {
                    if (b.strategy == 'interpolate') {
                        console.log('Cannot evaluate expression', b.strategy, b.expression, self, e, e.stack);
                        // console.log(e, e.stack);
                        // console.log(self);
                    }
                    return v;
                }
            }

            return v;
        },

        evaluateParams: function(self, props, params) {

            let items = [];
            // console.log(props, params);
            if (props) {
                for (let i = 0; i < props.length; i++) {
                    let prop = props[i];
                    let param = params && params[prop.name];
                    items.push({
                        prop: prop,
                        param: param,
                    });
                }
            }

            let value = {};
            for (let i = 0; i < items.length; i++) {

                let item = items[i];

                let n = item.prop.name;
                let r = item.prop.variable;
                let t = item.prop.type;

                let b = item.param ? item.param.binding : null;
                let v = item.param ? item.param.value : null;
                let p = item.param ? item.param.proto : null;

                if (item.prop.type == 'asis') {

                    let res = runtime.evaluate(self, b, v);
                    let vv = r ? { value: res } : res;
                    // console.log(n, b, v, vv, item);
                    value[n] = vv;

                } else if (item.prop.type == 'object') {

                    let vv;

                    if (b && b.expression) {

                        vv = runtime.evaluate(self, b, v);
                        value[n] = vv;

                    } else {

                        let res = this.evaluateParams(self, item.prop.props, v);
                        vv = r ? { value: res } : res;

                        value[n] = vv;
                    }

                } else if (item.prop.type == 'multiple') {

                    if (b && b.expression) {

                        var vv = null;

                        var array = [];
                        var result = runtime.evaluate(self, b, v);

                        if (r) {
                            vv = result;
                        } else {

                            if (Array.isArray(result)) {

                                for (var j = 0; j < result.length; j++) {

                                    var vm = new Vue({
                                        data: Object.assign(JSON.parse(JSON.stringify(self.$data)), {
                                            item: result[j]
                                        })
                                    });

                                    array.push(this.evaluateParams(vm, item.prop.props, p));
                                }

                                vv = array;
                            }
                        }

                    } else {

                        var array = [];

                        var index = 0;
                        if (Array.isArray(v)) {
                            for(var j = 0; j < v.length; j++) {
                                var vi = v[j];
                                if (vi._action != 'remove') {
                                    array[index++] = this.evaluateParams(self, item.prop.props, vi);
                                }
                            }
                        }

                        vv = r ? { value: array } : array;
                    }

                    value[n] = vv;

                } else {

                    var vv = runtime.evaluate(self, b, v);
                    value[n] = vv || '';
                }
            }

            return value;
        }
    });

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

                this.$store.commit('modals/show', {
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
                bindings: this.bindings,
            };
        },

        created: function() {

            this.$watch('data', () => {
                var bindings = runtime.evaluateParams(this, this.widget.props, this.model.params);
                this.bindings = bindings;
            }, {
                deep: true,
                immediate: true,
            });

            this.$watch('storage', () => {
                var bindings = runtime.evaluateParams(this, this.widget.props, this.model.params);
                this.bindings = bindings;
            }, {
                deep: true,
                immediate: true,
            });

            this.$watch('model', (model) => {
                try {
                    var bindings = runtime.evaluateParams(this, this.widget.props, model.params)
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

    let CompositeMixin = {

        computed: {

            children: function() {

                return this.items.length > 0
                    ? [ ...this.items ]
                    : [ JSON.parse(JSON.stringify(this.placeholder())) ]
            }
        },

        events: {

            removeChildWidget: function(data) {

                let item = data.item;

                if (item._action == 'create') {
                    let index = this.items.indexOf(item);
                    this.items.splice(index, 1);
                } else {
                    item._action = 'remove';
                }

                // this.items = this.items.slice();
            },
        },
    };

    let SortableMixin = {

        data: function() {
            return {
                selected: this.selected
            }
        },
        created: function() {
            this.selected = false;
        },
        methods: {
            selectTarget: function() {
                this.selected = true;
            },

            unselectTarget: function() {
                this.selected = false;
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
        },
        created: function() {
            this.selected = true;
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

                vertical: true,
                drop: true,

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

                        let newItem = self.$store.getters.palette.item(w);

                        self.$store.commit('designer/widgets/insert', {
                            parent: newStack.model,
                            widget: newItem,
                            index: newIndex
                        });

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

                            self.$store.commit('designer/widgets/insert', {
                                parent: newStack.model,
                                widget: newItem,
                                index: newIndex
                            });

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
        methods: {
            placeholder: function() {
                return this.$store.getters.palette.placeholder(`
                    <small>Vertical Stack</small>
                    <div>Drop Here</div>
                `);
            }
        },
    });

})(jQuery, Vue, Core, Shell);
