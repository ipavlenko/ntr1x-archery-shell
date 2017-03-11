(function($, Vue) {

    Vue.component('settings', {
        template: '#settings',
        props: {
            model: Object,
        },
        data() {
            return {
                frame: null,
                items: null
            }
        },
        created() {

            for (let p of this.$store.getters.content.pages) {
                if (p.name == this.model.setup.page) {
                    this.frame = p
                    break
                }
            }

            let items = []

            let mo = {}
            for (let storage of this.frame.storages) {

                let so = mo[storage.name] = {}
                for (let variable of storage.variables) {

                    let original = _.get(this.model.overrides, `${storage.name}.${variable.name}`, null)

                    let vo = so[variable.name] = {
                        value: variable.value
                    }

                    let override = Object.assign(vo, original)

                    items.push({
                        storage,
                        variable,
                        override
                    })
                }
            }

            Object.assign(this.model.overrides, mo)
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
