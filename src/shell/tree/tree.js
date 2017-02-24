(function($, Vue) {

    Vue.component('shell-tree', {
        template: '#shell-tree',
        data: function() {
            return {
                widget: this.widget
            }
        },
        created() {
            this.widget = this.$store.state.designer.page.root
        }
    });

    Vue.component('shell-tree-item', {
        template: '#shell-tree-item',
        props: {
            parent: Object,
            widget: Object,
            level: Number,
        },
        data: function() {
            return {
                open: this.open
            }
        },
        created() {
            this.open = this.level < 3
        },
        methods: {
            remove() {
                this.$store.commit('designer/widgets/remove', { parent: this.parent, widget: this.widget });
            },
            update() {
                this.$store.commit('modals/editor/show', {
                    name: 'shell-widgets-dialog',
                    context: {
                        type: 'update',
                        widget: this.$store.getters.palette.widget(this.widget.name)
                    },
                    original: this.widget,
                    events: {
                        submit: (current) => { this.$store.commit('designer/params/update', { model: this.widget, value: current }) },
                    }
                })
            }
        }
    });


})(jQuery, Vue);
