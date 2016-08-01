(function($, Vue, Core, Shell) {

    Vue.component('shell-pages', {
        template: '#shell-pages',
        props: {
            pages: Array,
            globals: Object,
        },
        data: function() {
            return {
                items: this.items,
            }
        },
        created: function() {

            this.$watch('pages', (pages) => {

                var items = [];
                for (var i = 0; i < this.pages.length; i++) {
                    var page = this.pages[i];
                    if (page._action != 'remove') {
                        items.push(page);
                    }
                }
                this.items = items;
                
            }, { deep: true, immediate: true })
        },
        methods: {

            remove: function(page) {

                var index = this.pages.indexOf(page);
                if (index !== -1) {
                    var item = this.pages[index];
                    if (item._action == 'create') {
                        this.pages.$remove(item);
                    } else {
                        item._action = 'remove';
                    }
                }

                this.pages = this.pages.slice();
                // console.log(this.pages);
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
