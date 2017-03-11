(function($, Vue, Core) {

    Vue.component('factory-dialog', {
        template: '#factory-dialog',
        mixins: [ Core.ModalEditorMixin ],
    });

})(jQuery, Vue, Core);
