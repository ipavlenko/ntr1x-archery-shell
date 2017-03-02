(function($, Vue) {

    Vue.component('shell-tree', {
        template: '#shell-tree',
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
                open: false,
                layer: false,
                visible: true,
            }
        },
        created() {
            this.open = this.level < 3
            this.layer = this.widget.name == 'default-container/default-container-layers/default-layers-item'
        },
        methods: {
            toggle() {
                this.$store.commit('designer/property/update', {
                    parent: this.widget.designer,
                    property: 'hidden',
                    value: !this.widget.designer.hidden
                })
            },
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
