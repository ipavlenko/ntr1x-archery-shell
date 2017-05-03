(function($, Vue, Vuex, Core) {

    Vue.component('shell-page', {
        template: '#shell-page',
        props: {
            id: String,
            page: Object,
            settings: Object,
            style: Object,
            editable: Boolean,
            scalable: Boolean,
        },
        data: function() {
            return {
                decorator: this.decorator,
                widget: this.widget,
                context: this.context,
            };
        },
        beforeCreate: function() {

            this.$page = {
                uuid: Core.UUID.random(),
                actions: null,
                settings: null,
                storage: null,
                sources: null,
                refs: {},
                eval: (data, { $item }) => {

                    return this.$eval(data, {
                        $item,
                        $page: this.$page,
                        $store: this.$store,
                    })
                },
                dispatch: (script, context, event) => {

                    return this.$store.dispatch('actions/execute', {
                        $script: script,
                        $context: context,
                        $event: event,
                        $page: this.$page,
                        $store: this.$store,
                        $eval: this.$eval.bind(this)
                    })
                }
            }
        },
        created: function() {

            this.$store.commit('console/clear')
            this.$store.commit('console/log', {
                type: 'success',
                message: 'Page created'
            })

            this.widget = this.$store.getters.palette.widget('default-container/default-container-stack/default-stack-canvas');

            this.decorator = 'shell-decorator-canvas';

            this.$watch('settings', (settings) => {

                this.updateSettings(settings)
                this.updateStorages(this.page.storages)
            }, {
                deep: true,
            })

            this.$watch('page.storages', (storages) => {


                this.updateStorages(storages)
                this.updateSources(this.page.sources)
            }, {
                deep: true,
            });

            this.$watch('page.sources', (sources) => {

                this.updateSources(sources)
            }, {
                deep: true,
            });

            this.updateSettings(this.page.settings)
            this.updateStorages(this.page.storages)
            this.updateSources(this.page.sources)
        },

        mounted() {

            this.createChildRef()

            this.$store.commit('console/log', {
                type: 'success',
                message: 'Page mounted'
            })
        },

        destroyed() {
            this.removeChildRef()
        },

        methods: {

            createChildRef() {

                if (this.$parent && this.$parent.$page && this.id) {

                    let registry = this.$parent.$page.refs[this.id];
                    if (!registry) {
                        let array = []
                        registry = this.$parent.$page.refs[this.id] = (() => array)
                    }
                    registry().push(this.$page)
                }
            },

            removeChildRef() {

                if (this.$parent && this.$parent.$page && this.id) {

                    let registry = this.$parent.$page.refs[this.id];
                    if (registry) {
                        let array = registry()
                        if (array) {
                            array.splice(array.indexOf(this.$page), 1)
                        }
                        if (!array.length) {
                            delete this.$parent.$page.refs[this.id]
                        }
                    }
                }
            },

            updateSettings(settings) {

                this.$page.settings = settings
            },

            updateStorages(storages) {

                let data = {};

                if (storages) {

                    for (let st of storages) {

                        let sdata = data[st.name] = {};

                        if (st.variables) {
                            for (let variable of st.variables) {

                                let v = variable.value
                                if (this.settings && (st.name in this.settings) && (variable.name in this.settings[st.name])) {
                                    v =  this.settings[st.name][variable.name]
                                }

                                sdata[variable.name] = {
                                    value: this.$runtime.evaluate(this, variable.binding, v)
                                };
                            }
                        }
                    }
                }

                this.$page.storage = data
            },

            updateSources(sources) {

                let data = {};

                if (sources) {

                    for (let sr of sources) {

                        data[sr.name] = (d) => {

                            return this.$store.dispatch('actions/ajax', {
                                $context: d,
                                $method: sr,
                                $page: this.$page,
                                $store: this.$store,
                                $eval: this.$eval,
                                $runtime: this.$runtime,
                            })
                        }
                    }
                }

                this.$page.sources = data
            }
        }
    });

})(jQuery, Vue, Vuex, Core);
