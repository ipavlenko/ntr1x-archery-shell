(function($, Vue, Vuex, Core) {

    Vue.component('shell-page', {
        template: '#shell-page',
        props: {
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
                eval: (data, { $item }) => {

                    return this.$eval(data, {
                        $item,
                        $page: this.$page,
                        $store: this.$store,
                    })
                },
                dispatch: (script, context) => {

                    return this.$store.dispatch('actions/execute', {
                        $script: script,
                        $context: context,
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
            this.$store.commit('console/log', {
                type: 'success',
                message: 'Page mounted'
            })
        },

        methods: {

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
