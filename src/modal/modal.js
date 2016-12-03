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
                this.$parent.close();
            });
        },
    });

    Vue.component('shell-modal-stack', {
        template: '#shell-modal-stack',
        created: function() {

            Vue.service('modals', {

                show: (page, config) => {

                    this.$store.commit('showModal', {
                        page: Vue.service('shell').page(page)
                    })
                }
            });
        },
        methods: {
            close: function() {
                this.$store.commit('closeModal')
            }
        }
    });

})(Vue, jQuery);
