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
            }
        }
    });

})(Vue);
