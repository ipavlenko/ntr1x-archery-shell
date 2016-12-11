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

            this.$watch('sources', () => {

                let items = [];
                if (this.sources) {
                    for (let i = 0; i < this.sources.length; i++) {
                        let source = this.sources[i];
                        if (source._action != 'remove') {
                            items.push(source);
                        }
                    }
                }
                this.items = items;

            }, { deep: true, immediate: true })
        },
        methods: {

            remove: function(source) {

                var index = this.sources.indexOf(source);
                if (index !== -1) {
                    var item = this.sources[index];
                    if (item._action == 'create') {
                        this.sources.$remove(source);
                    } else {
                        item._action = 'remove';
                    }
                }

                this.sources = this.sources.slice();
            },

            create: function() {

                var source = {
                    _action: 'create',
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

                            Object.assign(this.original, JSON.parse(JSON.stringify(this.current)));
                            this.original._action = this.original._action ? this.original._action : 'create';

                            this.owner.sources.push(this.original);

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
            update: function(source) {

                new Shell.Sources.ModalEditor({

                    data: {
                        globals: this.globals,
                        owner: this,
                        original: source,
                        current: JSON.parse(JSON.stringify(source))
                    },

                    methods: {
                        submit: function() {

                            Object.assign(this.original, JSON.parse(JSON.stringify(this.current)));
                            this.original._action = this.original._action ? this.original._action : 'update';

                            this.owner.sources = this.owner.sources.slice();

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
