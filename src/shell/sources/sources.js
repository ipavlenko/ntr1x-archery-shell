(function($, Vue, Core, Shell) {

    Vue.component('shell-sources', {
        template: '#shell-sources',
        props: {
            sources: Array,
            globals: Object,
        },
        data: function() {
            return {
                type: this.type,
                types: this.types,
                items: this.items,
            }
        },
        created: function() {

            this.types = [
                { name: 'source', title: 'Sources' },
                { name: 'method', title: 'Methods' },
            ];

            this.type = this.types[0];

            this.$on('sources/create', ({ value }) => {
                this.$store.commit('designer/sources/create', value);
            })

            this.$on('sources/update', ({ value }) => {
                this.$store.commit('designer/sources/update', value);
            })

            this.$on('sources/remove', ({ value }) => {
                this.$store.commit('designer/sources/remove', value);
            })
        },
        computed: {
            active: function() { return this.$store.state.designer.source; },
            items: function() { return this.$store.state.designer.page.sources; },
        },
        methods: {

            remove: function(value) {

                this.$emit('sources/remove', { value: value })
            },

            create: function() {

                var source = {
                    method: 'GET',
                    type: this.type.name,
                    params: [],
                    url: '',
                    name: ''
                }

                new Shell.Sources.ModalEditor({

                    data: {
                        globals: this.globals,
                        owner: this,
                        original: source,
                        current: JSON.parse(JSON.stringify(source)),
                    },

                    methods: {
                        submit: function() {

                            this.owner.$emit('sources/create', {
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

            update: function(source) {

                new Shell.Sources.ModalEditor({

                    data: {
                        owner: this,
                        original: source,
                        current: JSON.parse(JSON.stringify(source))
                    },

                    methods: {
                        submit: function() {

                            this.owner.$emit('sources/update', {
                                value: this.current,
                                oldValue: this.original,
                            });

                            this.$destroy();
                        },
                        reset: function() {

                            this.$destroy();
                        }
                    }
                }).$mount()
            },
        }
    });

})(jQuery, Vue, Core, Shell);
