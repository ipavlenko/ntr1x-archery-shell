(function(Vue, $, Core, Shell) {

    Vue.component('params-variable', {
        template: '#params-variable',
        props: {
            id: String,
            item: Object,
        }
    });

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

    Vue.component('params-string', {
        template: '#params-string',
        props: {
            id: String,
            item: Object,
        }
    });

    Vue.component('params-select', {
        template: '#params-select',
        props: {
            id: String,
            item: Object,
        }
    });

    Vue.component('params-rich', {
        template: '#params-rich',
        props: {
            id: String,
            item: Object,
        }
    });

    Vue.component('params-action', {
        template: '#params-action',
        props: {
            id: String,
            item: Object,
        },
        computed: {
            actions: function() {
                return [
                    'actions/execute',
                    'modals/show',
                    'modals/close',
                ]
            }
        },
        methods: {
            select: function(action) {
                this.$store.commit('designer/property/update', { parent: this.item.param, property: 'action', value: action })
            }
        }
    });

    Vue.component('params-source', {
        template: '#params-source',
        props: {
            id: String,
            item: Object,
        }
    });

    Vue.component('params-multiple', {
        template: '#params-multiple',
        props: {
            id: String,
            item: Object,
        },
        methods: {

            label: function(item, index) {

                if (this.item.prop.display) {

                    try {
                        return this.item.prop.display(item, index)
                    } catch (e) {
                        // ignore
                    }
                }

                return '<item>';
            },

            remove: function(index) {

                this.$store.commit('designer/array/remove', { parent: this.item.param, property: 'value', index })
                this.$forceUpdate()
            },

            create: function() {

                let value = {
                }

                this.$store.commit('modals/editor/show', {
                    name: 'params-multiple-dialog',
                    context: { type: 'create', prop: this.item.prop },
                    original: value,
                    events: {
                        submit: (current) => {
                            this.$store.commit('designer/array/create', { parent: this.item.param, property: 'value', item: current })
                            this.$forceUpdate()
                        },
                    }
                })
            },

            update: function(current, index) {

                this.$store.commit('modals/editor/show', {
                    name: 'params-multiple-dialog',
                    context: { type: 'update', prop: this.item.prop },
                    original: current,
                    events: {
                        submit: (current) => {
                            this.$store.commit('designer/array/update', { parent: this.item.param, property: 'value', item: current, index })
                            this.$forceUpdate()
                        },
                    }
                })
            },
        }
    });

    Vue.component('params-object', {
        template: '#params-object',
        props: {
            id: String,
            item: Object,
        },
    });

    Vue.component('params', {
        template: '#params',
        props: {
            tab: String,
            items: Array,
        }
    });

    Vue.component('params-bindings-dialog', {
        template: '#params-bindings-dialog',
        mixins: [ Core.ModalEditorMixin, Core.TabsMixin('binding') ],
        computed: {
            items: function() {
                return this.context.prop.props.map(prop => ({
                    prop,
                    owner: this.current.value,
                    param: this.current.value[prop.name]
                }))
            }
        },

        created: function() {

            this.current.binding = this.current.binding || {
                strategy: 'interpolate',
                expression: null,
            }

            if (this.context.prop.props) {
                for (let prop of this.context.prop.props) {
                    this.current.value[prop.name] = this.current.value[prop.name] || window.Widgets.buildParam(prop, { value: null })
                }
            }
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

    Vue.component('params-bindings', {
        mixins: [Core.ActionMixin('params-bindings-dialog')],
    });

    Vue.component('params-proto-dialog', {
        template: '#params-proto-dialog',
        mixins: [ Core.ModalEditorMixin, Core.TabsMixin('data') ],
        computed: {
            items: function() {
                return this.context.prop.props.map(prop => ({
                    prop,
                    owner: this.current.binding.proto,
                    param: this.current.binding.proto[prop.name]
                }))
            }
        },
        created: function() {
            this.current.binding = this.current.binding || {
                strategy: 'interpolate',
                expression: null,
                proto: {}
            }

            if (this.context.prop.props) {
                for (let prop of this.context.prop.props) {
                    this.current.binding.proto[prop.name] = this.current.binding.proto[prop.name] || window.Widgets.buildParam(prop, { value: null })
                }
            }
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

    Vue.component('params-proto', {
        mixins: [Core.ActionMixin('params-proto-dialog')],
    });

    Vue.component('params-multiple-dialog', {
        template: '#params-multiple-dialog',
        mixins: [ Core.ModalEditorMixin, Core.TabsMixin('data') ],
        computed: {
            items: function() {
                return this.context.prop.props.map(prop => ({
                    prop,
                    owner: this.current,
                    param: this.current[prop.name]
                }))
            },
        },
        created: function() {

            if (this.current == null) {
                this.current = {}
            }

            if (this.context.prop.props) {
                for (let prop of this.context.prop.props) {
                    this.current[prop.name] = this.current[prop.name] || window.Widgets.buildParam(prop, { value: null })
                }
            }
        }
    });

    Vue.component('params-list', {
        template: '#params-list',
        props: {
            tab: String,
            items: Array,
        }
    });

})(Vue, jQuery, Core, Shell);
