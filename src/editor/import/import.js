(function($, Vue, Core) {

    Vue.component('import-dialog', {
        template: '#import-dialog',
        mixins: [ Core.ModalDialog ],
        data() {
            return {
                active: this.active,
                portals: this.portals,
            }
        },
        created() {

            this.portals = []
            this.$store
                .dispatch('portals/shared')
                .then((d) => {
                    this.portals = d.data.content
                    this.activate(this.portals.length ? this.portals[0] : null)
                })
                .catch((e) => {
                    console.log(e)
                    this.portals = []
                    this.activate(null)
                })
        },
        methods: {

            activate(portal) {

                this.active = null
                if (portal != null) {

                    this.$store
                        .dispatch('portals/shared/id/pull', { id: portal.id })
                        .then((d) => {
                            this.active = d.data
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                }
            },

            submit(p) {

                let page = JSON.parse(JSON.stringify(p))
                let widget = this.$store.getters.palette.widget('default-container/default-container-stack/default-stack-canvas');

                if (page.uuid) {
                    delete page.uuid
                }

                this.$store.commit('modals/editor/show', {
                    name: 'pages-dialog',
                    context: { type: 'create', widget },
                    original: page,
                    events: {
                        submit: (current) => { this.$store.commit('designer/pages/create', current) },
                    }
                })
            },

            reset() {
                this.$destroy()
                this.$store.commit('modals/dialog/close')
            },
        }
    });

})(jQuery, Vue, Core);
