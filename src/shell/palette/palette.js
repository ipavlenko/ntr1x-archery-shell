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
        // attached: function() {
        //
        //     // var adjustment;
        //     // var dragged;
        //     // var oldContainer;
        //
        //     $(this.$el).sortable({
        //         group: 'widgets',
        //         clone: true,
        //         containerSelector: '.wg-sortable-container',
        //         itemSelector: '.wg-sortable-item',
        //         drop: false,
        //         // containerPath: '.wg.wg-item-content > .wg.wg-inner > .ge.ge-decorator > .ge.ge-widget > .ge.ge-content > .wg.wg-sortable > .wg.wg-sortable-content > .wg.wg-sortable-inner',
        //         // itemPath: '',
        //         // verticalClass: "wg-sortable-vertical",
        //         // horisontalClass: "wg-sortable-horisontal",
        //         // placeholder: `
        //         //     <div class="wg wg-sortable-placeholder">
        //         //         <div class="wg wg-placeholder-container">
        //         //             <div class="wg wg-placeholder-inner"></div>
        //         //         </div>
        //         //     </div>
        //         // `,
        //         // afterMove: function (placeholder, container) {
        //         //
        //         //     if(oldContainer != container) {
        //         //
        //         //         if(oldContainer) {
        //         //             oldContainer.el.removeClass("active");
        //         //         }
        //         //         container.el.addClass("active");
        //         //
        //         //         oldContainer = container;
        //         //     }
        //         // },
        //         // onDragStart: function ($item, container, _super) {
        //         //
        //         //     // $(container.el).parents('.wg-sortable-container').sortable('disable');
        //         //
        //         //     // console.log($item, $item.find('.wg-sortable-container').length);
        //         //     // $item.find('.wg-sortable-container').sortable('disable');
        //         //
        //         //     // console.log($('.wg-sortable-container', container.el));
        //         //
        //         //     // console.log('disable', $('.wg-sortable-container', container.el).length);
        //         //     // $('.wg-sortable-container', container.el).sortable('disable');
        //         //
        //         //     var w = $item.data('widget');
        //         //     if (!w) {
        //         //
        //         //         var stack = $(container.el).closest('.ge.ge-widget').get(0).__vue__;
        //         //
        //         //         dragged = {
        //         //             stack: stack,
        //         //             index: stack.find(stack.items, $item.index()),
        //         //             vue: $item.find('.ge.ge-widget:first').get(0).__vue__,
        //         //         };
        //         //     }
        //         //
        //         //     if(!container.options.drop) {
        //         //         $item.clone().insertAfter($item);
        //         //     }
        //         //
        //         //     var offset = $item.offset();
        //         //     var pointer = container.rootGroup.pointer;
        //         //
        //         //     adjustment = {
        //         //         left: pointer.left - offset.left,
        //         //         top: pointer.top - offset.top,
        //         //     };
        //         //
        //         //     _super($item, container);
        //         // },
        //         // onDrop: function ($item, container, _super, event) {
        //         //
        //         //     // $item.find('.wg-sortable-container').sortable('enable');
        //         //     // console.log($item);
        //         //
        //         //     // $('.wg-sortable-container', container.el).sortable('enable');
        //         //
        //         //     var stack = $(container.el).closest('.ge.ge-widget').get(0).__vue__;
        //         //
        //         //     var w = $item.data('widget');
        //         //
        //         //     if (w) {
        //         //
        //         //         var ni = stack.find(stack.items, $item.index());
        //         //         stack.items.splice(ni, 0, Vue.service('palette').item(w));
        //         //         $item.remove();
        //         //
        //         //     } else {
        //         //
        //         //         if (dragged) {
        //         //
        //         //             var ni = stack.find(stack.items, $item.index());
        //         //             var newItem = JSON.parse(JSON.stringify(dragged.vue.model));
        //         //             newItem._action = 'create';
        //         //             if ('resource' in newItem) {
        //         //                 delete newItem.resource.id;
        //         //             }
        //         //             delete newItem.id;
        //         //
        //         //             dragged.stack.items.splice(dragged.index, 1);
        //         //             stack.items.splice(ni, 0, newItem);
        //         //
        //         //             $item.removeClass(container.group.options.draggedClass).removeAttr("style");
        //         //         }
        //         //     }
        //         //
        //         //     dragged = null;
        //         //
        //         //     $("body").removeClass(container.group.options.bodyClass);
        //         // },
        //         // onDrag: function ($item, position) {
        //         //     $item.css({
        //         //         left: position.left - adjustment.left,
        //         //         top: position.top - adjustment.top,
        //         //     });
        //         // },
        //     });
        // }
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
        attached: function() {

            this.sortable = $(this.$el).sortable({
                group: 'widgets',
                containerSelector: '.wg-sortable-container',
                itemSelector: '.wg-sortable-item',
                drop: false,
            });
        },
        methods: {
            trigger: function(event, item, context) {
                this.$dispatch(event, { item: item, context: context });
            },
        },
    });

})(jQuery, Vue, Core, Shell);
