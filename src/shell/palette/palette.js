(function($, Vue, Core, Shell) {

    var PaletteItem =
    Vue.component('shell-palette-item', {
        template: '#shell-palette-item',
        props: {
            category: Object,
            group: Object,
            item: Object,
        },
    });

    Vue.component('shell-palette', {
        template: '#shell-palette',
        props: {
            category: Object,
        },
        components: {
            'palette-item': PaletteItem
        },
        mounted: function() {

            this.sortable = $(this.$el).sortable({
                group: 'widgets',
                containerSelector: '.wg-sortable-container',
                itemSelector: '.wg-sortable-item',
                drop: false,
            });
        },
    });

})(jQuery, Vue, Core, Shell);
