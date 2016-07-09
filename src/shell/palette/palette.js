(function($, Vue, Core, Shell) {

    var PaletteItem =
    Vue.component('shell-palette-item', {
        template: '#shell-palette-item',
        props: {
            category: Object,
            group: Object,
            item: Object,
            globals: Object,
        },
        ready: function() {

            var adjustment;

            $(this.$el).sortable({
                nested: false,
                group: 'widgets',
                containerSelector: '.ge.ge-palette-item',
                itemSelector: '[data-widget]',
                drop: false,
                onDragStart: function ($item, container, _super) {

                    var offset = $item.offset();
                    var pointer = container.rootGroup.pointer;

                    adjustment = {
                        left: pointer.left - offset.left,
                        top: pointer.top - offset.top,
                    };

                    _super($item, container);
                },
                onDrag: function ($item, position) {
                    $item.css({
                        left: position.left - adjustment.left,
                        top: position.top - adjustment.top,
                    });
                },
            });
            // Sortable.create(this.$el, {
            //     group: {
            //         name: 'widgets',
            //         pull: 'clone',
            //         put: false
            //     },
            //     animation: 150,
            //     sort: false,
            // });
        }
    });

    Vue.component('shell-palette', {
        template: '#shell-palette',
        props: {
            globals: Object,
            category: Object,
        },
        data: function() {
            return {
                categories: this.categories
            };
        },
        components: {
            'palette-item': PaletteItem
        },
        created: function() {
            this.categories = Widgets.Palette.categories();
        },
        methods: {
            trigger: function(event, item, context) {
                this.$dispatch(event, { item: item, context: context });
            },
        },
    });

})(jQuery, Vue, Core, Shell);
