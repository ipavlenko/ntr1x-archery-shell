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
                this.images = [
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                    { url: 'http://placehold.it/120x60' },
                ]
            },

            createCollection() {

                let collection = {
                    name: '',
                    title: '',
                    items: [
                        { name: 'thumb', format: 'png', type: 'COVER', width: 120, height: 60 },
                        { name: 'image', format: 'jpg', type: 'LIMIT', width: 1920, height: 1024 },
                    ]
                }

                this.$store.commit('modals/editor/show', {
                    name: 'images-set-dialog',
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

            updateCollection(collection) {

                this.$store.commit('modals/editor/show', {
                    name: 'images-set-dialog',
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

            removeCollection(collection) {

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

            reset() {
                this.$destroy()
                this.$store.commit('modals/dialog/close')
            }
        },
    });

    Vue.component('images-set-dialog', {
        template: '#images-set-dialog',
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

})(jQuery, Vue, Core);
