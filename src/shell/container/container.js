(function($, Vue, Core, Shell) {

    Vue.component('shell-container', {
        template: '#shell-container',
        props: {
            globals: Object,
            page: Object,
        },
    });

})(jQuery, Vue, Core, Shell);
