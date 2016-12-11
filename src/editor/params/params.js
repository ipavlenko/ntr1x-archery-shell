(function(Vue, $, Core, Shell) {

    var ParamVariable =
    Vue.component('params-variable', {
        template: '#params-variable',
        props: {
            id: String,
            item: Object,
        }
    });

    var ParamAsis =
    Vue.component('params-asis', {
        template: '#params-asis',
        props: {
            id: String,
            item: Object,
        },
        data: function() {
            return {
                value: this.value,
                error: this.error,
            }
        },
        created: function() {

            try {
                this.value = this.item.param.value == null
                    ? null
                    : JSON.stringify(this.item.param.value)
                ;
                this.error = false;
            } catch (e) {
                this.value = '';
                this.error = true;
            }

            this.$watch('value', (v) => {

                let pv = null;

                try {
                    pv = (v == null || v == '')
                        ? null
                        : JSON.parse(v)
                    ;
                    this.error = false;
                } catch (e) {
                    pv = null;
                    console.log(e, v);
                    this.error = true;
                }

                this.item.param.value = pv;
            });
        },
    });

    var ParamString =
    Vue.component('params-string', {
        template: '#params-string',
        props: {
            id: String,
            item: Object,
        }
    });

    var ParamSelect =
    Vue.component('params-select', {
        template: '#params-select',
        props: {
            id: String,
            item: Object,
        }
    });

    var ParamRich =
    Vue.component('params-rich', {
        template: '#params-rich',
        props: {
            id: String,
            item: Object,
        }
    });

    var ParamSource =
    Vue.component('params-source', {
        template: '#params-source',
        props: {
            id: String,
            item: Object,
        }
    });

    var ParamMultiple =
    Vue.component('params-multiple', {
        template: '#params-multiple',
        props: {
            id: String,
            item: Object,
        },
        data: function() {
            return {
                items: this.item.items
            }
        },
    });

    var ParamObject =
    Vue.component('params-object', {
        template: '#params-object',
        props: {
            id: String,
            item: Object,
        },
    });

    var Params =
    Vue.component('params', {
        template: '#params',
        props: {
            owner: Object,
            tab: String,
            items: Array,
        }
    });

    var defaults = {
        'multiple': [],
        'object': {},
    };

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

            this.current.binding = this.current.binding || {
                strategy: 'interpolate',
                expression: null,
            }

            if (this.context.prop.props) {

                for (var i = 0; i < this.context.prop.props.length; i++) {

                    var prop = this.context.prop.props[i];
                    var param = this.current.value[prop.name] = this.current.value[prop.name] || { value: defaults[prop.type] || null };

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

            this.items = items.slice();
        },
        methods: {
            setStrategy: function(strategy) {
                this.current.binding.strategy = strategy;
                this.$forceUpdate();
            },
            getStrategy: function() {
                return this.current.binding.strategy;
            },
        },
    });

    var ParamBindingsEditor =
    Vue.component('params-bindings', {
        mixins: [Core.ActionMixin(ParamBindingsModalEditor)],
    });

    var ParamProtoModalEditor =
    Vue.component('params-proto-dialog', {
        template: '#params-proto-dialog',
        mixins: [ Core.ModalEditorMixin, Core.TabsMixin('binding') ],
        data: function() {
            return {
                items: this.items,
            };
        },
        created: function() {

            var items = [];

            this.current.binding = this.current.binding || {
                strategy: 'interpolate',
                expression: null,
            }

            if (this.context.prop.props) {

                for (var i = 0; i < this.context.prop.props.length; i++) {

                    var prop = this.context.prop.props[i];
                    var param = this.current.proto[prop.name] = this.current.proto[prop.name] || { value: defaults[prop.type] || null };

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

            this.items = items.slice();
        },
        methods: {
            setStrategy: function(strategy) {
                this.current.binding.strategy = strategy;
                this.$forceUpdate();
            },
            getStrategy: function() {
                return this.current.binding.strategy;
            },
        },
    });

    var ParamProtoEditor =
    Vue.component('params-proto', {
        mixins: [Core.ActionMixin(ParamProtoModalEditor)],
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

            for (var i = 0; i < this.context.prop.props.length; i++) {

                var prop = this.context.prop.props[i];
                var param = this.current[prop.name] = this.current[prop.name] || { value: defaults[prop.type] || null };

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

            this.items = items.slice();
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
        }
    });

})(Vue, jQuery, Core, Shell);
