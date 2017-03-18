(function($, Vue, Core) {

    Vue.component('context-dialog', {
        template: '#context-dialog',
        mixins: [ Core.ModalDialog ],
        // data() {
        //     return {
        //         active: this.active,
        //         portals: this.portals,
        //     }
        // },
        created() {
        },
    });

    Vue.component('context-item', {
        template: '#context-item',
        mixins: [ Core.ModalDialog ],
        // data() {
        //     return {
        //         active: this.active,
        //         portals: this.portals,
        //     }
        // },
        created() {
        },
    });

})(jQuery, Vue, Core);
