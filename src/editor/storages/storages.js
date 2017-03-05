(function(Vue, $, Core, Shell) {

    Shell.Storages = Shell.Storages || {};

    Shell.Storages.ModalEditor =
    Vue.component('storages-dialog', {
        template: '#storages-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    Vue.component('storages-variables-list', {
        template: '#storages-variables-list',
        mixins: [Core.ListViewerMixin],
    });

    Vue.component('storages-variables-dialog', {
        template: '#storages-variables-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    Vue.component('storages-variables', {
        mixins: [Core.EditorMixin('storages-variables-dialog')],
        template: '#storages-variables',
    });

})(Vue, jQuery, Core, Shell);
