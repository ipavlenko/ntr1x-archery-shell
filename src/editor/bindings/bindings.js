(function(Vue, $, Core) {

    Vue.component('bindings-dialog', {
        template: '#bindings-dialog',
        mixins: [ Core.ModalEditorMixin ],
        created: function() {

            this.current = this.current || {
                strategy: 'interpolate',
                expression: null,
            }
        },
        methods: {
            setStrategy: function(strategy) {
                this.current.strategy = strategy;
                this.$forceUpdate();
            },
            getStrategy: function() {
                return this.current.strategy;
            },
        },
    });

    Vue.component('bindings', {
        mixins: [Core.ActionMixin('bindings-dialog')],
    });

})(Vue, jQuery, Core);
