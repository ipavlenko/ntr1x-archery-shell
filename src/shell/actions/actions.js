(function(Vue) {

    Vue.component('shell-actions', {
        template: '#shell-actions',
        computed: {
            viewports() {
                return [
                    [
                        { title: 'iPhone 6,7 Plus', width: 414, height: 736, landscape: false },
                        { title: 'iPhone 6,7', width: 375, height: 667, landscape: false },
                        { title: 'iPhone 5', width: 320, height: 568, landscape: false },
                    ],
                    [
                        { title: 'iPad Pro',  width: 1024, height: 1366, landscape: false },
                        { title: 'iPad 1,2,3,4', width: 768, height: 1024, landscape: false },
                    ],
                ]
            }
        },
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
