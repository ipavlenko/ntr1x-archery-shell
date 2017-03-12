(function($, Vue, pluralize) {

    Vue.component('shell-bottom', {
        template: '#shell-bottom',
        data() {
            return {
                counts: this.counts
            }
        },
        created() {

            this.counts = {
                errors: 0,
                warnings: 0,
            }

            this.$watch('$store.state.designer.log', () => {

                Object.assign(this.counts, {
                    errors: 0,
                    warnings: 0,
                })

                for (let m of this.$store.state.designer.log.messages) {
                    if (m.type == 'error' || m.type == 'danger') {
                        this.counts.errors += 1
                    }
                    if (m.type == 'warning') {
                        this.counts.warnings += 1
                    }
                }

                this.$nextTick(() => {

                    if (this.$refs.scrollable) {
                        let s = $(this.$refs.scrollable)
                        s.scrollTop(s.prop('scrollHeight'))
                    }
                })

            }, { deep: true, immediate: true })
        },
        methods: {
            pluralize(word, value) {
                return pluralize(word, value, true);
            }
        }
    });

})(jQuery, Vue, pluralize);
