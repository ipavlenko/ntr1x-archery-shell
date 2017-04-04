(function($, Vue, Core, Shell) {

    let defaults = {
        'multiple': [],
        'object': {},
    };

    Shell.Pages.ModalEditor =
    Vue.component('pages-dialog', {
        template: '#pages-dialog',
        mixins: [ Core.ModalEditorMixin, Core.TabsMixin('main') ],
        data() {
            return {
                items: null,
            }
        },
        created() {

            let cp = this.current.root.params

            this.items = this.context.widget.props.map(prop => ({
                prop,
                owner: cp,
                param: cp[prop.name] = cp[prop.name] || { value: defaults[prop.type] || null }
            }))
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
