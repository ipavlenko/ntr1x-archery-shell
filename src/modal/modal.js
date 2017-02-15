(function(Vue, $) {

    Vue.component('shell-modal', {
        template: '#shell-modal',
        props: {
            page: Object,
            context: Object,
            events: Object,
        },
        created: function() {
            this.$context = this.context
        },
        mounted: function() {

            $(this.$el).modal('show');
            $(this.$el).on('hide.bs.modal', (e) => {
                e.stopPropagation();
                this.$destroy();
            });
        },

        destroyed: function() {
            this.$nextTick(() => {
                $(this.$el).modal('hide');
            })
        },
    });

    Vue.component('shell-modal-stack', {
        template: '#shell-modal-stack',
    });

})(Vue, jQuery);
