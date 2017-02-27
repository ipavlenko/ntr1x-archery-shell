(function($, Vue, Vuex, Core) {

    Vue.component('shell-page', {
        template: '#shell-page',
        mixins: [ /*Core.ContainerMixin, Core.SortableMixin*/ ],
        props: {
            page: Object,
            style: Object,
            editable: Boolean,
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
                        $eval: this.$eval
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

            this.$watch('page.storages', (storages) => {

                if (storages) {

                    let data = {};

                    for (let st of storages) {

                        let sdata = data[st.name] = {};

                        if (st.variables) {
                            for (let variable of st.variables) {
                                sdata[variable.name] = {
                                    value: this.$runtime.evaluate(this, variable.binding, variable.value)
                                };
                            }
                        }
                    }
                    this.$page.storage = data
                }
            }, {
                immediate: true,
                deep: true,
            });

            this.$watch('page.sources', (sources) => {

                if (sources) {

                    let data = {};

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
                    this.$page.sources = data
                }
            }, {
                immediate: true,
                deep: true,
            });
        },

        mounted() {
            this.$store.commit('console/log', {
                type: 'success',
                message: 'Page mounted'
            })
        }
    });

})(jQuery, Vue, Vuex, Core);
