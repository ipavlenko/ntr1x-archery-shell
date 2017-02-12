(function($, Vue, Core) {

    Vue.component('images-dialog', {
        template: '#images-dialog',
        mixins: [ Core.ModalDialog ],
        data() {
            return {
                active: this.active,
                collections: this.collections,
                images: this.images,
            }
        },
        created: function() {

            this.collections = this.$store.state.designer.content.images

            this.activate(this.collections && this.collections.length
                ? this.collections[0]
                : null
            )
        },
        methods: {

            activate(collection) {

                this.active = collection
                this.images = []
                if (this.active) {
                    this.$store
                        .dispatch('upload/image/list', { aspect: this.active.name })
                        .then(d => { this.images = d.data.content; })
                }
            },

            upload(e) {

                let file = e.target.files && e.target.files.length && e.target.files[0]

                this.$store
                    .dispatch('upload/image', {
                        file,
                        settings: {
                            aspects: [ this.active.name ],
                            items: this.active.items,
                        }
                    })
                    .then(
                        (d) => { this.images.unshift(d.data) }
                    )
            },

            create() {

                let collection = {
                    name: '',
                    title: '',
                    items: [
                        { name: 'thumb', format: 'png', type: 'COVER', width: 120, height: 60 },
                        { name: 'image', format: 'jpg', type: 'LIMIT', width: 1920, height: 1024 },
                    ]
                }

                this.$store.commit('modals/editor/show', {
                    name: 'images-collection-dialog',
                    context: { type: 'create' },
                    original: collection,
                    events: {
                        submit: (current) => {
                            this.$store.commit('designer/items/create', {
                                parent: this.$store.state.designer.content,
                                property: 'images',
                                item: current
                            })

                            this.activate(this.collections[this.collections.length - 1])
                        },
                    }
                })
            },

            update(collection) {

                this.$store.commit('modals/editor/show', {
                    name: 'images-collection-dialog',
                    context: { type: 'edit' },
                    original: collection,
                    events: {
                        submit: (current) => {
                            this.$store.commit('designer/items/update', {
                                parent: this.$store.state.designer.content,
                                property: 'images',
                                item: current
                            })
                        },
                    }
                })
            },

            remove(collection) {

                this.$store.commit('designer/items/remove', {
                    parent: this.$store.state.designer.content,
                    property: 'images',
                    item: collection
                })

                this.images = this.$store.state.designer.content.images

                this.activate(this.collections && this.collections.length
                    ? this.collections[0]
                    : null
                )
            },

            details(item) {

                this.$store.commit('modals/editor/show', {
                    name: 'images-details-dialog',
                    context: { type: 'edit', collection: this.active },
                    original: item,
                    events: {
                        submit: (current) => {
                            // this.$store.commit('designer/items/update', {
                            //     parent: this.$store.state.designer.content,
                            //     property: 'images',
                            //     item: current
                            // })
                        },
                    }
                })
            },

            reset() {
                this.$destroy()
                this.$store.commit('modals/dialog/close')
            },
        },
    });

    Vue.component('images-collection-dialog', {
        template: '#images-collection-dialog',
        mixins: [ Core.ModalEditorMixin ],
        methods: {

            create() {

                let converter = {
                    name: '',
                    format: 'jpg',
                    type: 'CONTAIN',
                    width: '320',
                    height: '240'
                }

                this.$store.commit('modals/editor/show', {
                    name: 'images-converter-dialog',
                    context: { type: 'create', collection: this.current },
                    original: converter,
                    events: {
                        submit: (current) => {
                            this.$store.commit('designer/items/create', {
                                parent: this.current,
                                property: 'items',
                                item: current
                            })
                        },
                    }
                })
            },

            update(converter) {

                this.$store.commit('modals/editor/show', {
                    name: 'images-converter-dialog',
                    context: { type: 'update', collection: this.current },
                    original: converter,
                    events: {
                        submit: (current) => {
                            this.$store.commit('designer/items/update', {
                                parent: this.current,
                                property: 'items',
                                item: current
                            })
                        },
                    }
                })
            },

            remove(converter) {

                this.$store.commit('designer/items/remove', {
                    parent: this.current,
                    property: 'items',
                    item: converter
                })
            },
        }
    });

    Vue.component('images-converter-dialog', {
        template: '#images-converter-dialog',
        mixins: [ Core.ModalEditorMixin ],
        created() {
            this.validation = {
                valid: false
            }

            this.$watch('current.name', () => this.validate())
            this.$watch('current.format', () => this.validate())
            this.validate()
        },
        computed: {
            width: {
                get() { return parseInt(this.current.width, 10) || null },
                set(value) { this.current.width = parseInt(value, 10) || null },
            },
            height: {
                get() { return parseInt(this.current.height, 10) || null },
                set(value) { this.current.height = parseInt(value, 10) || null },
            }
        },
        methods: {

            validate() {

                this.validation.valid =
                        this.current.name != ''
                     && this.current.format != ''
            }
        }
    });

    Vue.component('images-details-dialog', {
        template: '#images-details-dialog',
        mixins: [ Core.ModalEditorMixin ],
        methods: {
            copy(e) {
                console.log($(e.target).closest('.input-group'))
                $('input', $(e.target).closest('.input-group')).select()
                document.execCommand('copy')
            }
        }
    })

})(jQuery, Vue, Core);
