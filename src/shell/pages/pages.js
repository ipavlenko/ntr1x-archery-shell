(function($, Vue, Core, Shell) {

    Vue.component('shell-pages', {
        template: '#shell-pages',
        props: {
            pages: Array,
            globals: Object,
        },
        methods: {
            doUpdate: function() {

                Object.assign(this.model, JSON.parse(JSON.stringify(model)), {
                    _action: this.model._action
                        ? this.model._action
                        : 'update'
                });

                $(window).trigger('resize');
            },
            remove: function() {

            },
            create: function() {

                var root = Vue.service('palette').item('default-container/default-container-stack/stack-canvas');
                var widget = Vue.service('palette').widget('default-container/default-container-stack/default-stack-canvas');

                var page = {
                    _action: 'create',
                    root: root,
                    sources: [],
                    storages: [],
                };

                var dialog = new Shell.Pages.ModalEditor({

                    data: {
                        globals: this.globals,
                        owner: this,
                        context: {
                            widget: widget,
                        },
                        original: page,
                        current: JSON.parse(JSON.stringify(page)),
                    },

                    methods: {
                        submit: function() {

                            Object.assign(this.original, JSON.parse(JSON.stringify(this.current)));
                            this.original._action = this.original._action ? this.original._action : 'create';
                            this.original.root._action = this.original.root._action ? this.original.root._action : 'create';

                            this.owner.pages.push(this.original);

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

                            Object.assign(this.original, JSON.parse(JSON.stringify(this.current)));
                            this.original._action = this.original._action ? this.original._action : 'update';
                            this.original.root._action = this.original.root._action ? this.original.root._action : 'update';

                            this.owner.pages = this.owner.pages.slice();

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
