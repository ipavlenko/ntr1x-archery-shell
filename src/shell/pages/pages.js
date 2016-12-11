(function($, Vue, Core, Shell) {

    Vue.component('shell-pages', {
        template: '#shell-pages',
        data: function() {
            return {
                type: this.type,
                types: this.types,
            }
        },
        created: function() {

            this.types = [
                { name: 'page', title: 'Pages' },
                { name: 'modal', title: 'Modals' },
            ];

            this.type = this.types[0];

            this.$on('pages/create', ({ value }) => {
                this.$store.commit('designer/pages/create', value);
            })

            this.$on('pages/update', ({ value }) => {
                this.$store.commit('designer/pages/update', value);
            })

            this.$on('pages/remove', ({ value }) => {
                this.$store.commit('designer/pages/remove', value);
            })
        },
        computed: {
            active: function() { return this.$store.state.designer.page; },
            items: function() { return this.$store.state.designer.pages; },
        },
        methods: {

            remove: function(page) {
                this.$emit('pages/remove', { value: page })
            },

            create: function() {

                var root = this.$store.getters.palette.item('default-container/default-container-stack/stack-canvas');
                var widget = this.$store.getters.palette.widget('default-container/default-container-stack/default-stack-canvas');

                var page = {
                    _action: 'create',
                    root: root,
                    type: this.type.name,
                    sources: [],
                    storages: [],
                };

                new Shell.Pages.ModalEditor({

                    data: {
                        owner: this,
                        context: {
                            widget: widget,
                        },
                        original: page,
                        current: JSON.parse(JSON.stringify(page)),
                    },

                    methods: {
                        submit: function() {

                            this.owner.$emit('pages/create', {
                                value: this.current
                            });

                            this.$destroy();
                        },
                        reset: function() {

                            this.$destroy();
                        }
                    }
                }).$mount()
            },
            update: function(page) {

                var widget = this.$store.getters.palette.widget('default-container/default-container-stack/default-stack-canvas');

                new Shell.Pages.ModalEditor({

                    data: {
                        owner: this,
                        context: {
                            widget: widget,
                        },
                        original: page,
                        current: JSON.parse(JSON.stringify(page))
                    },

                    methods: {

                        submit: function() {

                            this.owner.$emit('pages/update', {
                                value: this.current,
                                oldValue: this.original,
                            });

                            this.$destroy();
                        },
                        reset: function() {

                            this.$destroy();
                        }
                    }
                }).$mount();
            },
        }
    });

})(jQuery, Vue, Core, Shell);
