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
            this.collections = [
                { title: 'Free Images', system: true },
                { title: 'Backgrounds', system: false },
                { title: 'Icons', system: false },
            ]

            this.activate(this.collections[0]);
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
                    settings: {
                        items: [
                            { name: 'thumbnail', format: 'png', type: 'COVER', width: 120, height: 60 },
                            { name: 'original', format: 'jpg', type: 'SCALE', width: -1, height: -1 },
                        ]
                    },
                }

                this.$store.commit('modals/editor/show', {
                    name: 'images-set-dialog',
                    context: { type: 'create' },
                    original: collection,
                    events: {
                        submit: (current) => { this.$store.commit('designer/images/create', current) },
                    }
                })
            },

            reset() {
                this.$store.commit('modals/dialog/close')
            }
        },
    });

    Vue.component('images-set-dialog', {
        template: '#images-set-dialog',
        mixins: [ Core.ModalEditorMixin ],
    });

})(jQuery, Vue, Core);
