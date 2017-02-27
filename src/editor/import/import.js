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
                            console.log(d.data)
                            // this.portals = d.data
                            // this.activate(this.portals.length ? this.portals[0] : null)
                        })
                        .catch((e) => {
                            console.log(e)
                            // this.portals = []
                            // this.activate(null)
                        })
                }
            },

            reset() {
                this.$destroy()
                this.$store.commit('modals/dialog/close')
            },
        }
    });

})(jQuery, Vue, Core);
