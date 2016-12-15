(function($, Vue, Core, Shell) {

    Shell.Widget =
    Vue.component('shell-widget', {
        template: '#shell-widget',
        props: {
            page: Object,
            stack: Object,
            model: Object,
            editable: Boolean,
        },
        beforeCreate: function() {
            this.decorators = {
                alternatives: {
                    'default-stack-horizontal': 'shell-decorator-horizontal',
                    'default-stack-vertical': 'shell-decorator-vertical',
                    'default-stub': 'shell-decorator-stub',
                },
                fallback: 'shell-decorator-widget',
            };
        },
        created: function() {
            this.widget = this.$store.getters.palette.widget(this.model.name);
            this.decorator = this.decorators.alternatives[this.widget.tag] || this.decorators.fallback;
        },
        updated: function() {
            this.widget = this.$store.getters.palette.widget(this.model.name);
            this.decorator = this.decorators.alternatives[this.widget.tag] || this.decorators.fallback;
        },
        data: function() {

            return {
                widget: this.widget,
                decorator: this.decorator,
            };
        },
    });

})(jQuery, Vue, Core, Shell);
