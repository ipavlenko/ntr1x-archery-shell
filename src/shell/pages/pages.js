(function($, Vue, Core, Shell) {

    Vue.component('shell-pages', {
        template: '#shell-pages',
        props: {
            pages: Array,
            globals: Object,
        },
        methods: {
            doApply: function() {

            },
            remove: function() {

            },
            create: function() {

                var widget = Vue.service('palette').widget('default-container/default-container-stack/default-stack-canvas');

                var dialog = new Shell.Pages.ModalEditor({

                    data: {
                        globals: this.globals,
                        owner: this,
                        context: {
                            widget: widget,
                        },
                        original: page,
                        current: {
                            params: [],
                            widgets: [],
                            sources: [],
                            storages: [],
                        },
                    },

                    methods: {
                        submit: function() {
                            // this.owner.doApply(this.current);
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
            update: function(page) {

                var widget = Vue.service('palette').widget('default-container/default-container-stack/default-stack-canvas');

                var dialog = new Shell.Pages.ModalEditor({

                    data: {
                        globals: this.globals,
                        owner: this,
                        context: {
                            widget: widget,
                        },
                        original: page,
                        current: JSON.parse(JSON.stringify(page))
                    },

                    methods: {
                        submit: function() {
                            // this.owner.doApply(this.current);
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
            trigger: function(event, item, context) {
                this.$dispatch(event, { item: item, context: context });
            },
        }
    });

})(jQuery, Vue, Core, Shell);
