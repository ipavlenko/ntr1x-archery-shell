(function($, Vue, Core, Shell) {

    Shell.Loader =
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

})(jQuery, Vue, Core, Shell);
