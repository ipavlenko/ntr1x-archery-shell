(function($, Vue, Core, Shell) {

    Vue.component('shell-page', {
        template: '#shell-page',
        mixins: [ /*Core.ContainerMixin, Core.SortableMixin*/ ],
        props: {
            globals: Object,
            settings: Object,
            page: Object,
            editable: Boolean,
        },
        data: function() {
            return {
                decorator: this.decorator,
                data: this.data,
                storage: this.storage,
                widget: this.widget,
            };
        },
        created: function() {

            this.widget = Vue.service('palette').widget('default-container/default-container-stack/default-stack-canvas');

            var runtime = Vue.service('runtime');

            this.decorator = 'shell-decorator-canvas';
            this.data = {};
            this.storage = {};

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

            let loadData = (sources) => {

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

            };

            this.$watch('page.sources', (sources) => loadData(sources), {
                immediate: true,
                deep: true,
            });

            this.$watch('storage', (storage) => loadData(this.page.sources), {
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

                        var b = param.binding;
                        var v = param.value;

                        var value = Vue.service('runtime').evaluate(this, b, v);

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
        events: {
            // modal: function(name, config) {
            //     window.Modal.show(this.page, config);
            // },
            action: function(expression) {
                eval(expression);
            },
        }
    });

})(jQuery, Vue, Core, Shell);
