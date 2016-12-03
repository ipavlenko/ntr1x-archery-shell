(function(Vue, $) {

    let ModalComponent =
    Vue.component('shell-modal', {
        template: '#shell-modal',
        props: {
            page: Object,
        },
        mounted: function() {

            $(this.$el).modal('show');
            $(this.$el).on('hidden.bs.modal', (e) => {
                this.$dispatch('close');
            });
        },
    });

    Vue.component('shell-modal-stack', {
        template: '#shell-modal-stack',
        data: function() {
            return {
                modals: this.modals
            }
        },
        created: function() {

            this.modals = [];

            Vue.service('modals', {

                show: (page, config) => {

                    this.modals.push({
                        page: Vue.service('shell').page(page)
                    });
                }
            });
        },
        events: {
            close: function() {
                this.modals.pop();
            }
        }
    });

})(Vue, jQuery);
