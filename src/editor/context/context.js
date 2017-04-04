(function($, Vue, Core) {

    Vue.component('context-dialog', {
        template: '#context-dialog',
        mixins: [ Core.ModalDialog ],
        props: {
            context: Object,
        },
        data() {
            return {
                children: this.children
            }
        },
        created() {



            this.children = [
                {
                    name: '$page',
                    children: [
                        {
                            name: 'storage',
                            children: [
                                {
                                    name: 'gallery',
                                    children: [
                                        { name: 'background', children: [{ name: 'value' }] },
                                        { name: 'color', children: [{ name: 'value' }] },
                                        { name: 'items', children: [{ name: 'value' }] },
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    name: '$store',
                    children: [
                        {
                            name: 'commit',
                            type: 'method',
                        },
                        {
                            name: 'dispatch',
                            type: 'method',
                        },
                    ]
                },
                {
                    name: '$context',
                    // children: this.context.$context.map[
                    //     { name: 'Child 1' },
                    //     { name: 'Child 2' },
                    //     { name: 'Child 3' },
                    //     { name: 'Child 4' },
                    //     { name: 'Child 5' },
                    //     { name: 'Child 6' },
                    //     { name: 'Child 7' },
                    //     { name: 'Child 8' },
                    // ]
                },
            ]
        },
    });

    Vue.component('context-item', {
        template: '#context-item',
        props: {
            parent: String,
            item: Object,
            level: Number,
        },
        data() {
            return {
                open: false,
                path: null
            }
        },
        created() {
            this.open = this.level < 3
            this.path = this.parent != null
                ? `${this.parent}.${this.item.name}`
                : this.item.name
        },
    });

})(jQuery, Vue, Core);
