(function($, Vue, Core, Shell) {

    Shell.Pages.ModalEditor =
    Vue.component('pages-dialog', {
        template: '#pages-dialog',
        mixins: [ Core.ModalEditorMixin, Core.TabsMixin('main') ],
        computed: {
            items: function() {
                return this.context.widget.props.map(prop => ({
                    prop,
                    param: this.current.root.params[prop.name]
                }))
            }
        },
        methods: {

            hasProps: function(tab) {
                if (this.context.widget && this.context.widget.props) {
                    for (let prop of this.context.widget.props) {
                        if (prop.tab == tab) return true;
                    }
                }
                return false;
            }
        },
    });

})(jQuery, Vue, Core, Shell);
