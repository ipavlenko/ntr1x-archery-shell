(function($, Vue, Core, Shell) {

    var LoaderMixin = Shell.LoaderMixin =
    Vue.component('shell-loader', {
        template: '#shell-loader',
        data: function() {
            return {
                model: this.model,
            }
        },
    });

    Shell.LoaderPrivate =
    Vue.component('shell-loader-private', {
        mixins: [ LoaderMixin ],
        template: '#shell-loader-private',
        created: function() {

            this.model = null;

            Vue.service('portals').get({ id: this.$root.portal.id }).then(
                (d) => {
                    this.model = {
                        portal: d.data.portal,
                        pages: d.data.pages,
                    }
                },
                (e) => {
                    console.log(e);
                }
            );
        }
    });

    Shell.LoaderPublic =
    Vue.component('shell-loader-public', {
        mixins: [ LoaderMixin ],
        template: '#shell-loader-public',
        created: function() {
            this.model = {
                portal: this.$root.portal,
                pages: this.$root.pages,
            };
        }
    });

    Shell.LoaderFrame =
    Vue.component('shell-loader-frame', {
        mixins: [ LoaderMixin ],
        template: '#shell-loader-frame',
        created: function() {
            this.model = {
                portal: this.$root.portal,
                pages: this.$root.pages,
            }
        }
    });

})(jQuery, Vue, Core, Shell);
