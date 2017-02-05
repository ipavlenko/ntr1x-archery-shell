(function(Vue) {

    Vue.component('shell-actions', {
        template: '#shell-actions',
        methods: {
            showImages() {
                this.$store.commit('modals/dialog/show', {
                    name: 'images-dialog',
                })
            }
        }
    });

})(Vue);
