(function($, Vue, Core, Shell) {

    Vue.component('shell-storages', {
        template: '#shell-storages',
        props: {
            storages: Array,
        },
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

            this.$on('storages/create', ({ value }) => {
                this.$store.commit('designer/storages/create', value);
            })

            this.$on('storages/update', ({ value }) => {
                this.$store.commit('designer/storages/update', value);
            })

            this.$on('storages/remove', ({ value }) => {
                this.$store.commit('designer/storages/remove', value);
            })
        },
        computed: {
            active: function() { return this.$store.state.designer.storage; },
            items: function() { return this.$store.state.designer.page.storages; },
        },
        methods: {

            remove: function(value) {

                this.$emit('storages/remove', { value: value })
            },

            create: function() {

                var storage = {
                    _action: 'create',
                    type: this.type.name,
                    name: '',
                    variables: [],
                }

                new Shell.Storages.ModalEditor({

                    data: {
                        owner: this,
                        original: storage,
                        current: JSON.parse(JSON.stringify(storage)),
                    },

                    methods: {
                        submit: function() {

                            this.owner.$emit('storages/create', {
                                value: this.current
                            });

                            this.$destroy();
                        },
                        reset: function() {

                            this.$destroy();
                        }
                    }
                }).$mount();
            },
            update: function(storage) {

                new Shell.Storages.ModalEditor({

                    data: {
                        owner: this,
                        original: storage,
                        current: JSON.parse(JSON.stringify(storage))
                    },

                    methods: {
                        submit: function() {

                            this.owner.$emit('storages/update', {
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
