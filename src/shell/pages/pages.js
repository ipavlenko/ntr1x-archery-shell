(function($, Vue) {

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
                { name: 'composite', title: 'Composites' },
            ];

            this.type = this.types[0];
        },
        computed: {
            active: function() { return this.$store.state.designer.page; },
            items: function() { return this.$store.state.designer.content.pages; },
        },
        methods: {

            remove: function(page) {
                this.$store.commit('designer/pages/remove', page)
            },

            create: function() {

                let root = this.$store.getters.palette.item('default-container/default-container-stack/stack-canvas');
                let widget = this.$store.getters.palette.widget('default-container/default-container-stack/default-stack-canvas');

                let page = {
                    root: root,
                    type: this.type.name,
                    sources: [],
                    storages: [],
                };

                this.$store.commit('modals/editor/show', {
                    name: 'pages-dialog',
                    context: { type: 'create', widget },
                    original: page,
                    events: {
                        submit: (current) => { this.$store.commit('designer/pages/create', current) },
                    }
                })
            },
            update: function(page) {

                let widget = this.$store.getters.palette.widget('default-container/default-container-stack/default-stack-canvas');

                this.$store.commit('modals/editor/show', {
                    name: 'pages-dialog',
                    context: { type: 'update', widget },
                    original: page,
                    events: {
                        submit: (current) => { this.$store.commit('designer/pages/update', current) },
                    }
                })
            },
        }
    });

})(jQuery, Vue);
