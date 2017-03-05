(function(Vue, $, Core, Shell) {

    Shell.Sources = Shell.Sources || {};

    // var SourcesListViewer =
    // Vue.component('pages-sources-list', {
    //     template: '#pages-sources-list',
    //     mixins: [Core.ListViewerMixin],
    // });

    var SourcesModalEditor = Shell.Sources.ModalEditor =
    Vue.component('pages-sources-dialog', {
        template: '#pages-sources-dialog',
        mixins: [Core.ModalEditorMixin],
        methods: {
            check: function() {
                console.log('check');
            },
            setup: function() {
                console.log('setup');
            }
        }
    });

    // Vue.component('pages-sources', {
    //     mixins: [Core.EditorMixin('pages-sources-dialog')],
    //     template: '#pages-sources',
    // });

    Vue.component('pages-sources-params-list', {
        template: '#pages-sources-params-list',
        mixins: [Core.ListViewerMixin],
    });

    Vue.component('pages-sources-params-dialog', {
        template: '#pages-sources-params-dialog',
        mixins: [Core.ModalEditorMixin],
    });

    Vue.component('pages-sources-params', {
        mixins: [Core.EditorMixin('pages-sources-params-dialog')],
        template: '#pages-sources-params',
    });

})(Vue, jQuery, Core, Shell);
