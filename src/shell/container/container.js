(function(Vue) {

    Vue.component('shell-container', {
        template: '#shell-container',
        props: {
            page: Object,
            viewport: Object,
        },
        data() {
            return {
                settings: null
            }
        },
        created() {

            this.$watch('viewport', (v) => {

                this.settings = {
                    width: v != null ? ((v.landscape ? v.height : v.width) + 10) + 'px' : null,
                    height: v != null ? ((v.landscape ? v.width : v.height) + 10) + 'px' : null,
                    fixed: v != null,
                }
            }, { immediate: true, deep: true })
        }
    });

})(Vue);
