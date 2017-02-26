(function($, Vue, Core) {

    Vue.component('files-dialog', {
        template: '#files-dialog',
        mixins: [ Core.ModalDialog ],
        data() {
            return {
                active: this.active,
                collections: this.collections,
                files: this.files,
            }
        },
        created: function() {

            this.collections = this.$store.state.designer.content.files

            this.activate(this.collections && this.collections.length
                ? this.collections[0]
                : null
            )
        },
        methods: {

            icon(filename) {

                let ext = filename == null ? null : filename.split('.').pop().toLowerCase()

                if (ext != null) {
                    switch (ext) {
                    case 'pdf':
                        return 'fa-file-pdf-o'
                    case 'txt':
                        return 'fa-file-txt-o'
                    case 'doc':
                    case 'docx':
                        return 'fa-file-word-o'
                    case 'xls':
                    case 'xlsx':
                        return 'fa-file-excel-o'
                    case 'ppt':
                    case 'pptx':
                        return 'fa-file-powerpoint-o'
                    case 'jpg':
                    case 'png':
                    case 'jpeg':
                    case 'bmp':
                    case 'gif':
                        return 'fa-file-image-o'
                    case 'avi':
                    case 'mp4':
                        return 'fa-file-video-o'
                    case 'zip':
                    case 'rar':
                        return 'fa-file-archive-o'
                    default:
                        return 'fa-file-o'
                    }
                }

                return 'fa-file-o'
            },

            activate(collection) {

                this.active = collection
                this.files = []
                if (this.active) {
                    this.$store
                        .dispatch('upload/file/list', { aspect: this.active.name })
                        .then(d => { this.files = d.data.content; })
                }
            },

            upload(e) {

                let file = e.target.files && e.target.files.length && e.target.files[0]

                this.$store
                    .dispatch('upload/file', {
                        file,
                        settings: {
                            aspects: [ this.active.name ],
                            items: this.active.items,
                        }
                    })
                    .then(
                        (d) => { this.files.unshift(d.data) }
                    )
            },

            create() {

                let collection = {
                    name: 'documents',
                    title: 'Documents'
                }

                this.$store.commit('modals/editor/show', {
                    name: 'files-collection-dialog',
                    context: { type: 'create' },
                    original: collection,
                    events: {
                        submit: (current) => {
                            this.$store.commit('designer/items/create', {
                                parent: this.$store.state.designer.content,
                                property: 'files',
                                item: current
                            })

                            this.activate(this.collections[this.collections.length - 1])
                        },
                    }
                })
            },

            update(collection) {

                this.$store.commit('modals/editor/show', {
                    name: 'files-collection-dialog',
                    context: { type: 'edit' },
                    original: collection,
                    events: {
                        submit: (current) => {
                            this.$store.commit('designer/items/update', {
                                parent: this.$store.state.designer.content,
                                property: 'files',
                                item: current
                            })
                        },
                    }
                })
            },

            remove(collection) {

                this.$store.commit('designer/items/remove', {
                    parent: this.$store.state.designer.content,
                    property: 'files',
                    item: collection
                })

                this.files = this.$store.state.designer.content.files

                this.activate(this.collections && this.collections.length
                    ? this.collections[0]
                    : null
                )
            },

            details(item) {

                this.$store.commit('modals/editor/show', {
                    name: 'files-details-dialog',
                    context: { type: 'edit', collection: this.active },
                    original: item,
                    events: {
                        remove: (current) => {
                            this.$store
                                .dispatch('upload/file/id/remove', { id: current.id })
                                .then(
                                    () => {
                                        this.$store.commit('designer/items/remove', {
                                            parent: this,
                                            property: 'files',
                                            item: current
                                        })
                                    }
                                )
                        },
                    }
                })
            },

            reset() {
                this.$destroy()
                this.$store.commit('modals/dialog/close')
            },
        }
    });

    Vue.component('files-collection-dialog', {
        template: '#files-collection-dialog',
        mixins: [ Core.ModalEditorMixin ],
    });

    Vue.component('files-details-dialog', {
        template: '#files-details-dialog',
        mixins: [ Core.ModalEditorMixin ],
        methods: {
            copy(e) {
                $('input', $(e.target).closest('.input-group')).select()
                document.execCommand('copy')
                this.$destroy()
            },
            remove() {
                this.events && this.events.remove && this.events.remove(this.current);
                this.$destroy()
            }
        }
    });

})(jQuery, Vue, Core);
