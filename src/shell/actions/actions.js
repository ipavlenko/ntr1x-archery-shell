(function(Vue) {

    Vue.component('shell-actions', {
        template: '#shell-actions',
        methods: {
            showImages() {
                this.$store.commit('modals/dialog/show', {
                    name: 'images-dialog',
                })
            },
            showFiles() {
                this.$store.commit('modals/dialog/show', {
                    name: 'files-dialog',
                })
            },
            importPage() {
                this.$store.commit('modals/dialog/show', {
                    name: 'import-dialog',
                })
            },
            clonePage() {

                let page = JSON.parse(JSON.stringify(this.$store.state.designer.page))
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
            }
        }
    });

})(Vue);
