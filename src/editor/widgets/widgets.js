(function($, Vue) {

    Vue.component('widgets', {
        template: '#widgets',
        props: {
            widgets: Array,
            options: Array,
            owner: Object,
        },
        mounted() {

            let self = this

            this.sortable = $(this.$el).sortable({

                drop: true,
                offset: 'position',

                containerSelector: 'tbody',
                itemSelector: 'tr',
                excludeSelector: '.btn',

                placeholder: `
                    <tr class="ge ge-sortable-placeholder">
                        <td class="ge ge-placeholder-container" colspan="5">
                            <div class="ge ge-placeholder-inner"></div>
                        </td>
                    </tr>
                `,

                onDrop: function(context, event, _super) {
                    _super(context, event)

                    let source = context.$item.data('uuid')
                    let target = context.location.$item.data('uuid')

                    let sourceIndex = 0
                    let targetIndex = 0

                    let array = [ ...self.widgets ]

                    for (let i = 0; i < array.length; i++) {

                        let w = array[i]

                        if (w.uuid == source) sourceIndex = i
                        if (w.uuid == target) targetIndex = i
                    }

                    targetIndex = context.location.after ? (targetIndex + 1) : targetIndex
                    // targetIndex = context.location.before ? (targetIndex - 1) : targetIndex

                    let w = array[sourceIndex]

                    if (targetIndex < sourceIndex) {
                        array.splice(sourceIndex, 1)
                        array.splice(targetIndex, 0, w)
                    } else if (targetIndex > sourceIndex) {
                        array.splice(targetIndex, 0, w)
                        array.splice(sourceIndex, 1)
                    }

                    context.$item.remove()

                    self.$store.commit('designer/property/update', {
                        parent: self.owner,
                        property: 'widgets',
                        value: array
                    })
                }
            })
        },
        methods: {
            create(option) {
                this.$store.getters
                    .produce(option.name)
                    .then(d => {
                        this.$store.commit('designer/widgets/create', {
                            parent: this.owner,
                            widget: d
                        })
                    })
                    .catch(() => {})
            },
            toggle(widget) {
                this.$store.commit('designer/property/update', {
                    parent: widget.designer,
                    property: 'hidden',
                    value: !widget.designer.hidden
                })
            },
            remove(widget) {
                this.$store.commit('designer/widgets/remove', { parent: this.owner, widget: widget });
            },
            update(widget) {
                this.$store.commit('modals/editor/show', {
                    name: 'shell-widgets-dialog',
                    context: {
                        type: 'update',
                        widget: this.$store.getters.palette.widget(widget.name)
                    },
                    original: widget,
                    events: {
                        submit: (current) => { this.$store.commit('designer/params/update', { model: widget, value: current }) },
                    }
                })
            }
        }
    });

})(jQuery, Vue);
