(function($, Vue, Core, Shell) {

    var LoaderMixin = Shell.LoaderMixin =
    Vue.component('shell-loader', {
        template: '#shell-loader',
        data: function() {
            return {
                model: this.model,
            }
        },
        created: function() {

            this.model = null;

            Vue.service('portals').get({ id: this.$root.portal.id }).then(
                (d) => {
                    this.$set('model', {
                        portal: d.data.portal,
                        pages: d.data.pages,
                    });
                },
                (e) => {
                    console.log(e);
                }
            );
        }
    });

    Shell.LoaderPrivate =
    Vue.component('shell-loader-private', {
        mixins: [ LoaderMixin ],
        template: '#shell-loader-private'
    });

    Shell.LoaderPublic =
    Vue.component('shell-loader-public', {
        mixins: [ LoaderMixin ],
        template: '#shell-loader-public'
    });

})(jQuery, Vue, Core, Shell);
