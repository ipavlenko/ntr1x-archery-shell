(function($, Vue, Core) {

    Vue.component('factory-dialog', {
        template: '#factory-dialog',
        mixins: [ Core.ModalEditorMixin ],
        created() {
            console.log(this.context)
        }
    });

})(jQuery, Vue, Core);
