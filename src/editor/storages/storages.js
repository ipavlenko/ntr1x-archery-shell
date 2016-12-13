(function(Vue, $, Core, Shell) {

    Shell.Storages = Shell.Storages || {};

    var StoragesListViewer =
    Vue.component('storages-list', {
        template: '#storages-list',
        mixins: [Core.ListViewerMixin],
    });

    Shell.Storages.ModalEditor =
    Vue.component('storages-dialog', {
        template: '#storages-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var StoragesEditor =
    Vue.component('storages', {
        mixins: [Core.EditorMixin('storages-dialog')],
        template: '#storages',
    });

    var StoragesVariablesListViewer =
    Vue.component('storages-variables-list', {
        template: '#storages-variables-list',
        mixins: [Core.ListViewerMixin],
    });

    var StoragesVariablesModalEditor =
    Vue.component('storages-variables-dialog', {
        template: '#storages-variables-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    var StoragesVariablesEditor =
    Vue.component('storages-variables', {
        mixins: [Core.EditorMixin('storages-variables-dialog')],
        template: '#storages-variables',
    });

})(Vue, jQuery, Core, Shell);
