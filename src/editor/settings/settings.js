(function($, Vue) {

    Vue.component('settings', {
        template: '#settings',
        props: {
            widget: Object,
        },
        data() {
            return {
                frame: null,
                items: null
            }
        },
        created() {

            for (let p of this.$store.getters.content.pages) {
                if (p.name == this.widget.setup.page) {
                    this.frame = p
                    break
                }
            }

            let items = []
            for (let storage of this.frame.storages) {
                for (let variable of storage.variables) {

                    let override = JSON.parse(JSON.stringify(variable))
                    override.uuid = Core.UUID.random()

                    items.push({
                        storage,
                        variable,
                        override
                    })
                }
            }

            this.items = items
        }
    });

    Vue.component('settings-string', {
        template: '#settings-string',
        props: {
            item: Object,
        }
    });

})(jQuery, Vue);
