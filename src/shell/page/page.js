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
                storage: null,
                sources: null,
            }
        },
        created: function() {

            this.widget = this.$store.getters.palette.widget('default-container/default-container-stack/default-stack-canvas');

            var runtime = Vue.service('runtime');

            this.decorator = 'shell-decorator-canvas';

            this.$watch('page.storages', (storages) => {

                if (storages) {

                    let data = {};

                    for (let st of storages) {

                        let sdata = data[st.name] = {};

                        if (st.variables) {
                            for (let variable of st.variables) {
                                sdata[variable.name] = {
                                    value: runtime.evaluate(this, variable.binding, variable.value)
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

            let loadData = (sources) => {

                if (sources) {

                    let deferred = [];
                    for (let source of sources) {
                        deferred.push(this.doRequest(source));
                    }

                    if (deferred.length > 1) {

                        $.when.apply(this, deferred)
                            .done(function() {

                                let data = {};
                                for (let i = 0; i < arguments.length; i++) {
                                    data[sources[i].name] = arguments[i][0];
                                }

                                this.$page.sources = data;

                            }.bind(this));

                    } else if (deferred.length == 1) {

                        deferred[0]
                            .done((d) => {

                                let data = {};
                                data[sources[0].name] = d;
                                this.$page.sources = data;
                            })
                            .fail((e, e1, e2) => {
                                console.log(e, e1, e2);
                            });
                    }
                }

            };

            this.$watch('page.sources', (sources) => loadData(sources), {
                immediate: true,
                deep: true,
            });

            // this.$watch('storage', () => loadData(this.page.sources), {
            //     immediate: true,
            //     deep: true,
            // });

            // console.log(this.$page);
        },
        methods: {
            doRequest: function(s) {
                var query = {};
                for (var i = 0; i < s.params.length; i++) {
                    var param = s.params[i];
                    if (param.in == 'query' && param.specified) {

                        var b = param.binding;
                        var v = param.value;

                        var value = Vue.service('runtime').evaluate(this, b, v);

                        query[param.name] = value;
                    }
                }

                return $.ajax({
                    method: s.method,
                    url: s.url,
                    dataType: 'json',
                    data: query,
                });
            }
        },
    });

})(jQuery, Vue, Vuex, Core);
