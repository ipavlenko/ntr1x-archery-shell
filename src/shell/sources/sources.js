(function($, Vue, Core, Shell) {

    Vue.component('shell-sources', {
        template: '#shell-sources',
        data: function() {
            return {
                type: this.type,
                types: this.types,
            }
        },
        created: function() {

            this.types = [
                { name: 'source', title: 'Sources' },
                { name: 'method', title: 'Methods' },
            ];

            this.type = this.types[0];
        },
        computed: {
            active: function() { return this.$store.state.designer.source; },
            items: function() { return this.$store.state.designer.page.sources; },
        },
        methods: {

            remove: function(value) {

                this.$store.commit('designer/sources/remove', value);
            },

            create: function() {

                let source = {
                    type: this.type.name,
                    method: 'GET',
                    params: [],
                    url: '',
                    name: ''
                }

                this.$store.commit('modals/editor/show', {
                    name: 'pages-sources-dialog',
                    context: { type: 'create' },
                    original: source,
                    events: {
                        submit: (current) => { this.$store.commit('designer/sources/create', current) },
                    }
                })
            },

            update: function(source) {

                this.$store.commit('modals/editor/show', {
                    name: 'pages-sources-dialog',
                    context: { type: 'update' },
                    original: source,
                    events: {
                        submit: (current) => { this.$store.commit('designer/sources/update', current) },
                    }
                })
            },
        }
    });

})(jQuery, Vue, Core, Shell);
