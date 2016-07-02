var Shell =
(function($, Vue, Core) {

    Shell = {};

    return Shell;

})(jQuery, Vue, Core);

(function(Vue, $, Core, Shell) {

    var ModalEditor =
    Vue.component('bindings-dialog', {
        template: '#bindings-dialog',
        mixins: [Core.ModalEditorMixin],
        methods: {
            setStrategy: function(strategy) {
                this.$set('current.binding.strategy', strategy);
            },
            getStrategy: function(strategy) {
                return this.$get('current.binding.strategy');
            },
        },
        created: function() {
            if (!this.current.binding) this.current.binding = {};
        },
    });

    var Editor =
    Vue.component('bindings', {

        mixins: [Core.ActionMixin(ModalEditor)],
    });

})(Vue, jQuery, Core, Shell);

(function(Vue, $, Core, Shell) {

    var ListViewer =
    Vue.component('domains-list', {
        template: '#domains-list',
        mixins: [Core.ListViewerMixin],
    });

    var ModalEditor =
    Vue.component('domains-dialog', {
        template: '#domains-dialog',
        mixins: [Core.ModalEditorMixin, Core.TabsMixin('main')],
    });

    var Editor =
    Vue.component('domains', {
        mixins: [Core.EditorMixin(ListViewer, ModalEditor)],
        template: '#domains',
    });


    var SettingsListViewer =
    Vue.component('domains-settings-list', {
        template: '#domains-settings-list',
        mixins: [Core.ListViewerMixin],
    });

    var SettingsModalEditor =
    Vue.component('domains-settings-dialog', {
        template: '#domains-settings-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var SettingsEditor =
    Vue.component('domains-settings', {
        mixins: [Core.EditorMixin(SettingsListViewer, SettingsModalEditor)],
        template: '#domains-settings',
    });

})(Vue, jQuery, Core, Shell);

(function(Vue, $, Core, Shell) {

    var ListViewer =
    Vue.component('pages-list', {
        template: '#pages-list',
        mixins: [Core.ListViewerMixin],
    });

    var ModalEditor =
    Vue.component('pages-dialog', {
        template: '#pages-dialog',
        mixins: [Core.ModalEditorMixin, Core.TabsMixin('main')],
    });

    var Editor =
    Vue.component('pages', {
        mixins: [Core.EditorMixin(ListViewer, ModalEditor)],
        template: '#pages',
    });


    var SettingsListViewer =
    Vue.component('pages-settings-list', {
        template: '#pages-settings-list',
        mixins: [Core.ListViewerMixin],
    });

    var SettingsModalEditor =
    Vue.component('pages-settings-dialog', {
        template: '#pages-settings-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var SettingsEditor =
    Vue.component('pages-settings', {
        mixins: [Core.EditorMixin(SettingsListViewer, SettingsModalEditor)],
        template: '#pages-settings',
    });


    var MetasListViewer =
    Vue.component('pages-metas-list', {
        template: '#pages-metas-list',
        mixins: [Core.ListViewerMixin],
    });

    var MetasModalEditor =
    Vue.component('pages-metas-dialog', {
        template: '#pages-metas-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var MetasEditor =
    Vue.component('pages-metas', {
        mixins: [Core.EditorMixin(MetasListViewer, MetasModalEditor)],
        template: '#pages-metas',
    });

})(Vue, jQuery, Core, Shell);

(function(Vue, $, Core, Shell) {

    var ListViewer =
    Vue.component('schemes-list', {
        template: '#schemes-list',
        mixins: [Core.ListViewerMixin],
    });

    var ModalEditor =
    Vue.component('schemes-dialog', {
        template: '#schemes-dialog',
        mixins: [Core.ModalEditorMixin, Core.TabsMixin('main')],
    });

    var Editor =
    Vue.component('schemes', {
        mixins: [Core.EditorMixin(ListViewer, ModalEditor)],
        template: '#schemes',
    });


    var SettingsListViewer =
    Vue.component('schemes-settings-list', {
        template: '#schemes-settings-list',
        mixins: [Core.ListViewerMixin],
    });

    var SettingsModalEditor =
    Vue.component('schemes-settings-dialog', {
        template: '#schemes-settings-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var SettingsEditor =
    Vue.component('schemes-settings', {
        mixins: [Core.EditorMixin(SettingsListViewer, SettingsModalEditor)],
        template: '#schemes-settings',
    });

})(Vue, jQuery, Core, Shell);

(function(Vue, $, Core, Shell) {

    var ModalEditor =
    Vue.component('settings-dialog', {
        template: '#settings-dialog',
        mixins: [Core.ModalEditorMixin, Core.TabsMixin('domains')],
    });

    var Editor =
    Vue.component('settings', {
        mixins: [Core.ActionMixin(ModalEditor)],
        props: {
            globals: Object
        },
        methods: {
            push: function() {
                $.ajax({
                    url: '/settings/do-update',
                    method: 'POST',
                    dataType: "json",
                    data: JSON.stringify(this.model),
                    contentType: "application/json",
                })
                .done((d) => {
                    Object.assign(this.model, d);
                })
            },
            pull: function() {
                $.ajax({
                    url: '/settings',
                    method: 'GET',
                    dataType: "json"
                })
                .done((d) => {
                    Object.assign(this.model, d);
                })
            }
        }
    });

})(Vue, jQuery, Core, Shell);

(function(Vue, $, Core, Shell) {

    var ParamString =
    Vue.component('params-string', {
        template: '#params-string',
        props: {
            id: String,
            item: Object,
            globals: Object,
        }
    });

    var ParamRich =
    Vue.component('params-rich', {
        template: '#params-rich',
        props: {
            id: String,
            item: Object,
            globals: Object,
        }
    });

    var ParamSource =
    Vue.component('params-source', {
        template: '#params-source',
        props: {
            id: String,
            item: Object,
            globals: Object,
        }
    });

    var ParamMultiple =
    Vue.component('params-multiple', {
        template: '#params-multiple',
        props: {
            id: String,
            item: Object,
            globals: Object,
        },
        data: function() {
            return {
                items: this.item.items
            }
        },
    });

    var Params =
    Vue.component('params', {
        template: '#params',
        props: {
            owner: Object,
            tab: String,
            items: Array,
            globals: Object
        }
    });


    var ParamMultipleListViewer =
    Vue.component('params-multiple-list', {
        template: '#params-multiple-list',
        mixins: [Core.ListViewerMixin],
        props: {
            prop: Object,
            param: Object,
        },
        methods: {
            getLabel: function(item) {

                if (this.prop.display) {
                    var vm = new Vue({
                        item: item,
                    });
                    return vm.$interpolate(this.prop.display);
                }
                return '<item>';
            },
        }
    });

    var ParamBindingsModalEditor =
    Vue.component('params-bindings-dialog', {
        template: '#params-bindings-dialog',
        mixins: [ Core.ModalEditorMixin, Core.TabsMixin('binding') ],
        data: function() {
            return {
                items: this.items,
            };
        },
        created: function() {

            var items = [];

            var binding = this.current.binding || {};
            if (!binding.strategy) binding.strategy = 'interpolate';

            binding.params = binding.params || {};

            if (this.context.prop.props) {
                for (var i = 0; i < this.context.prop.props.length; i++) {

                    var prop = this.context.prop.props[i];
                    var param = binding.params[prop.name] = binding.params[prop.name] || {};

                    param._action = param._action == 'update'
                        ? 'update'
                        : 'create'
                    ;

                    var item = {
                        prop: prop,
                        param: param,
                    };

                    items.push(item);
                }
            }

            this.$set('current.binding', binding);
            this.$set('items', items);
        },
        methods: {
            setStrategy: function(strategy) {
                this.$set('current.binding.strategy', strategy);
            },
            getStrategy: function(strategy) {
                return this.$get('current.binding.strategy');
            },
        },
    });

    var Editor =
    Vue.component('params-bindings', {
        mixins: [Core.ActionMixin(ParamBindingsModalEditor)],
    });

    var ParamMultipleModalEditor =
    Vue.component('params-multiple-dialog', {
        template: '#params-multiple-dialog',
        mixins: [Core.ModalEditorMixin, Core.TabsMixin('data')],
        data: function() {
            return {
                items: this.items,
            };
        },
        created: function() {

            var items = [];

            console.log('created', ParamMultipleModalEditor);

            for (var i = 0; i < this.context.prop.props.length; i++) {

                var prop = this.context.prop.props[i];
                var param = this.current[prop.name] = this.current[prop.name] || { value: null };

                param._action = param._action == 'update'
                    ? 'update'
                    : 'create'
                ;

                var item = {
                    prop: prop,
                    param: param,
                };

                items.push(item);
            }

            this.$set('items', items);
        },
    });

    var ParamMultipleEditor =
    Vue.component('params-multiple-editor', {
        mixins: [Core.EditorMixin(ParamMultipleListViewer, ParamMultipleModalEditor)],
        template: '#params-multiple-editor',
        props: {
            prop: Object,
            param: Object,
            items: Array,
        },
    });


    var ParamsList =
    Vue.component('params-list', {
        template: '#params-list',
        components: {
            'params-string': ParamString,
            'params-rich': ParamRich,
            'params-source': ParamSource,
            'params-multiple': ParamMultiple,
        },
        props: {
            owner: Object,
            tab: String,
            items: Array,
            globals: Object
        }
    });

})(Vue, jQuery, Core, Shell);

(function(Vue, $, Core, Shell) {

    var StoragesListViewer =
    Vue.component('storages-list', {
        template: '#storages-list',
        mixins: [Core.ListViewerMixin],
    });

    var StoragesModalEditor =
    Vue.component('storages-dialog', {
        template: '#storages-dialog',
        mixins: [Core.ModalEditorMixin],
        methods: {
            check: function() {
                console.log('check');
            }
        }
    });

    var StoragesEditor =
    Vue.component('storages', {
        mixins: [Core.EditorMixin(StoragesListViewer, StoragesModalEditor)],
        template: '#storages',
    });

    var StoragesVariablesListViewer =
    Vue.component('storages-variables-list', {
        template: '#storages-variables-list',
        mixins: [Core.ListViewerMixin],
    });

    var StoragesVariablesModalEditor =
    Vue.component('storages-variables-dialog', {
        template: '#storages-variables-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var StoragesVariablesEditor =
    Vue.component('storages-variables', {
        mixins: [Core.EditorMixin(StoragesVariablesListViewer, StoragesVariablesModalEditor)],
        template: '#storages-variables',
    });

})(Vue, jQuery, Core, Shell);

(function(Vue, $, Core, Shell) {

    var ListViewer =
    Vue.component('widgets-list', {
        template: '#widgets-list',
        mixins: [Core.ListViewerMixin],
    });

    var ModalEditor =
    Vue.component('widgets-dialog', {
        template: '#widgets-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var Editor =
    Vue.component('widgets', {
        mixins: [Core.EditorMixin(ListViewer, ModalEditor)],
        template: '#widgets',
    });

})(Vue, jQuery, Core, Shell);

(function($, Vue, Core, Shell) {

    var scale = 1;

    Vue.component('shell-actions', {
        template: '#shell-actions',
        props: {
            model: Object,
            category: Object,
            domain: Object,
            page: Object
        },
        methods: {
            trigger: function(event, item, context) {
                this.$dispatch(event, { item: item, context: context });
            },
            zoom: function(event) {
                scale += (event == 'in') ? 0.1 : -0.1;
                $('.ge.ge-page').css('transform', 'scale(' + scale + ')');
            },
        }
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-brand', {
        template: '#shell-brand',
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-container', {
        template: '#shell-container',
        props: {
            globals: Object,
            settings: Object,
            page: Object,
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-categories', {
        template: '#shell-categories',
        props: {
            categories: Array,
            globals: Object,
        },
        methods: {
            trigger: function(event, item, context) {
                this.$dispatch(event, { item: item, context: context });
            },
        }
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    var runtime = Vue.service('runtime', {

        evaluate: function(self, b, v) {

            if (b && b.expression) {

                try {
                    if (b.strategy == 'eval') {
                        var value = self.$eval(b.expression);
                        return value;
                    } else if (b.strategy == 'wire') {
                        var value = self.$get(b.expression);
                        // console.log('value', value, b);
                        return value;
                    } else {
                        return self.$interpolate(b.expression);
                    }
                } catch (e) {
                    console.log('Cannot evaluate expression', b.expression);
                    return v;
                }
            }

            return v;
        },

        evaluateParams: function(self, props, params) {

            var items = [];
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                var param = params && params[prop.name];
                items.push({
                    prop: prop,
                    param: param || {},
                });
            }

            var value = {};
            for (var i = 0; i < items.length; i++) {

                var item = items[i];

                var n = item.prop.name;
                var r = item.prop.variable;
                var b = item.param.binding;
                var v = item.param.value;

                if (item.prop.type == 'object') {
                    // TODO Implement
                } else if (item.prop.type == 'multiple') {

                    if (b && b.expression) {

                        var vv = null;

                        var array = [];
                        var result = runtime.evaluate(self, b, v);

                        if (r) {
                            vv = result;
                        } else {

                            if ($.isArray(result)) {

                                for (var j = 0; j < result.length; j++) {

                                    var vm = new Vue({
                                        data: Object.assign(JSON.parse(JSON.stringify(self.$data)), {
                                            item: {
                                                index: j,
                                                value: result[j],
                                            }
                                        })
                                    });

                                    array.push(this.evaluateParams(vm, item.prop.props, b.params));
                                }

                                vv = array;
                            }
                        }

                    } else {

                        var array = [];

                        var index = 0;
                        for(var j = 0; j < v.length; j++) {
                            var vi = v[j];
                            if (vi._action != 'remove') {
                                array[index++] = this.evaluateParams(self, item.prop.props, vi);
                            }
                        }

                        vv = r ? { value: array } : array;
                    }

                    value[n] = vv;

                } else {

                    var vv = runtime.evaluate(self, b, v);
                    value[n] = vv;
                }
            }

            // console.log(value);
            return value;
        }
    });

    function stub(title, subtitle) {
        return {
            type: 'NTR1XDefaultBundle/Stub',
            _action: 'ignore',
            params: {
                title: { value: title },
                subtitle: { value: subtitle }
            }
        }
    }

    var DecoratorMixin = {

        props: {
            items: Array,
        },

        methods: {

            removeWidget: function() {
                this.$dispatch('removeChildWidget', { item: this.model });
            },

            doApply: function(model) {

                Object.assign(this.model, JSON.parse(JSON.stringify(model)), {
                    _action: this.model._action
                        ? this.model._action
                        : 'update'
                });

                $(window).trigger('resize');
            },

            showSettings: function() {

                var dialog = new Shell.Widgets.ModalEditor({

                    data: {
                        globals: this.globals,
                        owner: this,
                        context: {
                            widget: this.widget
                        },
                        original: this.model,
                        current: JSON.parse(JSON.stringify(this.model))
                    },

                    methods: {
                        submit: function() {
                            this.owner.doApply(this.current);
                            this.$remove();
                            this.$destroy();
                        },
                        reset: function() {
                            this.$remove();
                            this.$destroy();
                        }
                    }
                }).$mount().$appendTo($('body').get(0));
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

            this.$watch('data', (data) => {
                var bindings = runtime.evaluateParams(this, this.widget.props, this.model.params);
                this.$set('bindings', bindings);
            }, {
                deep: true,
                immediate: true,
            });

            this.$watch('storage', (storage) => {
                var bindings = runtime.evaluateParams(this, this.widget.props, this.model.params);
                this.$set('bindings', bindings);
            }, {
                deep: true,
                immediate: true,
            });

            this.$watch('model', (model) => {
                var bindings = runtime.evaluateParams(this, this.widget.props, model.params)
                this.$set('bindings', bindings);
            }, {
                deep: true,
                immediate: true,
            });
        }
    };

    var CompositeMixin = {

        data: function() {
            return {
                children: this.children,
            };
        },

        created: function() {

            this.$watch('items', (items) => {

                var children = [];
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item._action != 'remove') {
                            children.push(item);
                        }
                    }
                }

                if (children.length < 1) {
                    children.push(JSON.parse(JSON.stringify(this.stub())));
                }

                this.children = children;
            }, {
                immediate: true,
                deep: true,
            });
        },

        events: {

            removeChildWidget: function(data) {

                var item = data.item;

                if (item._action == 'create') {
                    this.items.$remove(item);
                } else {
                    item._action = 'remove';
                }

                this.items = this.items.slice();
            },
        },
    };

    var SortableMixin = function (selector) {

        function find(children, domIndex) {

            var index = 0;
            for (var i = 0; i < children.length && index < domIndex; i++) {

                var child = children[i];

                if (child._action != 'remove') {
                    index++;
                }
            }

            return index;
        }

        return {

            data: function() {

                return {
                    selected: this.selected,
                };
            },

            created: function() {

                if (this.$route.private) {

                    var shell = Vue.service('shell');

                    var self = this;
                    this.$watch('selected', function(selected) {

                        if (selected) {

                            self.sortable =
                            Sortable.create($(selector, self.$el).get(0), {

                                group: {
                                    name: 'widgets',
                                    pull: 'clone',
                                },
                                animation: 150,

                                onAdd: function (evt) {

                                    var palette = $(evt.item).closest('.ge.ge-palette');

                                    var w = $(evt.item).data('widget');

                                    if (w) {

                                        if (!palette.length) {

                                            $(evt.item).remove();

                                            var ni = find(self.items, evt.newIndex);

                                            var widget = shell.getWidget(w);

                                            // TODO Initialize params in service layer

                                            self.items.splice(ni, 0, {
                                                type: widget.id,
                                                resource: {
                                                    params: [],
                                                    _action: 'create'
                                                },
                                                params: widget.params
                                                    ? JSON.parse(JSON.stringify(widget.params))
                                                    : {}
                                                ,
                                                widgets: [],
                                                _action: 'create',
                                            });
                                        }

                                    } else {

                                        var dragged = {
                                            vue: evt.from.__dragged__,
                                            item: $('.ge.ge-widget', evt.item),
                                            clone: $('.ge.ge-widget', evt.clone),
                                        };

                                        var container = $(evt.to).closest('.ge.ge-widget').get(0).__vue__;

                                        var ni = find(self.items, evt.newIndex);

                                        var newItem = JSON.parse(JSON.stringify(dragged.vue.model));
                                        newItem._action = 'create';
                                        delete newItem.resource.id;
                                        delete newItem.id;

                                        dragged.item.remove();

                                        container.items.splice(ni, 0, newItem);
                                        container.items = container.items.slice();
                                    }
                                },

                                onStart: function (evt) {
                                    evt.from.__dragged__ = $('.ge.ge-widget', evt.item).get(0).__vue__;
                                },

                                onRemove: function(evt) {

                                    var dragged = {
                                        vue: evt.from.__dragged__,
                                        item: $('.ge.ge-widget', evt.item),
                                        clone: $('.ge.ge-widget', evt.clone),
                                    };

                                    var stack =  dragged.vue.$parent.$parent.$parent;

                                    dragged.clone.remove();

                                    if (dragged.vue.model._action == 'create') {
                                        stack.items.$remove(dragged.vue.model);
                                    } else {
                                        dragged.vue.model._action = 'remove';
                                    }

                                    stack.items = stack.items.slice();
                                },

                                onUpdate: function (evt) {

                                    var oi = self.items.indexOf(evt.from.__dragged__.model);
                                    var ni = find(self.items, evt.newIndex);

                                    if (oi != ni) {
                                        self.items.splice(ni, 0, self.items.splice(oi, 1)[0]);
                                        self.items = self.items.slice();
                                    }
                                },

                                onEnd: function (evt) {

                                    delete evt.from.__dragged__;
                                }
                            });

                        } else {

                            if (self.sortable) {
                                self.sortable.destroy();
                                self.sortable = null;
                            }
                        }
                    }, {
                        immediate: true
                    });
                }
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
    };

    Vue.component('shell-decorator-stub', {
        template: '#shell-decorator-stub',
        mixins: [ DecoratorMixin, BindingsMixin ],
        props: {
            globals: Object,
            settings: Object,
            stack: Object,
            page: Object,
            data: Object,
            storage: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
            items: Array,
        },
    });

    Vue.component('shell-decorator-widget', {
        template: '#shell-decorator-widget',
        mixins: [ DecoratorMixin, BindingsMixin ],
        props: {
            globals: Object,
            settings: Object,
            stack: Object,
            page: Object,
            data: Object,
            storage: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
            items: Array,
        },
    });

    Vue.component('shell-decorator-horisontal', {
        template: '#shell-decorator-horisontal',
        mixins: [ DecoratorMixin, CompositeMixin, SortableMixin('>.ge.ge-content >.wg.wg-default-stack >.wg.wg-content >.wg.wg-table >.wg.wg-row'), BindingsMixin ],
        props: {
            globals: Object,
            settings: Object,
            stack: Object,
            page: Object,
            data: Object,
            storage: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
            items: Array,
        },
        methods: {
            stub: function() { return stub('Horisontal Stack', 'Drop Here'); }
        },
    });

    Vue.component('shell-decorator-vertical', {
        template: '#shell-decorator-vertical',
        mixins: [ DecoratorMixin, CompositeMixin, SortableMixin('>.ge.ge-content >.wg.wg-default-stack >.wg.wg-content >.wg.wg-table'), BindingsMixin ],
        props: {
            globals: Object,
            settings: Object,
            stack: Object,
            page: Object,
            data: Object,
            storage: Object,
            model: Object,
            widget: Object,
            editable: Boolean,
            items: Array,
        },
        methods: {
            stub: function() { return stub('Vertical Stack', 'Drop Here'); }
        },
    });

    Vue.component('shell-decorator-canvas', {
        template: '#shell-decorator-canvas',
        mixins: [ CompositeMixin, SortableMixin('>.ge.ge-content >.wg.wg-default-stack >.wg.wg-content >.wg.wg-table') ],
        props: {
            globals: Object,
            settings: Object,
            stack: Object,
            page: Object,
            data: Object,
            storage: Object,
            editable: Boolean,
            items: Array,
        },
        created: function() {
            this.selected = true;
        },
        methods: {
            stub: function() { return stub('Vertical Stack', 'Drop Here'); }
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-domains', {
        template: '#shell-domains',
        props: {
            domains: Array,
            globals: Object,
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Shell.Loader =
    Vue.component('shell-loader', {
        template: '#shell-loader',
        data: function() {
            return {
                portal: null,
                settings: null,
            }
        },
        created: function() {
            Vue.service('portals').get({ id: this.$route.params.portal }).then(
                (d) => {
                    this.$set('portal', d.data.portal);
                    this.$set('settings', d.data.settings);
                },
                (e) => {
                    console.log(e);
                }
            );
        }
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-pages', {
        template: '#shell-pages',
        props: {
            pages: Array,
            globals: Object,
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-page', {
        template: '#shell-page',
        mixins: [ /*Core.ContainerMixin, Core.SortableMixin*/ ],
        props: {
            globals: Object,
            settings: Object,
            page: Object,
        },
        data: function() {
            return {
                decorator: this.decorator,
                data: this.data,
                storage: this.storage,
                pageSettings: {},
            };
        },
        created: function() {

            var runtime = Vue.service('runtime');

            this.decorator = 'shell-decorator-canvas';
            this.data = {};
            this.storage = {};

            this.$watch('page.resource', (resource) => {
                this.$set('pageSettings.width', '960px'); // default
                if (resource) {
                    for (param in resource.params) {
                        this.$set('pageSettings.' + resource.params[param].name, resource.params[param].value);
                    }
                }
            }, {
                immediate: true,
                deep: true,
            });

            this.$watch('page.storages', (storages) => {

                if (storages) {

                    var storage = {};

                    for (var i = 0; i < storages.length; i++) {

                        var st = storages[i];
                        storage[st.name] = {};

                        for (var j = 0; j < st.variables.length; j++) {

                            var variable = st.variables[j];
                            storage[st.name][variable.name] = {
                                value: runtime.evaluate(this, variable.binding, variable.value) || null
                            };
                        }
                    }

                    this.$set('storage', storage);
                }
            }, {
                immediate: true,
                deep: true,
            });

            this.$watch('page.sources', (sources) => {

                if (sources) {

                    var deferred = [];
                    for (var i = 0; i < sources.length; i++) {
                        deferred.push(this.doRequest(sources[i]));
                    }

                    if (deferred.length > 1) {

                        $.when.apply(this, deferred).done(function() {
                            var data = {};
                            for (var i = 0; i < arguments.length; i++) {
                                data[sources[i].name] = arguments[i][0];
                            }
                            this.$set('data', data);
                        }.bind(this));

                    } else if (deferred.length == 1) {

                        deferred[0].done(function(d) {
                            var data = {};
                            data[sources[0].name] = d;
                            this.$set('data', data);
                        }.bind(this));
                    }
                }

            }, {
                immediate: true,
                deep: true,
            });
        },
        methods: {
            doRequest: function(s) {
                var query = {};
                for (var i = 0; i < s.params.length; i++) {
                    var param = s.params[i];
                    if (param.in == 'query' && param.specified) {

                        var value = param.binding
                                ? this.$interpolate(param.binding) // TODO Interpolate in page context
                                : param.value
                            ;

                        query[param.name] = value;
                    }
                }

                return $.ajax({
                    method: s.method,
                    url: s.url,
                    dataType: "json",
                    data: query,
                });
            }
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    var PaletteItem =
    Vue.component('shell-palette-item', {
        template: '#shell-palette-item',
        props: {
            widget: Object,
            globals: Object,
        },
        computed: {
            thumbnail: function() {
                return '/bundles/' + this.widget.provider.alias + '/' + this.widget.thumbnail.path;
            }
        },
        ready: function() {
            Sortable.create(this.$el, {
                group: {
                    name: 'widgets',
                    pull: 'clone',
                    put: false
                },
                animation: 150,
                sort: false,
            });
        }
    });

    Vue.component('shell-palette', {
        template: '#shell-palette',
        props: {
            globals: Object,
            category: Object,
            categories: Array,
        },
        components: {
            'palette-item': PaletteItem
        },
        methods: {
            trigger: function(event, item, context) {
                console.log(event, item, context);
                this.$dispatch(event, { item: item, context: context });
            },
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Shell.Shell = {
        props: {
            settings: Object,
            model: Object,
        },
        data: function() {
            return {
                globals: this.globals,
            };
        },
        created: function() {

            Vue.service('shell', {

                getWidget: (id) => {

                    for (var i = 0; i < this.settings.widgets.length; i++) {
                        var w = this.settings.widgets[i];
                        if (w.id == id) {
                            return w;
                        }
                    }

                    return null;
                },
            });

            this.globals = {
                selection: {
                    category: null,
                    page: null,
                    source: null,
                    storage: null,
                },
                settings: this.settings,
                model: this.model,
            };
        },
    };

    Shell.ShellPublic =
    Vue.component('shell-public', {
        mixins: [ Shell.Shell ],
        template: '#shell-public',
    });

    Shell.ShellPrivate =
    Vue.component('shell-private', {

        mixins: [ Shell.Shell ],
        template: '#shell-private',

        created: function() {

            function relevant(current, collection) {

                if (!current || current._action == 'remove' || (collection && collection.indexOf(current) < 0)) {

                    if (collection) {
                        for (var i = 0; i < collection.length; i++) {
                            var c = collection[i];
                            if (c._action != 'remove') {
                                return c;
                            }
                        }
                    }

                    return null;
                }

                if (current && current._action == 'remove') {
                    return null;
                }

                return current;
            }

            this.$watch('settings.categories', (categories) => {

                var category = null;
                if (categories.length > 0) {
                    category = categories[0];
                    // var sub = categories[0];
                    // if (categories.length > 0) {
                    //     category = sub.categories[0];
                    // }
                }
                this.globals.selection.category = category;
            }, {
                immediate: true,
            });

            this.$watch('model.domains', (domains) => {
                this.globals.selection.domain = relevant(this.globals.selection.domain, domains);
            }, {
                immediate: true,
            });

            this.$watch('model.pages', (pages) => {
                this.globals.selection.page = relevant(this.globals.selection.page, pages);
            }, {
                immediate: true,
            });

            this.$watch('globals.selection.page.sources', (sources) => {
                this.globals.selection.source = relevant(this.globals.selection.source, sources);
            }, {
                immediate: true,
            });

            this.$watch('globals.selection.page.storages', (storages) => {
                this.globals.selection.storage = relevant(this.globals.selection.storage, storages);
            }, {
                immediate: true,
            });

        },
        methods: {

            getWidget: function(id) {

                for (var i = 0; i < this.settings.widgets.length; i++) {
                    var w = this.settings.widgets[i];
                    if (w.id == id) {
                        return w;
                    }
                }

                return null;
            },
        },
        events: {
            pull: function(data) {
                $.ajax({
                    url: '/settings',
                    method: 'GET',
                    dataType: "json"
                })
                .done((d) => {
                    Object.assign(this.model, d);
                })
            },
            push: function(data) {
                $.ajax({
                    url: '/settings/do-update',
                    method: 'POST',
                    dataType: "json",
                    data: JSON.stringify(this.model),
                    contentType: "application/json",
                })
                .done((d) => {
                    Object.assign(this.model, d);
                })
            },
            selectCategory: function(data) {
                this.globals.selection.category = data.item;
            },
            selectDomain: function(data) {
                this.globals.selection.domain = data.item;
            },
            selectPage: function(data) {
                this.globals.selection.page = data.item;
            },
            selectSource: function(data) {
                this.globals.selection.source = data.item;
            },
            selectStorage: function(data) {
                this.globals.selection.storage = data.item;
            },
        }
    });

})(jQuery, Vue, Core, Shell);

// (function($, Vue, Core, Shell) {
//
//     Vue.component('shell-stacked', {
//         template: '#shell-stacked',
//         mixins: [ Core.Stacked ]
//     });
//
// })(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-sources', {
        template: '#shell-sources',
        props: {
            sources: Array,
            globals: Object,
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-storages', {
        template: '#shell-storages',
        props: {
            storages: Array,
            globals: Object,
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-stub', {
        template: '#shell-stub',
        props: {
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Vue.component('shell-target', {
        template: '#shell-target',
        props: {
        },
    });

})(jQuery, Vue, Core, Shell);

(function($, Vue, Core, Shell) {

    Shell.Widget =
    Vue.component('shell-widget', {
        template: '#shell-widget',
        mixins: [ /* Core.DecoratorMixin, Core.ContainerMixin, Core.SortableMixin, Core.BindingsMixin */ ],
        props: {
            globals: Object,
            settings: Object,
            page: Object,
            stack: Object,
            model: Object,
            data: Object,
            storage: Object,
            editable: Boolean,
        },
        init: function() {
            this.decorators = {
                alternatives: {
                    // 'default-stack-page': function() { Object.assign(this, { selector: '.wg.wg-table', stub: stub('Vertical Stack', 'Drop Here') }) },
                    // 'default-stack-horisontal': function() { Object.assign(this, { selector: '.wg.wg-row', stub: stub('Horisontal Stack', 'Drop Here') }) },
                    // 'default-stack-vertical': function() { Object.assign(this, { selector: '.wg.wg-table', stub: stub('Vertical Stack', 'Drop Here') }) },
                    'default-stack-horisontal': 'shell-decorator-horisontal',
                    'default-stack-vertical': 'shell-decorator-vertical',
                    'default-stub': 'shell-decorator-stub',
                },
                fallback: 'shell-decorator-widget',
            };
        },
        created: function() {

            // console.log('widget');

            var shell = Vue.service('shell');

            this.widget = shell.getWidget(this.model.type);
            this.decorator = this.decorators.alternatives[this.widget.tag] || this.decorators.fallback;

            // console.log(this.$route);
            // this.decorator = 'shell-decorator-stub';
        },
        data: function() {

            return {
                widget: this.widget,
                decorator: this.decorator,
                // items: this.widgets,
            };
        },
    });

})(jQuery, Vue, Core, Shell);

(function(Vue, $, Core, Shell) {

    var WidgetsListViewer =
    Vue.component('pages-widgets-list', {
        template: '#pages-widgets-list',
        mixins: [Core.ListViewerMixin],
        methods: {
            getWidget: function(w) {
                for (var i = 0; i < this.globals.widgets.length; i++) {
                    var widget = this.globals.widgets[i];
                    if (w.type == widget.id) {
                        return widget;
                    }
                }
                return null;
            }
        }
    });

    var WidgetsModalEditor = Shell.Widgets.ModalEditor =
    Vue.component('pages-widgets-dialog', {
        template: '#pages-widgets-dialog',
        mixins: [Core.ModalEditorMixin, Core.TabsMixin('data')],
        created: function() {

            var items = [];

            for (var i = 0; i < this.context.widget.props.length; i++) {

                var prop = this.context.widget.props[i];

                // TODO Move to service layer
                var param = this.current.params[prop.name] = this.current.params[prop.name] || {
                    _action: 'create',
                    value: (prop.type == 'multiple' ? [] : null),
                    binding: {
                        strategy: null,
                        expression: null,
                        params: (prop.type == 'multiple' ? null : undefined),
                    },
                };

                param._action = param._action == 'update'
                    ? 'update'
                    : 'create'
                ;

                var item = {
                    prop: prop,
                    param: param,
                };

                items.push(item);
            }

            this.items = items;
        },
        data: function() {
            return {
                context: this.context,
                items: this.items,
            };
        },
        methods: {

            hasProps: function(tab) {
                if (this.context.widget && this.context.widget.props) {
                    for (var i = 0; i < this.context.widget.props.length; i++) {
                        var prop = this.context.widget.props[i];
                        if (prop.tab == tab) return true;
                    }
                }
                return false;
            }
        }
    });

    var WidgetsEditor =
    Vue.component('pages-widgets', {
        mixins: [Core.EditorMixin(WidgetsListViewer, WidgetsModalEditor)],
        template: '#pages-widgets',
        props: {
            widget: Object
        },
        methods: {

            proto: function(widget) {

                var data = {
                    type: widget.id,
                    params: {},
                    resource: {
                        params: [],
                    }
                };

                var params = {};

                for (var i = 0; i < widget.props.length; i++) {

                    var prop = widget.props[i];
                    // TODO Move to service layer
                    params[prop.name] = {
                        _action: 'create',
                        value: (prop.type == 'multiple' ? [] : null),
                        binding: {
                            strategy: null,
                            expression: null,
                            params: (prop.type == 'multiple' ? null : undefined),
                        },
                    };
                }

                data.params = params;

                return data;
            },
        }
    });

})(Vue, jQuery, Core, Shell);

(function(Vue, $, Core, Shell) {

    var SourcesListViewer =
    Vue.component('pages-sources-list', {
        template: '#pages-sources-list',
        mixins: [Core.ListViewerMixin],
    });

    var SourcesModalEditor =
    Vue.component('pages-sources-dialog', {
        template: '#pages-sources-dialog',
        mixins: [Core.ModalEditorMixin],
        methods: {
            check: function() {
                console.log('check');
            }
        }
    });

    var SourcesEditor =
    Vue.component('pages-sources', {
        mixins: [Core.EditorMixin(SourcesListViewer, SourcesModalEditor)],
        template: '#pages-sources',
    });

    var SourcesParamsListViewer =
    Vue.component('pages-sources-params-list', {
        template: '#pages-sources-params-list',
        mixins: [Core.ListViewerMixin],
    });

    var SourcesParamsModalEditor =
    Vue.component('pages-sources-params-dialog', {
        template: '#pages-sources-params-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var SourcesParamsEditor =
    Vue.component('pages-sources-params', {
        mixins: [Core.EditorMixin(SourcesParamsListViewer, SourcesParamsModalEditor)],
        template: '#pages-sources-params',
    });

})(Vue, jQuery, Core, Shell);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiZWRpdG9yL2JpbmRpbmdzL2JpbmRpbmdzLmpzIiwiZWRpdG9yL2RvbWFpbnMvZG9tYWlucy5qcyIsImVkaXRvci9wYWdlcy9wYWdlcy5qcyIsImVkaXRvci9zY2hlbWVzL3NjaGVtZXMuanMiLCJlZGl0b3Ivc2V0dGluZ3Mvc2V0dGluZ3MuanMiLCJlZGl0b3IvcGFyYW1zL3BhcmFtcy5qcyIsImVkaXRvci9zdG9yYWdlcy9zdG9yYWdlcy5qcyIsImVkaXRvci93aWRnZXRzL3dpZGdldHMuanMiLCJzaGVsbC9hY3Rpb25zL2FjdGlvbnMuanMiLCJzaGVsbC9icmFuZC9icmFuZC5qcyIsInNoZWxsL2NvbnRhaW5lci9jb250YWluZXIuanMiLCJzaGVsbC9jYXRlZ29yaWVzL2NhdGVnb3JpZXMuanMiLCJzaGVsbC9kZWNvcmF0b3IvZGVjb3JhdG9yLmpzIiwic2hlbGwvZG9tYWlucy9kb21haW5zLmpzIiwic2hlbGwvbG9hZGVyL2xvYWRlci5qcyIsInNoZWxsL3BhZ2VzL3BhZ2VzLmpzIiwic2hlbGwvcGFnZS9wYWdlLmpzIiwic2hlbGwvcGFsZXR0ZS9wYWxldHRlLmpzIiwic2hlbGwvc2hlbGwvc2hlbGwuanMiLCJzaGVsbC9zdGFja2VkL3N0YWNrZWQuanMiLCJzaGVsbC9zb3VyY2VzL3NvdXJjZXMuanMiLCJzaGVsbC9zdG9yYWdlcy9zdG9yYWdlcy5qcyIsInNoZWxsL3N0dWIvc3R1Yi5qcyIsInNoZWxsL3RhcmdldC90YXJnZXQuanMiLCJzaGVsbC93aWRnZXQvd2lkZ2V0LmpzIiwiZWRpdG9yL3BhZ2VzL3dpZGdldHMvd2lkZ2V0cy5qcyIsImVkaXRvci9wYWdlcy9zb3VyY2VzL3NvdXJjZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2hlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgU2hlbGwgPVxyXG4oZnVuY3Rpb24oJCwgVnVlLCBDb3JlKSB7XHJcblxyXG4gICAgU2hlbGwgPSB7fTtcclxuXHJcbiAgICByZXR1cm4gU2hlbGw7XHJcblxyXG59KShqUXVlcnksIFZ1ZSwgQ29yZSk7XHJcbiIsIihmdW5jdGlvbihWdWUsICQsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgdmFyIE1vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ2JpbmRpbmdzLWRpYWxvZycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNiaW5kaW5ncy1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTW9kYWxFZGl0b3JNaXhpbl0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBzZXRTdHJhdGVneTogZnVuY3Rpb24oc3RyYXRlZ3kpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNldCgnY3VycmVudC5iaW5kaW5nLnN0cmF0ZWd5Jywgc3RyYXRlZ3kpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRTdHJhdGVneTogZnVuY3Rpb24oc3RyYXRlZ3kpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRnZXQoJ2N1cnJlbnQuYmluZGluZy5zdHJhdGVneScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJyZW50LmJpbmRpbmcpIHRoaXMuY3VycmVudC5iaW5kaW5nID0ge307XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnYmluZGluZ3MnLCB7XHJcblxyXG4gICAgICAgIG1peGluczogW0NvcmUuQWN0aW9uTWl4aW4oTW9kYWxFZGl0b3IpXSxcclxuICAgIH0pO1xyXG5cclxufSkoVnVlLCBqUXVlcnksIENvcmUsIFNoZWxsKTtcclxuIiwiKGZ1bmN0aW9uKFZ1ZSwgJCwgQ29yZSwgU2hlbGwpIHtcclxuXHJcbiAgICB2YXIgTGlzdFZpZXdlciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdkb21haW5zLWxpc3QnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjZG9tYWlucy1saXN0JyxcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkxpc3RWaWV3ZXJNaXhpbl0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgTW9kYWxFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnZG9tYWlucy1kaWFsb2cnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjZG9tYWlucy1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTW9kYWxFZGl0b3JNaXhpbiwgQ29yZS5UYWJzTWl4aW4oJ21haW4nKV0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ2RvbWFpbnMnLCB7XHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5FZGl0b3JNaXhpbihMaXN0Vmlld2VyLCBNb2RhbEVkaXRvcildLFxyXG4gICAgICAgIHRlbXBsYXRlOiAnI2RvbWFpbnMnLFxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHZhciBTZXR0aW5nc0xpc3RWaWV3ZXIgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnZG9tYWlucy1zZXR0aW5ncy1saXN0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI2RvbWFpbnMtc2V0dGluZ3MtbGlzdCcsXHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5MaXN0Vmlld2VyTWl4aW5dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFNldHRpbmdzTW9kYWxFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnZG9tYWlucy1zZXR0aW5ncy1kaWFsb2cnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjZG9tYWlucy1zZXR0aW5ncy1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTW9kYWxFZGl0b3JNaXhpbl0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgU2V0dGluZ3NFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnZG9tYWlucy1zZXR0aW5ncycsIHtcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkVkaXRvck1peGluKFNldHRpbmdzTGlzdFZpZXdlciwgU2V0dGluZ3NNb2RhbEVkaXRvcildLFxyXG4gICAgICAgIHRlbXBsYXRlOiAnI2RvbWFpbnMtc2V0dGluZ3MnLFxyXG4gICAgfSk7XHJcblxyXG59KShWdWUsIGpRdWVyeSwgQ29yZSwgU2hlbGwpO1xyXG4iLCIoZnVuY3Rpb24oVnVlLCAkLCBDb3JlLCBTaGVsbCkge1xyXG5cclxuICAgIHZhciBMaXN0Vmlld2VyID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhZ2VzLWxpc3QnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFnZXMtbGlzdCcsXHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5MaXN0Vmlld2VyTWl4aW5dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIE1vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhZ2VzLWRpYWxvZycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYWdlcy1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTW9kYWxFZGl0b3JNaXhpbiwgQ29yZS5UYWJzTWl4aW4oJ21haW4nKV0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhZ2VzJywge1xyXG4gICAgICAgIG1peGluczogW0NvcmUuRWRpdG9yTWl4aW4oTGlzdFZpZXdlciwgTW9kYWxFZGl0b3IpXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYWdlcycsXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgdmFyIFNldHRpbmdzTGlzdFZpZXdlciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYWdlcy1zZXR0aW5ncy1saXN0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhZ2VzLXNldHRpbmdzLWxpc3QnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTGlzdFZpZXdlck1peGluXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBTZXR0aW5nc01vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhZ2VzLXNldHRpbmdzLWRpYWxvZycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYWdlcy1zZXR0aW5ncy1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTW9kYWxFZGl0b3JNaXhpbl0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgU2V0dGluZ3NFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgncGFnZXMtc2V0dGluZ3MnLCB7XHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5FZGl0b3JNaXhpbihTZXR0aW5nc0xpc3RWaWV3ZXIsIFNldHRpbmdzTW9kYWxFZGl0b3IpXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYWdlcy1zZXR0aW5ncycsXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgdmFyIE1ldGFzTGlzdFZpZXdlciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYWdlcy1tZXRhcy1saXN0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhZ2VzLW1ldGFzLWxpc3QnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTGlzdFZpZXdlck1peGluXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBNZXRhc01vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhZ2VzLW1ldGFzLWRpYWxvZycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYWdlcy1tZXRhcy1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTW9kYWxFZGl0b3JNaXhpbl0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgTWV0YXNFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgncGFnZXMtbWV0YXMnLCB7XHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5FZGl0b3JNaXhpbihNZXRhc0xpc3RWaWV3ZXIsIE1ldGFzTW9kYWxFZGl0b3IpXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYWdlcy1tZXRhcycsXHJcbiAgICB9KTtcclxuXHJcbn0pKFZ1ZSwgalF1ZXJ5LCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbihWdWUsICQsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgdmFyIExpc3RWaWV3ZXIgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2NoZW1lcy1saXN0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3NjaGVtZXMtbGlzdCcsXHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5MaXN0Vmlld2VyTWl4aW5dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIE1vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3NjaGVtZXMtZGlhbG9nJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3NjaGVtZXMtZGlhbG9nJyxcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLk1vZGFsRWRpdG9yTWl4aW4sIENvcmUuVGFic01peGluKCdtYWluJyldLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIEVkaXRvciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdzY2hlbWVzJywge1xyXG4gICAgICAgIG1peGluczogW0NvcmUuRWRpdG9yTWl4aW4oTGlzdFZpZXdlciwgTW9kYWxFZGl0b3IpXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzY2hlbWVzJyxcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgU2V0dGluZ3NMaXN0Vmlld2VyID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3NjaGVtZXMtc2V0dGluZ3MtbGlzdCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzY2hlbWVzLXNldHRpbmdzLWxpc3QnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTGlzdFZpZXdlck1peGluXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBTZXR0aW5nc01vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3NjaGVtZXMtc2V0dGluZ3MtZGlhbG9nJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3NjaGVtZXMtc2V0dGluZ3MtZGlhbG9nJyxcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLk1vZGFsRWRpdG9yTWl4aW5dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFNldHRpbmdzRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3NjaGVtZXMtc2V0dGluZ3MnLCB7XHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5FZGl0b3JNaXhpbihTZXR0aW5nc0xpc3RWaWV3ZXIsIFNldHRpbmdzTW9kYWxFZGl0b3IpXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzY2hlbWVzLXNldHRpbmdzJyxcclxuICAgIH0pO1xyXG5cclxufSkoVnVlLCBqUXVlcnksIENvcmUsIFNoZWxsKTtcclxuIiwiKGZ1bmN0aW9uKFZ1ZSwgJCwgQ29yZSwgU2hlbGwpIHtcclxuXHJcbiAgICB2YXIgTW9kYWxFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2V0dGluZ3MtZGlhbG9nJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3NldHRpbmdzLWRpYWxvZycsXHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5Nb2RhbEVkaXRvck1peGluLCBDb3JlLlRhYnNNaXhpbignZG9tYWlucycpXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2V0dGluZ3MnLCB7XHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5BY3Rpb25NaXhpbihNb2RhbEVkaXRvcildLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGdsb2JhbHM6IE9iamVjdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBwdXNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3NldHRpbmdzL2RvLXVwZGF0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMubW9kZWwpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5tb2RlbCwgZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwdWxsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3NldHRpbmdzJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCBkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pKFZ1ZSwgalF1ZXJ5LCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbihWdWUsICQsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgdmFyIFBhcmFtU3RyaW5nID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhcmFtcy1zdHJpbmcnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFyYW1zLXN0cmluZycsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgaWQ6IFN0cmluZyxcclxuICAgICAgICAgICAgaXRlbTogT2JqZWN0LFxyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3QsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFBhcmFtUmljaCA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYXJhbXMtcmljaCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYXJhbXMtcmljaCcsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgaWQ6IFN0cmluZyxcclxuICAgICAgICAgICAgaXRlbTogT2JqZWN0LFxyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3QsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFBhcmFtU291cmNlID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhcmFtcy1zb3VyY2UnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFyYW1zLXNvdXJjZScsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgaWQ6IFN0cmluZyxcclxuICAgICAgICAgICAgaXRlbTogT2JqZWN0LFxyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3QsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFBhcmFtTXVsdGlwbGUgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgncGFyYW1zLW11bHRpcGxlJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhcmFtcy1tdWx0aXBsZScsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgaWQ6IFN0cmluZyxcclxuICAgICAgICAgICAgaXRlbTogT2JqZWN0LFxyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3QsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLml0ZW0uaXRlbXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgUGFyYW1zID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhcmFtcycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYXJhbXMnLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIG93bmVyOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHRhYjogU3RyaW5nLFxyXG4gICAgICAgICAgICBpdGVtczogQXJyYXksXHJcbiAgICAgICAgICAgIGdsb2JhbHM6IE9iamVjdFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgUGFyYW1NdWx0aXBsZUxpc3RWaWV3ZXIgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgncGFyYW1zLW11bHRpcGxlLWxpc3QnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFyYW1zLW11bHRpcGxlLWxpc3QnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTGlzdFZpZXdlck1peGluXSxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBwcm9wOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHBhcmFtOiBPYmplY3QsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIGdldExhYmVsOiBmdW5jdGlvbihpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcC5kaXNwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZtID0gbmV3IFZ1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZtLiRpbnRlcnBvbGF0ZSh0aGlzLnByb3AuZGlzcGxheSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxpdGVtPic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFBhcmFtQmluZGluZ3NNb2RhbEVkaXRvciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYXJhbXMtYmluZGluZ3MtZGlhbG9nJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhcmFtcy1iaW5kaW5ncy1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogWyBDb3JlLk1vZGFsRWRpdG9yTWl4aW4sIENvcmUuVGFic01peGluKCdiaW5kaW5nJykgXSxcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLml0ZW1zLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBiaW5kaW5nID0gdGhpcy5jdXJyZW50LmJpbmRpbmcgfHwge307XHJcbiAgICAgICAgICAgIGlmICghYmluZGluZy5zdHJhdGVneSkgYmluZGluZy5zdHJhdGVneSA9ICdpbnRlcnBvbGF0ZSc7XHJcblxyXG4gICAgICAgICAgICBiaW5kaW5nLnBhcmFtcyA9IGJpbmRpbmcucGFyYW1zIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5wcm9wLnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29udGV4dC5wcm9wLnByb3BzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wID0gdGhpcy5jb250ZXh0LnByb3AucHJvcHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtID0gYmluZGluZy5wYXJhbXNbcHJvcC5uYW1lXSA9IGJpbmRpbmcucGFyYW1zW3Byb3AubmFtZV0gfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLl9hY3Rpb24gPSBwYXJhbS5fYWN0aW9uID09ICd1cGRhdGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ3VwZGF0ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnY3JlYXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IHByb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtOiBwYXJhbSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRzZXQoJ2N1cnJlbnQuYmluZGluZycsIGJpbmRpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLiRzZXQoJ2l0ZW1zJywgaXRlbXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBzZXRTdHJhdGVneTogZnVuY3Rpb24oc3RyYXRlZ3kpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNldCgnY3VycmVudC5iaW5kaW5nLnN0cmF0ZWd5Jywgc3RyYXRlZ3kpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRTdHJhdGVneTogZnVuY3Rpb24oc3RyYXRlZ3kpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRnZXQoJ2N1cnJlbnQuYmluZGluZy5zdHJhdGVneScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhcmFtcy1iaW5kaW5ncycsIHtcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkFjdGlvbk1peGluKFBhcmFtQmluZGluZ3NNb2RhbEVkaXRvcildLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFBhcmFtTXVsdGlwbGVNb2RhbEVkaXRvciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYXJhbXMtbXVsdGlwbGUtZGlhbG9nJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhcmFtcy1tdWx0aXBsZS1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTW9kYWxFZGl0b3JNaXhpbiwgQ29yZS5UYWJzTWl4aW4oJ2RhdGEnKV0sXHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5pdGVtcyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlZCcsIFBhcmFtTXVsdGlwbGVNb2RhbEVkaXRvcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29udGV4dC5wcm9wLnByb3BzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSB0aGlzLmNvbnRleHQucHJvcC5wcm9wc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJhbSA9IHRoaXMuY3VycmVudFtwcm9wLm5hbWVdID0gdGhpcy5jdXJyZW50W3Byb3AubmFtZV0gfHwgeyB2YWx1ZTogbnVsbCB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHBhcmFtLl9hY3Rpb24gPSBwYXJhbS5fYWN0aW9uID09ICd1cGRhdGUnXHJcbiAgICAgICAgICAgICAgICAgICAgPyAndXBkYXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ2NyZWF0ZSdcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wOiBwcm9wLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtOiBwYXJhbSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kc2V0KCdpdGVtcycsIGl0ZW1zKTtcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFBhcmFtTXVsdGlwbGVFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgncGFyYW1zLW11bHRpcGxlLWVkaXRvcicsIHtcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkVkaXRvck1peGluKFBhcmFtTXVsdGlwbGVMaXN0Vmlld2VyLCBQYXJhbU11bHRpcGxlTW9kYWxFZGl0b3IpXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYXJhbXMtbXVsdGlwbGUtZWRpdG9yJyxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBwcm9wOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHBhcmFtOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBBcnJheSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHZhciBQYXJhbXNMaXN0ID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhcmFtcy1saXN0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhcmFtcy1saXN0JyxcclxuICAgICAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgICAgICdwYXJhbXMtc3RyaW5nJzogUGFyYW1TdHJpbmcsXHJcbiAgICAgICAgICAgICdwYXJhbXMtcmljaCc6IFBhcmFtUmljaCxcclxuICAgICAgICAgICAgJ3BhcmFtcy1zb3VyY2UnOiBQYXJhbVNvdXJjZSxcclxuICAgICAgICAgICAgJ3BhcmFtcy1tdWx0aXBsZSc6IFBhcmFtTXVsdGlwbGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBvd25lcjogT2JqZWN0LFxyXG4gICAgICAgICAgICB0YWI6IFN0cmluZyxcclxuICAgICAgICAgICAgaXRlbXM6IEFycmF5LFxyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3RcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pKFZ1ZSwgalF1ZXJ5LCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbihWdWUsICQsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgdmFyIFN0b3JhZ2VzTGlzdFZpZXdlciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdzdG9yYWdlcy1saXN0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3N0b3JhZ2VzLWxpc3QnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTGlzdFZpZXdlck1peGluXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBTdG9yYWdlc01vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3N0b3JhZ2VzLWRpYWxvZycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzdG9yYWdlcy1kaWFsb2cnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTW9kYWxFZGl0b3JNaXhpbl0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hlY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBTdG9yYWdlc0VkaXRvciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdzdG9yYWdlcycsIHtcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkVkaXRvck1peGluKFN0b3JhZ2VzTGlzdFZpZXdlciwgU3RvcmFnZXNNb2RhbEVkaXRvcildLFxyXG4gICAgICAgIHRlbXBsYXRlOiAnI3N0b3JhZ2VzJyxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBTdG9yYWdlc1ZhcmlhYmxlc0xpc3RWaWV3ZXIgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnc3RvcmFnZXMtdmFyaWFibGVzLWxpc3QnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjc3RvcmFnZXMtdmFyaWFibGVzLWxpc3QnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTGlzdFZpZXdlck1peGluXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBTdG9yYWdlc1ZhcmlhYmxlc01vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3N0b3JhZ2VzLXZhcmlhYmxlcy1kaWFsb2cnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjc3RvcmFnZXMtdmFyaWFibGVzLWRpYWxvZycsXHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5Nb2RhbEVkaXRvck1peGluXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBTdG9yYWdlc1ZhcmlhYmxlc0VkaXRvciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdzdG9yYWdlcy12YXJpYWJsZXMnLCB7XHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5FZGl0b3JNaXhpbihTdG9yYWdlc1ZhcmlhYmxlc0xpc3RWaWV3ZXIsIFN0b3JhZ2VzVmFyaWFibGVzTW9kYWxFZGl0b3IpXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzdG9yYWdlcy12YXJpYWJsZXMnLFxyXG4gICAgfSk7XHJcblxyXG59KShWdWUsIGpRdWVyeSwgQ29yZSwgU2hlbGwpO1xyXG4iLCIoZnVuY3Rpb24oVnVlLCAkLCBDb3JlLCBTaGVsbCkge1xyXG5cclxuICAgIHZhciBMaXN0Vmlld2VyID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3dpZGdldHMtbGlzdCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyN3aWRnZXRzLWxpc3QnLFxyXG4gICAgICAgIG1peGluczogW0NvcmUuTGlzdFZpZXdlck1peGluXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBNb2RhbEVkaXRvciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCd3aWRnZXRzLWRpYWxvZycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyN3aWRnZXRzLWRpYWxvZycsXHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5Nb2RhbEVkaXRvck1peGluXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgnd2lkZ2V0cycsIHtcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkVkaXRvck1peGluKExpc3RWaWV3ZXIsIE1vZGFsRWRpdG9yKV0sXHJcbiAgICAgICAgdGVtcGxhdGU6ICcjd2lkZ2V0cycsXHJcbiAgICB9KTtcclxuXHJcbn0pKFZ1ZSwgalF1ZXJ5LCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgdmFyIHNjYWxlID0gMTtcclxuXHJcbiAgICBWdWUuY29tcG9uZW50KCdzaGVsbC1hY3Rpb25zJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3NoZWxsLWFjdGlvbnMnLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRvbWFpbjogT2JqZWN0LFxyXG4gICAgICAgICAgICBwYWdlOiBPYmplY3RcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oZXZlbnQsIGl0ZW0sIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGRpc3BhdGNoKGV2ZW50LCB7IGl0ZW06IGl0ZW0sIGNvbnRleHQ6IGNvbnRleHQgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHpvb206IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSArPSAoZXZlbnQgPT0gJ2luJykgPyAwLjEgOiAtMC4xO1xyXG4gICAgICAgICAgICAgICAgJCgnLmdlLmdlLXBhZ2UnKS5jc3MoJ3RyYW5zZm9ybScsICdzY2FsZSgnICsgc2NhbGUgKyAnKScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSkoalF1ZXJ5LCBWdWUsIENvcmUsIFNoZWxsKTtcclxuIiwiKGZ1bmN0aW9uKCQsIFZ1ZSwgQ29yZSwgU2hlbGwpIHtcclxuXHJcbiAgICBWdWUuY29tcG9uZW50KCdzaGVsbC1icmFuZCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1icmFuZCcsXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtY29udGFpbmVyJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3NoZWxsLWNvbnRhaW5lcicsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgZ2xvYmFsczogT2JqZWN0LFxyXG4gICAgICAgICAgICBzZXR0aW5nczogT2JqZWN0LFxyXG4gICAgICAgICAgICBwYWdlOiBPYmplY3QsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxufSkoalF1ZXJ5LCBWdWUsIENvcmUsIFNoZWxsKTtcclxuIiwiKGZ1bmN0aW9uKCQsIFZ1ZSwgQ29yZSwgU2hlbGwpIHtcclxuXHJcbiAgICBWdWUuY29tcG9uZW50KCdzaGVsbC1jYXRlZ29yaWVzJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3NoZWxsLWNhdGVnb3JpZXMnLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNhdGVnb3JpZXM6IEFycmF5LFxyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3QsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKGV2ZW50LCBpdGVtLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRkaXNwYXRjaChldmVudCwgeyBpdGVtOiBpdGVtLCBjb250ZXh0OiBjb250ZXh0IH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSkoalF1ZXJ5LCBWdWUsIENvcmUsIFNoZWxsKTtcclxuIiwiKGZ1bmN0aW9uKCQsIFZ1ZSwgQ29yZSwgU2hlbGwpIHtcclxuXHJcbiAgICB2YXIgcnVudGltZSA9IFZ1ZS5zZXJ2aWNlKCdydW50aW1lJywge1xyXG5cclxuICAgICAgICBldmFsdWF0ZTogZnVuY3Rpb24oc2VsZiwgYiwgdikge1xyXG5cclxuICAgICAgICAgICAgaWYgKGIgJiYgYi5leHByZXNzaW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYi5zdHJhdGVneSA9PSAnZXZhbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gc2VsZi4kZXZhbChiLmV4cHJlc3Npb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChiLnN0cmF0ZWd5ID09ICd3aXJlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzZWxmLiRnZXQoYi5leHByZXNzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ZhbHVlJywgdmFsdWUsIGIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuJGludGVycG9sYXRlKGIuZXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgZXZhbHVhdGUgZXhwcmVzc2lvbicsIGIuZXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2YWx1YXRlUGFyYW1zOiBmdW5jdGlvbihzZWxmLCBwcm9wcywgcGFyYW1zKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJhbSA9IHBhcmFtcyAmJiBwYXJhbXNbcHJvcC5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3A6IHByb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW06IHBhcmFtIHx8IHt9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IGl0ZW0ucHJvcC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSBpdGVtLnByb3AudmFyaWFibGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgYiA9IGl0ZW0ucGFyYW0uYmluZGluZztcclxuICAgICAgICAgICAgICAgIHZhciB2ID0gaXRlbS5wYXJhbS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcm9wLnR5cGUgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIEltcGxlbWVudFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnByb3AudHlwZSA9PSAnbXVsdGlwbGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiICYmIGIuZXhwcmVzc2lvbikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ2ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcnVudGltZS5ldmFsdWF0ZShzZWxmLCBiLCB2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2diA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0FycmF5KHJlc3VsdCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2bSA9IG5ldyBWdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGYuJGRhdGEpKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHRbal0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHRoaXMuZXZhbHVhdGVQYXJhbXModm0sIGl0ZW0ucHJvcC5wcm9wcywgYi5wYXJhbXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ2ID0gYXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHYubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aSA9IHZbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmkuX2FjdGlvbiAhPSAncmVtb3ZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4KytdID0gdGhpcy5ldmFsdWF0ZVBhcmFtcyhzZWxmLCBpdGVtLnByb3AucHJvcHMsIHZpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdnYgPSByID8geyB2YWx1ZTogYXJyYXkgfSA6IGFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbbl0gPSB2djtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdnYgPSBydW50aW1lLmV2YWx1YXRlKHNlbGYsIGIsIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlW25dID0gdnY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0dWIodGl0bGUsIHN1YnRpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ05UUjFYRGVmYXVsdEJ1bmRsZS9TdHViJyxcclxuICAgICAgICAgICAgX2FjdGlvbjogJ2lnbm9yZScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHsgdmFsdWU6IHRpdGxlIH0sXHJcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogeyB2YWx1ZTogc3VidGl0bGUgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBEZWNvcmF0b3JNaXhpbiA9IHtcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgaXRlbXM6IEFycmF5LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIHJlbW92ZVdpZGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRkaXNwYXRjaCgncmVtb3ZlQ2hpbGRXaWRnZXQnLCB7IGl0ZW06IHRoaXMubW9kZWwgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkb0FwcGx5OiBmdW5jdGlvbihtb2RlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5tb2RlbCwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlbCkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2FjdGlvbjogdGhpcy5tb2RlbC5fYWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5tb2RlbC5fYWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ3VwZGF0ZSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHNob3dTZXR0aW5nczogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRpYWxvZyA9IG5ldyBTaGVsbC5XaWRnZXRzLk1vZGFsRWRpdG9yKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxzOiB0aGlzLmdsb2JhbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IHRoaXMud2lkZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsOiB0aGlzLm1vZGVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubW9kZWwpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3duZXIuZG9BcHBseSh0aGlzLmN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuJG1vdW50KCkuJGFwcGVuZFRvKCQoJ2JvZHknKS5nZXQoMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBCaW5kaW5nc01peGluID0ge1xyXG5cclxuICAgICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdzOiB0aGlzLmJpbmRpbmdzLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ2RhdGEnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJpbmRpbmdzID0gcnVudGltZS5ldmFsdWF0ZVBhcmFtcyh0aGlzLCB0aGlzLndpZGdldC5wcm9wcywgdGhpcy5tb2RlbC5wYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2V0KCdiaW5kaW5ncycsIGJpbmRpbmdzKTtcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnc3RvcmFnZScsIChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmluZGluZ3MgPSBydW50aW1lLmV2YWx1YXRlUGFyYW1zKHRoaXMsIHRoaXMud2lkZ2V0LnByb3BzLCB0aGlzLm1vZGVsLnBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzZXQoJ2JpbmRpbmdzJywgYmluZGluZ3MpO1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBkZWVwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdtb2RlbCcsIChtb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJpbmRpbmdzID0gcnVudGltZS5ldmFsdWF0ZVBhcmFtcyh0aGlzLCB0aGlzLndpZGdldC5wcm9wcywgbW9kZWwucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2V0KCdiaW5kaW5ncycsIGJpbmRpbmdzKTtcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgQ29tcG9zaXRlTWl4aW4gPSB7XHJcblxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnaXRlbXMnLCAoaXRlbXMpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uX2FjdGlvbiAhPSAncmVtb3ZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnN0dWIoKSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czoge1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlQ2hpbGRXaWRnZXQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGEuaXRlbTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5fYWN0aW9uID09ICdjcmVhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy4kcmVtb3ZlKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLl9hY3Rpb24gPSAncmVtb3ZlJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5zbGljZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBTb3J0YWJsZU1peGluID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmQoY2hpbGRyZW4sIGRvbUluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aCAmJiBpbmRleCA8IGRvbUluZGV4OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuX2FjdGlvbiAhPSAncmVtb3ZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRyb3V0ZS5wcml2YXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaGVsbCA9IFZ1ZS5zZXJ2aWNlKCdzaGVsbCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3NlbGVjdGVkJywgZnVuY3Rpb24oc2VsZWN0ZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc29ydGFibGUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU29ydGFibGUuY3JlYXRlKCQoc2VsZWN0b3IsIHNlbGYuJGVsKS5nZXQoMCksIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3dpZGdldHMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWxsOiAnY2xvbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiAxNTAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQWRkOiBmdW5jdGlvbiAoZXZ0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFsZXR0ZSA9ICQoZXZ0Lml0ZW0pLmNsb3Nlc3QoJy5nZS5nZS1wYWxldHRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdyA9ICQoZXZ0Lml0ZW0pLmRhdGEoJ3dpZGdldCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhbGV0dGUubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXZ0Lml0ZW0pLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmkgPSBmaW5kKHNlbGYuaXRlbXMsIGV2dC5uZXdJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWRnZXQgPSBzaGVsbC5nZXRXaWRnZXQodyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gSW5pdGlhbGl6ZSBwYXJhbXMgaW4gc2VydmljZSBsYXllclxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLml0ZW1zLnNwbGljZShuaSwgMCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB3aWRnZXQuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FjdGlvbjogJ2NyZWF0ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB3aWRnZXQucGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkod2lkZ2V0LnBhcmFtcykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0czogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hY3Rpb246ICdjcmVhdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHJhZ2dlZCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dWU6IGV2dC5mcm9tLl9fZHJhZ2dlZF9fLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06ICQoJy5nZS5nZS13aWRnZXQnLCBldnQuaXRlbSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmU6ICQoJy5nZS5nZS13aWRnZXQnLCBldnQuY2xvbmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChldnQudG8pLmNsb3Nlc3QoJy5nZS5nZS13aWRnZXQnKS5nZXQoMCkuX192dWVfXztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmkgPSBmaW5kKHNlbGYuaXRlbXMsIGV2dC5uZXdJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0l0ZW0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRyYWdnZWQudnVlLm1vZGVsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLl9hY3Rpb24gPSAnY3JlYXRlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBuZXdJdGVtLnJlc291cmNlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG5ld0l0ZW0uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dlZC5pdGVtLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pdGVtcy5zcGxpY2UobmksIDAsIG5ld0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLml0ZW1zID0gY29udGFpbmVyLml0ZW1zLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5mcm9tLl9fZHJhZ2dlZF9fID0gJCgnLmdlLmdlLXdpZGdldCcsIGV2dC5pdGVtKS5nZXQoMCkuX192dWVfXztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oZXZ0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHJhZ2dlZCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ1ZTogZXZ0LmZyb20uX19kcmFnZ2VkX18sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiAkKCcuZ2UuZ2Utd2lkZ2V0JywgZXZ0Lml0ZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmU6ICQoJy5nZS5nZS13aWRnZXQnLCBldnQuY2xvbmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YWNrID0gIGRyYWdnZWQudnVlLiRwYXJlbnQuJHBhcmVudC4kcGFyZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dlZC5jbG9uZS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmFnZ2VkLnZ1ZS5tb2RlbC5fYWN0aW9uID09ICdjcmVhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5pdGVtcy4kcmVtb3ZlKGRyYWdnZWQudnVlLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnZWQudnVlLm1vZGVsLl9hY3Rpb24gPSAncmVtb3ZlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suaXRlbXMgPSBzdGFjay5pdGVtcy5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2kgPSBzZWxmLml0ZW1zLmluZGV4T2YoZXZ0LmZyb20uX19kcmFnZ2VkX18ubW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmkgPSBmaW5kKHNlbGYuaXRlbXMsIGV2dC5uZXdJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2kgIT0gbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXRlbXMuc3BsaWNlKG5pLCAwLCBzZWxmLml0ZW1zLnNwbGljZShvaSwgMSlbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pdGVtcyA9IHNlbGYuaXRlbXMuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW5kOiBmdW5jdGlvbiAoZXZ0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXZ0LmZyb20uX19kcmFnZ2VkX187XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnNvcnRhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zb3J0YWJsZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zb3J0YWJsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0VGFyZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgdW5zZWxlY3RUYXJnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBWdWUuY29tcG9uZW50KCdzaGVsbC1kZWNvcmF0b3Itc3R1YicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1kZWNvcmF0b3Itc3R1YicsXHJcbiAgICAgICAgbWl4aW5zOiBbIERlY29yYXRvck1peGluLCBCaW5kaW5nc01peGluIF0sXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgZ2xvYmFsczogT2JqZWN0LFxyXG4gICAgICAgICAgICBzZXR0aW5nczogT2JqZWN0LFxyXG4gICAgICAgICAgICBzdGFjazogT2JqZWN0LFxyXG4gICAgICAgICAgICBwYWdlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRhdGE6IE9iamVjdCxcclxuICAgICAgICAgICAgc3RvcmFnZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBtb2RlbDogT2JqZWN0LFxyXG4gICAgICAgICAgICB3aWRnZXQ6IE9iamVjdCxcclxuICAgICAgICAgICAgZWRpdGFibGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGl0ZW1zOiBBcnJheSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtZGVjb3JhdG9yLXdpZGdldCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1kZWNvcmF0b3Itd2lkZ2V0JyxcclxuICAgICAgICBtaXhpbnM6IFsgRGVjb3JhdG9yTWl4aW4sIEJpbmRpbmdzTWl4aW4gXSxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHN0YWNrOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHBhZ2U6IE9iamVjdCxcclxuICAgICAgICAgICAgZGF0YTogT2JqZWN0LFxyXG4gICAgICAgICAgICBzdG9yYWdlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIG1vZGVsOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHdpZGdldDogT2JqZWN0LFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogQm9vbGVhbixcclxuICAgICAgICAgICAgaXRlbXM6IEFycmF5LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBWdWUuY29tcG9uZW50KCdzaGVsbC1kZWNvcmF0b3ItaG9yaXNvbnRhbCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1kZWNvcmF0b3ItaG9yaXNvbnRhbCcsXHJcbiAgICAgICAgbWl4aW5zOiBbIERlY29yYXRvck1peGluLCBDb21wb3NpdGVNaXhpbiwgU29ydGFibGVNaXhpbignPi5nZS5nZS1jb250ZW50ID4ud2cud2ctZGVmYXVsdC1zdGFjayA+LndnLndnLWNvbnRlbnQgPi53Zy53Zy10YWJsZSA+LndnLndnLXJvdycpLCBCaW5kaW5nc01peGluIF0sXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgZ2xvYmFsczogT2JqZWN0LFxyXG4gICAgICAgICAgICBzZXR0aW5nczogT2JqZWN0LFxyXG4gICAgICAgICAgICBzdGFjazogT2JqZWN0LFxyXG4gICAgICAgICAgICBwYWdlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRhdGE6IE9iamVjdCxcclxuICAgICAgICAgICAgc3RvcmFnZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBtb2RlbDogT2JqZWN0LFxyXG4gICAgICAgICAgICB3aWRnZXQ6IE9iamVjdCxcclxuICAgICAgICAgICAgZWRpdGFibGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGl0ZW1zOiBBcnJheSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgc3R1YjogZnVuY3Rpb24oKSB7IHJldHVybiBzdHViKCdIb3Jpc29udGFsIFN0YWNrJywgJ0Ryb3AgSGVyZScpOyB9XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3NoZWxsLWRlY29yYXRvci12ZXJ0aWNhbCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1kZWNvcmF0b3ItdmVydGljYWwnLFxyXG4gICAgICAgIG1peGluczogWyBEZWNvcmF0b3JNaXhpbiwgQ29tcG9zaXRlTWl4aW4sIFNvcnRhYmxlTWl4aW4oJz4uZ2UuZ2UtY29udGVudCA+LndnLndnLWRlZmF1bHQtc3RhY2sgPi53Zy53Zy1jb250ZW50ID4ud2cud2ctdGFibGUnKSwgQmluZGluZ3NNaXhpbiBdLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGdsb2JhbHM6IE9iamVjdCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IE9iamVjdCxcclxuICAgICAgICAgICAgc3RhY2s6IE9iamVjdCxcclxuICAgICAgICAgICAgcGFnZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkYXRhOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHN0b3JhZ2U6IE9iamVjdCxcclxuICAgICAgICAgICAgbW9kZWw6IE9iamVjdCxcclxuICAgICAgICAgICAgd2lkZ2V0OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBpdGVtczogQXJyYXksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIHN0dWI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3R1YignVmVydGljYWwgU3RhY2snLCAnRHJvcCBIZXJlJyk7IH1cclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtZGVjb3JhdG9yLWNhbnZhcycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1kZWNvcmF0b3ItY2FudmFzJyxcclxuICAgICAgICBtaXhpbnM6IFsgQ29tcG9zaXRlTWl4aW4sIFNvcnRhYmxlTWl4aW4oJz4uZ2UuZ2UtY29udGVudCA+LndnLndnLWRlZmF1bHQtc3RhY2sgPi53Zy53Zy1jb250ZW50ID4ud2cud2ctdGFibGUnKSBdLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGdsb2JhbHM6IE9iamVjdCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IE9iamVjdCxcclxuICAgICAgICAgICAgc3RhY2s6IE9iamVjdCxcclxuICAgICAgICAgICAgcGFnZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkYXRhOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHN0b3JhZ2U6IE9iamVjdCxcclxuICAgICAgICAgICAgZWRpdGFibGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGl0ZW1zOiBBcnJheSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgc3R1YjogZnVuY3Rpb24oKSB7IHJldHVybiBzdHViKCdWZXJ0aWNhbCBTdGFjaycsICdEcm9wIEhlcmUnKTsgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtZG9tYWlucycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1kb21haW5zJyxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBkb21haW5zOiBBcnJheSxcclxuICAgICAgICAgICAgZ2xvYmFsczogT2JqZWN0LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgU2hlbGwuTG9hZGVyID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3NoZWxsLWxvYWRlcicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1sb2FkZXInLFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcG9ydGFsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IG51bGwsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBWdWUuc2VydmljZSgncG9ydGFscycpLmdldCh7IGlkOiB0aGlzLiRyb3V0ZS5wYXJhbXMucG9ydGFsIH0pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNldCgncG9ydGFsJywgZC5kYXRhLnBvcnRhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2V0KCdzZXR0aW5ncycsIGQuZGF0YS5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtcGFnZXMnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjc2hlbGwtcGFnZXMnLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHBhZ2VzOiBBcnJheSxcclxuICAgICAgICAgICAgZ2xvYmFsczogT2JqZWN0LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtcGFnZScsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1wYWdlJyxcclxuICAgICAgICBtaXhpbnM6IFsgLypDb3JlLkNvbnRhaW5lck1peGluLCBDb3JlLlNvcnRhYmxlTWl4aW4qLyBdLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGdsb2JhbHM6IE9iamVjdCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IE9iamVjdCxcclxuICAgICAgICAgICAgcGFnZTogT2JqZWN0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkZWNvcmF0b3I6IHRoaXMuZGVjb3JhdG9yLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZTogdGhpcy5zdG9yYWdlLFxyXG4gICAgICAgICAgICAgICAgcGFnZVNldHRpbmdzOiB7fSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJ1bnRpbWUgPSBWdWUuc2VydmljZSgncnVudGltZScpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3IgPSAnc2hlbGwtZGVjb3JhdG9yLWNhbnZhcyc7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdwYWdlLnJlc291cmNlJywgKHJlc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzZXQoJ3BhZ2VTZXR0aW5ncy53aWR0aCcsICc5NjBweCcpOyAvLyBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHBhcmFtIGluIHJlc291cmNlLnBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzZXQoJ3BhZ2VTZXR0aW5ncy4nICsgcmVzb3VyY2UucGFyYW1zW3BhcmFtXS5uYW1lLCByZXNvdXJjZS5wYXJhbXNbcGFyYW1dLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3BhZ2Uuc3RvcmFnZXMnLCAoc3RvcmFnZXMpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JhZ2UgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9yYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ID0gc3RvcmFnZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2Vbc3QubmFtZV0gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3QudmFyaWFibGVzLmxlbmd0aDsgaisrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlID0gc3QudmFyaWFibGVzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmFnZVtzdC5uYW1lXVt2YXJpYWJsZS5uYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcnVudGltZS5ldmFsdWF0ZSh0aGlzLCB2YXJpYWJsZS5iaW5kaW5nLCB2YXJpYWJsZS52YWx1ZSkgfHwgbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2V0KCdzdG9yYWdlJywgc3RvcmFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3BhZ2Uuc291cmNlcycsIChzb3VyY2VzKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnB1c2godGhpcy5kb1JlcXVlc3Qoc291cmNlc1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmVycmVkLmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQud2hlbi5hcHBseSh0aGlzLCBkZWZlcnJlZCkuZG9uZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbc291cmNlc1tpXS5uYW1lXSA9IGFyZ3VtZW50c1tpXVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNldCgnZGF0YScsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmVycmVkLmxlbmd0aCA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZFswXS5kb25lKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW3NvdXJjZXNbMF0ubmFtZV0gPSBkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2V0KCdkYXRhJywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIGRvUmVxdWVzdDogZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0ge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMucGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtID0gcy5wYXJhbXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLmluID09ICdxdWVyeScgJiYgcGFyYW0uc3BlY2lmaWVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJhbS5iaW5kaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLiRpbnRlcnBvbGF0ZShwYXJhbS5iaW5kaW5nKSAvLyBUT0RPIEludGVycG9sYXRlIGluIHBhZ2UgY29udGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcGFyYW0udmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5W3BhcmFtLm5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogcy5tZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzLnVybCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcXVlcnksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgdmFyIFBhbGV0dGVJdGVtID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3NoZWxsLXBhbGV0dGUtaXRlbScsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1wYWxldHRlLWl0ZW0nLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHdpZGdldDogT2JqZWN0LFxyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3QsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wdXRlZDoge1xyXG4gICAgICAgICAgICB0aHVtYm5haWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcvYnVuZGxlcy8nICsgdGhpcy53aWRnZXQucHJvdmlkZXIuYWxpYXMgKyAnLycgKyB0aGlzLndpZGdldC50aHVtYm5haWwucGF0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBTb3J0YWJsZS5jcmVhdGUodGhpcy4kZWwsIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3dpZGdldHMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHB1bGw6ICdjbG9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcHV0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogMTUwLFxyXG4gICAgICAgICAgICAgICAgc29ydDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3NoZWxsLXBhbGV0dGUnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjc2hlbGwtcGFsZXR0ZScsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgZ2xvYmFsczogT2JqZWN0LFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogT2JqZWN0LFxyXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiBBcnJheSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgICAgICAgJ3BhbGV0dGUtaXRlbSc6IFBhbGV0dGVJdGVtXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKGV2ZW50LCBpdGVtLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCwgaXRlbSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRkaXNwYXRjaChldmVudCwgeyBpdGVtOiBpdGVtLCBjb250ZXh0OiBjb250ZXh0IH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgU2hlbGwuU2hlbGwgPSB7XHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgc2V0dGluZ3M6IE9iamVjdCxcclxuICAgICAgICAgICAgbW9kZWw6IE9iamVjdCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczogdGhpcy5nbG9iYWxzLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBWdWUuc2VydmljZSgnc2hlbGwnLCB7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0V2lkZ2V0OiAoaWQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNldHRpbmdzLndpZGdldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHcgPSB0aGlzLnNldHRpbmdzLndpZGdldHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3LmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFscyA9IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogdGhpcy5tb2RlbCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBTaGVsbC5TaGVsbFB1YmxpYyA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdzaGVsbC1wdWJsaWMnLCB7XHJcbiAgICAgICAgbWl4aW5zOiBbIFNoZWxsLlNoZWxsIF0sXHJcbiAgICAgICAgdGVtcGxhdGU6ICcjc2hlbGwtcHVibGljJyxcclxuICAgIH0pO1xyXG5cclxuICAgIFNoZWxsLlNoZWxsUHJpdmF0ZSA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdzaGVsbC1wcml2YXRlJywge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFsgU2hlbGwuU2hlbGwgXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1wcml2YXRlJyxcclxuXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiByZWxldmFudChjdXJyZW50LCBjb2xsZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50IHx8IGN1cnJlbnQuX2FjdGlvbiA9PSAncmVtb3ZlJyB8fCAoY29sbGVjdGlvbiAmJiBjb2xsZWN0aW9uLmluZGV4T2YoY3VycmVudCkgPCAwKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gY29sbGVjdGlvbltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjLl9hY3Rpb24gIT0gJ3JlbW92ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudC5fYWN0aW9uID09ICdyZW1vdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdzZXR0aW5ncy5jYXRlZ29yaWVzJywgKGNhdGVnb3JpZXMpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2F0ZWdvcnkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5ID0gY2F0ZWdvcmllc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgc3ViID0gY2F0ZWdvcmllc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoY2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNhdGVnb3J5ID0gc3ViLmNhdGVnb3JpZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxzLnNlbGVjdGlvbi5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ21vZGVsLmRvbWFpbnMnLCAoZG9tYWlucykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxzLnNlbGVjdGlvbi5kb21haW4gPSByZWxldmFudCh0aGlzLmdsb2JhbHMuc2VsZWN0aW9uLmRvbWFpbiwgZG9tYWlucyk7XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnbW9kZWwucGFnZXMnLCAocGFnZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFscy5zZWxlY3Rpb24ucGFnZSA9IHJlbGV2YW50KHRoaXMuZ2xvYmFscy5zZWxlY3Rpb24ucGFnZSwgcGFnZXMpO1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ2dsb2JhbHMuc2VsZWN0aW9uLnBhZ2Uuc291cmNlcycsIChzb3VyY2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbHMuc2VsZWN0aW9uLnNvdXJjZSA9IHJlbGV2YW50KHRoaXMuZ2xvYmFscy5zZWxlY3Rpb24uc291cmNlLCBzb3VyY2VzKTtcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdnbG9iYWxzLnNlbGVjdGlvbi5wYWdlLnN0b3JhZ2VzJywgKHN0b3JhZ2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbHMuc2VsZWN0aW9uLnN0b3JhZ2UgPSByZWxldmFudCh0aGlzLmdsb2JhbHMuc2VsZWN0aW9uLnN0b3JhZ2UsIHN0b3JhZ2VzKTtcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBnZXRXaWRnZXQ6IGZ1bmN0aW9uKGlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNldHRpbmdzLndpZGdldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdyA9IHRoaXMuc2V0dGluZ3Mud2lkZ2V0c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAody5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgcHVsbDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvc2V0dGluZ3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMubW9kZWwsIGQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvc2V0dGluZ3MvZG8tdXBkYXRlJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5tb2RlbCksXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCBkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbGVjdENhdGVnb3J5OiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbHMuc2VsZWN0aW9uLmNhdGVnb3J5ID0gZGF0YS5pdGVtO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWxlY3REb21haW46IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFscy5zZWxlY3Rpb24uZG9tYWluID0gZGF0YS5pdGVtO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWxlY3RQYWdlOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbHMuc2VsZWN0aW9uLnBhZ2UgPSBkYXRhLml0ZW07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbGVjdFNvdXJjZTogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxzLnNlbGVjdGlvbi5zb3VyY2UgPSBkYXRhLml0ZW07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbGVjdFN0b3JhZ2U6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFscy5zZWxlY3Rpb24uc3RvcmFnZSA9IGRhdGEuaXRlbTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIi8vIChmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcbi8vXHJcbi8vICAgICBWdWUuY29tcG9uZW50KCdzaGVsbC1zdGFja2VkJywge1xyXG4vLyAgICAgICAgIHRlbXBsYXRlOiAnI3NoZWxsLXN0YWNrZWQnLFxyXG4vLyAgICAgICAgIG1peGluczogWyBDb3JlLlN0YWNrZWQgXVxyXG4vLyAgICAgfSk7XHJcbi8vXHJcbi8vIH0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtc291cmNlcycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1zb3VyY2VzJyxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBzb3VyY2VzOiBBcnJheSxcclxuICAgICAgICAgICAgZ2xvYmFsczogT2JqZWN0LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtc3RvcmFnZXMnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjc2hlbGwtc3RvcmFnZXMnLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VzOiBBcnJheSxcclxuICAgICAgICAgICAgZ2xvYmFsczogT2JqZWN0LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtc3R1YicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogJyNzaGVsbC1zdHViJyxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgVnVlLCBDb3JlLCBTaGVsbCk7XHJcbiIsIihmdW5jdGlvbigkLCBWdWUsIENvcmUsIFNoZWxsKSB7XHJcblxyXG4gICAgVnVlLmNvbXBvbmVudCgnc2hlbGwtdGFyZ2V0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3NoZWxsLXRhcmdldCcsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG59KShqUXVlcnksIFZ1ZSwgQ29yZSwgU2hlbGwpO1xyXG4iLCIoZnVuY3Rpb24oJCwgVnVlLCBDb3JlLCBTaGVsbCkge1xyXG5cclxuICAgIFNoZWxsLldpZGdldCA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdzaGVsbC13aWRnZXQnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjc2hlbGwtd2lkZ2V0JyxcclxuICAgICAgICBtaXhpbnM6IFsgLyogQ29yZS5EZWNvcmF0b3JNaXhpbiwgQ29yZS5Db250YWluZXJNaXhpbiwgQ29yZS5Tb3J0YWJsZU1peGluLCBDb3JlLkJpbmRpbmdzTWl4aW4gKi8gXSxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBnbG9iYWxzOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHBhZ2U6IE9iamVjdCxcclxuICAgICAgICAgICAgc3RhY2s6IE9iamVjdCxcclxuICAgICAgICAgICAgbW9kZWw6IE9iamVjdCxcclxuICAgICAgICAgICAgZGF0YTogT2JqZWN0LFxyXG4gICAgICAgICAgICBzdG9yYWdlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiBCb29sZWFuLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9ycyA9IHtcclxuICAgICAgICAgICAgICAgIGFsdGVybmF0aXZlczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICdkZWZhdWx0LXN0YWNrLXBhZ2UnOiBmdW5jdGlvbigpIHsgT2JqZWN0LmFzc2lnbih0aGlzLCB7IHNlbGVjdG9yOiAnLndnLndnLXRhYmxlJywgc3R1Yjogc3R1YignVmVydGljYWwgU3RhY2snLCAnRHJvcCBIZXJlJykgfSkgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAnZGVmYXVsdC1zdGFjay1ob3Jpc29udGFsJzogZnVuY3Rpb24oKSB7IE9iamVjdC5hc3NpZ24odGhpcywgeyBzZWxlY3RvcjogJy53Zy53Zy1yb3cnLCBzdHViOiBzdHViKCdIb3Jpc29udGFsIFN0YWNrJywgJ0Ryb3AgSGVyZScpIH0pIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJ2RlZmF1bHQtc3RhY2stdmVydGljYWwnOiBmdW5jdGlvbigpIHsgT2JqZWN0LmFzc2lnbih0aGlzLCB7IHNlbGVjdG9yOiAnLndnLndnLXRhYmxlJywgc3R1Yjogc3R1YignVmVydGljYWwgU3RhY2snLCAnRHJvcCBIZXJlJykgfSkgfSxcclxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdC1zdGFjay1ob3Jpc29udGFsJzogJ3NoZWxsLWRlY29yYXRvci1ob3Jpc29udGFsJyxcclxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdC1zdGFjay12ZXJ0aWNhbCc6ICdzaGVsbC1kZWNvcmF0b3ItdmVydGljYWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0LXN0dWInOiAnc2hlbGwtZGVjb3JhdG9yLXN0dWInLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhbGxiYWNrOiAnc2hlbGwtZGVjb3JhdG9yLXdpZGdldCcsXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnd2lkZ2V0Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2hlbGwgPSBWdWUuc2VydmljZSgnc2hlbGwnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0ID0gc2hlbGwuZ2V0V2lkZ2V0KHRoaXMubW9kZWwudHlwZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yID0gdGhpcy5kZWNvcmF0b3JzLmFsdGVybmF0aXZlc1t0aGlzLndpZGdldC50YWddIHx8IHRoaXMuZGVjb3JhdG9ycy5mYWxsYmFjaztcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLiRyb3V0ZSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuZGVjb3JhdG9yID0gJ3NoZWxsLWRlY29yYXRvci1zdHViJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHdpZGdldDogdGhpcy53aWRnZXQsXHJcbiAgICAgICAgICAgICAgICBkZWNvcmF0b3I6IHRoaXMuZGVjb3JhdG9yLFxyXG4gICAgICAgICAgICAgICAgLy8gaXRlbXM6IHRoaXMud2lkZ2V0cyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG59KShqUXVlcnksIFZ1ZSwgQ29yZSwgU2hlbGwpO1xyXG4iLCIoZnVuY3Rpb24oVnVlLCAkLCBDb3JlLCBTaGVsbCkge1xyXG5cclxuICAgIHZhciBXaWRnZXRzTGlzdFZpZXdlciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYWdlcy13aWRnZXRzLWxpc3QnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFnZXMtd2lkZ2V0cy1saXN0JyxcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkxpc3RWaWV3ZXJNaXhpbl0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBnZXRXaWRnZXQ6IGZ1bmN0aW9uKHcpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nbG9iYWxzLndpZGdldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgd2lkZ2V0ID0gdGhpcy5nbG9iYWxzLndpZGdldHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHcudHlwZSA9PSB3aWRnZXQuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBXaWRnZXRzTW9kYWxFZGl0b3IgPSBTaGVsbC5XaWRnZXRzLk1vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhZ2VzLXdpZGdldHMtZGlhbG9nJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhZ2VzLXdpZGdldHMtZGlhbG9nJyxcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLk1vZGFsRWRpdG9yTWl4aW4sIENvcmUuVGFic01peGluKCdkYXRhJyldLFxyXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29udGV4dC53aWRnZXQucHJvcHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IHRoaXMuY29udGV4dC53aWRnZXQucHJvcHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBNb3ZlIHRvIHNlcnZpY2UgbGF5ZXJcclxuICAgICAgICAgICAgICAgIHZhciBwYXJhbSA9IHRoaXMuY3VycmVudC5wYXJhbXNbcHJvcC5uYW1lXSA9IHRoaXMuY3VycmVudC5wYXJhbXNbcHJvcC5uYW1lXSB8fCB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2FjdGlvbjogJ2NyZWF0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IChwcm9wLnR5cGUgPT0gJ211bHRpcGxlJyA/IFtdIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJhdGVneTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiAocHJvcC50eXBlID09ICdtdWx0aXBsZScgPyBudWxsIDogdW5kZWZpbmVkKSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYXJhbS5fYWN0aW9uID0gcGFyYW0uX2FjdGlvbiA9PSAndXBkYXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gJ3VwZGF0ZSdcclxuICAgICAgICAgICAgICAgICAgICA6ICdjcmVhdGUnXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogcHJvcCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbTogcGFyYW0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuaXRlbXMsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBoYXNQcm9wczogZnVuY3Rpb24odGFiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LndpZGdldCAmJiB0aGlzLmNvbnRleHQud2lkZ2V0LnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbnRleHQud2lkZ2V0LnByb3BzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wID0gdGhpcy5jb250ZXh0LndpZGdldC5wcm9wc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AudGFiID09IHRhYikgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFdpZGdldHNFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgncGFnZXMtd2lkZ2V0cycsIHtcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkVkaXRvck1peGluKFdpZGdldHNMaXN0Vmlld2VyLCBXaWRnZXRzTW9kYWxFZGl0b3IpXSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNwYWdlcy13aWRnZXRzJyxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICB3aWRnZXQ6IE9iamVjdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgcHJvdG86IGZ1bmN0aW9uKHdpZGdldCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHdpZGdldC5pZCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWRnZXQucHJvcHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3AgPSB3aWRnZXQucHJvcHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBNb3ZlIHRvIHNlcnZpY2UgbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXNbcHJvcC5uYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2FjdGlvbjogJ2NyZWF0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAocHJvcC50eXBlID09ICdtdWx0aXBsZScgPyBbXSA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJhdGVneTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IChwcm9wLnR5cGUgPT0gJ211bHRpcGxlJyA/IG51bGwgOiB1bmRlZmluZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS5wYXJhbXMgPSBwYXJhbXM7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KShWdWUsIGpRdWVyeSwgQ29yZSwgU2hlbGwpO1xyXG4iLCIoZnVuY3Rpb24oVnVlLCAkLCBDb3JlLCBTaGVsbCkge1xyXG5cclxuICAgIHZhciBTb3VyY2VzTGlzdFZpZXdlciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYWdlcy1zb3VyY2VzLWxpc3QnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFnZXMtc291cmNlcy1saXN0JyxcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLkxpc3RWaWV3ZXJNaXhpbl0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgU291cmNlc01vZGFsRWRpdG9yID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhZ2VzLXNvdXJjZXMtZGlhbG9nJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhZ2VzLXNvdXJjZXMtZGlhbG9nJyxcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLk1vZGFsRWRpdG9yTWl4aW5dLFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgU291cmNlc0VkaXRvciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYWdlcy1zb3VyY2VzJywge1xyXG4gICAgICAgIG1peGluczogW0NvcmUuRWRpdG9yTWl4aW4oU291cmNlc0xpc3RWaWV3ZXIsIFNvdXJjZXNNb2RhbEVkaXRvcildLFxyXG4gICAgICAgIHRlbXBsYXRlOiAnI3BhZ2VzLXNvdXJjZXMnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFNvdXJjZXNQYXJhbXNMaXN0Vmlld2VyID1cclxuICAgIFZ1ZS5jb21wb25lbnQoJ3BhZ2VzLXNvdXJjZXMtcGFyYW1zLWxpc3QnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFnZXMtc291cmNlcy1wYXJhbXMtbGlzdCcsXHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5MaXN0Vmlld2VyTWl4aW5dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFNvdXJjZXNQYXJhbXNNb2RhbEVkaXRvciA9XHJcbiAgICBWdWUuY29tcG9uZW50KCdwYWdlcy1zb3VyY2VzLXBhcmFtcy1kaWFsb2cnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFnZXMtc291cmNlcy1wYXJhbXMtZGlhbG9nJyxcclxuICAgICAgICBtaXhpbnM6IFtDb3JlLk1vZGFsRWRpdG9yTWl4aW5dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFNvdXJjZXNQYXJhbXNFZGl0b3IgPVxyXG4gICAgVnVlLmNvbXBvbmVudCgncGFnZXMtc291cmNlcy1wYXJhbXMnLCB7XHJcbiAgICAgICAgbWl4aW5zOiBbQ29yZS5FZGl0b3JNaXhpbihTb3VyY2VzUGFyYW1zTGlzdFZpZXdlciwgU291cmNlc1BhcmFtc01vZGFsRWRpdG9yKV0sXHJcbiAgICAgICAgdGVtcGxhdGU6ICcjcGFnZXMtc291cmNlcy1wYXJhbXMnLFxyXG4gICAgfSk7XHJcblxyXG59KShWdWUsIGpRdWVyeSwgQ29yZSwgU2hlbGwpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
