(function($, Vue, Core, Shell) {

    Vue.component('shell-storages', {
        template: '#shell-storages',
        props: {
            storages: Array,
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
                { name: 'storage', title: 'Storages' },
                { name: 'result', title: 'Results' },
            ];

            this.type = this.types[0];

            this.$watch('storages', () => {

                var items = [];
                for (var i = 0; i < this.storages.length; i++) {
                    var storage = this.storages[i];
                    if (storage._action != 'remove') {
                        items.push(storage);
                    }
                }
                this.items = items;

            }, { deep: true, immediate: true })
        },
        methods: {

            remove: function(storage) {

                var index = this.storages.indexOf(storage);
                if (index !== -1) {
                    var item = this.storages[index];
                    if (item._action == 'create') {
                        this.storages.$remove(storage);
                    } else {
                        item._action = 'remove';
                    }
                }

                this.storages = this.storages.slice();
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
                        globals: this.globals,
                        owner: this,
                        original: storage,
                        current: JSON.parse(JSON.stringify(storage)),
                    },

                    methods: {
                        submit: function() {

                            Object.assign(this.original, JSON.parse(JSON.stringify(this.current)));
                            this.original._action = this.original._action ? this.original._action : 'create';

                            this.owner.storages.push(this.original);

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
            update: function(storage) {

                new Shell.Storages.ModalEditor({

                    data: {
                        globals: this.globals,
                        owner: this,
                        original: storage,
                        current: JSON.parse(JSON.stringify(storage))
                    },

                    methods: {
                        submit: function() {

                            Object.assign(this.original, JSON.parse(JSON.stringify(this.current)));
                            this.original._action = this.original._action ? this.original._action : 'update';

                            this.owner.storages = this.owner.storages.slice();

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
