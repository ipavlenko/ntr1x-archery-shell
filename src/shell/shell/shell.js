(function($, Vue, Core, Shell) {

    Shell.Shell = {};

    Shell.ShellPublic =
    Vue.component('shell-public', {
        mixins: [ Shell.Shell ],
        template: '#shell-public',
        computed: {
            page: function() {
                return this.$route.meta.page
            }
        }
    });

    Shell.ShellPrivate =
    Vue.component('shell-private', {
        mixins: [ Shell.Shell ],
        template: '#shell-private',
        computed: {
            page: function() {
                return this.$store.state.designer.page
            }
        }
    });

})(jQuery, Vue, Core, Shell);
