(function($, Vue) {

    Vue.component('shell-tree', {
        template: '#shell-tree',
    });

    Vue.component('shell-tree-item', {
        template: '#shell-tree-item',
        props: {
            widget: Object
        },
        data: function() {
            return {
                open: this.open
            }
        },
        created() {
            this.open = false
        }
    });


})(jQuery, Vue);
