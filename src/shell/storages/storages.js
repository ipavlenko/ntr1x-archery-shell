(function($, Vue) {

    Vue.component('shell-storages', {
        template: '#shell-storages',
        data: function() {
            return {
                type: this.type,
                types: this.types,
            }
        },
        created: function() {

            this.types = [
                { name: 'storage', title: 'Storages' },
                { name: 'result', title: 'Results' },
            ];

            this.type = this.types[0];
        },
        computed: {
            active: function() { return this.$store.state.designer.storage; },
            items: function() { return this.$store.state.designer.page.storages; },
        },
        methods: {

            remove: function(value) {

                this.$store.commit('designer/storages/remove', value);
            },

            create: function() {

                let storage = {
                    type: this.type.name,
                    name: '',
                    variables: [],
                }

                this.$store.commit('modals/editor/show', {
                    name: 'storages-dialog',
                    context: { type: 'create' },
                    original: storage,
                    events: {
                        submit: (current) => { this.$store.commit('designer/storages/create', current) },
                    }
                })
            },

            update: function(storage) {

                this.$store.commit('modals/editor/show', {
                    name: 'storages-dialog',
                    context: { type: 'update' },
                    original: storage,
                    events: {
                        submit: (current) => { this.$store.commit('designer/storages/update', current) },
                    }
                })
            },
        }
    });

})(jQuery, Vue);
