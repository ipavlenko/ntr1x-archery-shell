(function($, Vue, Core, Shell) {

    Shell.Pages = Shell.Pages || {};

    var PagesModalEditor = Shell.Pages.ModalEditor =
    Vue.component('shell-pages-dialog', {
        template: '#shell-pages-dialog',
        mixins: [ Core.ModalEditorMixin, Core.TabsMixin('main') ],
        created: function() {

            var items = [];

            for (var i = 0; i < this.context.widget.props.length; i++) {

                var prop = this.context.widget.props[i];
                var param = this.current.root.params[prop.name];

                var item = {
                    prop: prop,
                    param: param,
                };

                items.push(item);
            }

            this.items = items;
        },
        data: function() {
            return {
                context: this.context,
                items: this.items,
            };
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
        },
    });

})(jQuery, Vue, Core, Shell);
