(function(Vue, $, Core, Shell) {

    let defaults = {
        'multiple': [],
        'object': {},
    };

    Shell.Widgets.ModalEditor =
    Vue.component('shell-widgets-dialog', {
        template: '#shell-widgets-dialog',
        mixins: [Core.ModalEditorMixin, Core.TabsMixin('data')],
        computed: {
            items: function() {
                return this.context.widget.props.map(prop => ({
                    prop,
                    owner: this.current.params,
                    param: this.current.params[prop.name] || { value: defaults[prop.type] || null }
                }))
            }
        },
        methods: {

            hasProps: function(tab) {
                if (this.context.widget && this.context.widget.props) {
                    for (var i = 0; i < this.context.widget.props.length; i++) {
                        var prop = this.context.widget.props[i];
                        if (prop.tab == tab) return true;
                    }
                }
                return false;
            }
        }
    });

})(Vue, jQuery, Core, Shell);
