(function(Vue, $, Core, Shell) {

    let defaults = {
        'multiple': [],
        'object': {},
    };

    Shell.Widgets.ModalEditor =
    Vue.component('shell-widgets-dialog', {
        template: '#shell-widgets-dialog',
        mixins: [Core.ModalEditorMixin, Core.TabsMixin('data')],
        data() {
            return {
                items: null,
                isContainer: false,
                isFrame: false,
            }
        },
        created() {

            this.isContainer = this.current.name == 'default-container/default-container-layers/default-layers-stack'
            this.isFrame = this.current.name == 'default-container/default-container-embedded/default-frame'

            let cp = this.current.params

            this.items = this.context.widget.props.map(prop => ({
                prop,
                owner: cp,
                param: cp[prop.name] = cp[prop.name] || { value: defaults[prop.type] || null }
            }))
        },
        computed: {
            options() {
                switch (this.current.name) {
                case 'default-container/default-container-layers/default-layers-stack':
                    return [
                        {
                            name: 'default-container/default-container-layers/layers-item',
                            title: 'Layer'
                        }
                    ]
                default:
                    return []
                }
            }
        },
        methods: {

            hasProps(tab) {
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
