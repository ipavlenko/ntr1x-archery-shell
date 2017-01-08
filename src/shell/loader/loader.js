(function($, Vue, Core, Shell) {

    let LoaderMixin = Shell.LoaderMixin =
    Vue.component('shell-loader', {
        template: '#shell-loader',
    });

    Shell.LoaderPrivate =
    Vue.component('shell-loader-private', {
        mixins: [ LoaderMixin ],
        template: '#shell-loader-private',
    });

    Shell.LoaderPublic =
    Vue.component('shell-loader-public', {
        mixins: [ LoaderMixin ],
        template: '#shell-loader-public',
        created: function() {
            this.model = {
                portal: this.$root.context.portal,
                pages: this.$root.context.content.pages,
            }
        }
    });

    Shell.LoaderFrame =
    Vue.component('shell-loader-frame', {
        mixins: [ LoaderMixin ],
        template: '#shell-loader-frame',
        created: function() {
            this.model = {
                portal: this.$root.context.portal,
                pages: this.$root.context.content.pages,
            }
        }
    });

})(jQuery, Vue, Core, Shell);
