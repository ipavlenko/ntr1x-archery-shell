(function($, Vue, Core, Shell) {

    Shell.Shell = {};

    function relevant(current, collection) {

        if (!current || current._action == 'remove' || (collection && collection.indexOf(current) < 0)) {

            if (collection) {
                for (var i = 0; i < collection.length; i++) {
                    var c = collection[i];
                    if (c._action != 'remove') {
                        return c;
                    }
                }
            }

            return null;
        }

        if (current && current._action == 'remove') {
            return null;
        }

        return current;
    }

    Shell.ShellPublic =
    Vue.component('shell-public', {
        mixins: [ Shell.Shell ],
        template: '#shell-public',
        props: {
            page: Object
        },
    });

    Shell.ShellPrivate =
    Vue.component('shell-private', {
        template: '#shell-private',
        props: {
            // settings: Object,
            model: Object,
        },
        data: function() {
            return {
                globals: this.globals,
                leftOpen: this.left,
                rightOpen: this.right,
            };
        },
        created: function() {

            this.globals = {
                selection: {
                    category: null,
                    page: null,
                    source: null,
                    storage: null,
                },
                // settings: this.settings,
                model: this.model,
            };

            this.leftOpen = true;
            this.rightOpen = true;

            this.scale = 1;

            this.globals.selection.category = Vue.service('palette').categories()[0];

            this.$watch('model.pages', (pages) => {
                this.globals.selection.page = relevant(this.globals.selection.page, pages);
            }, {
                immediate: true,
            });

            this.$watch('globals.selection.page.sources', (sources) => {
                this.globals.selection.source = relevant(this.globals.selection.source, sources);
            }, {
                immediate: true,
            });

            this.$watch('globals.selection.page.storages', (storages) => {
                this.globals.selection.storage = relevant(this.globals.selection.storage, storages);
            }, {
                immediate: true,
            });

        },
        events: {
            zoomIn: function(data) {
                this.scale += 0.1;
                $('.ge.ge-page', this.$el).css('transform', 'scale(' + this.scale + ')');
                $('.ge.ge-container', this.$el).perfectScrollbar('update');
            },
            zoomOut: function(data) {
                this.scale -= 0.1;
                $('.ge.ge-page', this.$el).css('transform', 'scale(' + this.scale + ')');
                $('.ge.ge-container', this.$el).perfectScrollbar('update');
            },
            pull: function(data) {
                $.ajax({
                    url: `/ws/portals/${this.model.portal.id}`,
                    method: 'GET',
                    dataType: "json"
                })
                .done((d) => {

                    this.$set('model', {
                        portal: d.portal,
                        pages: d.pages,
                    });
                })
            },
            push: function(data) {
                $.ajax({
                    url: `/ws/portals/${this.model.portal.id}`,
                    method: 'PUT',
                    dataType: "json",
                    data: JSON.stringify(this.model),
                    contentType: "application/json",
                })
                .done((d) => {

                    this.$set('model', {
                        portal: d.portal,
                        pages: d.pages,
                    });
                })
            },
            selectCategory: function(data) {
                this.globals.selection.category = data.item;
            },
            selectDomain: function(data) {
                this.globals.selection.domain = data.item;
            },
            selectPage: function(data) {
                this.globals.selection.page = data.item;
            },
            selectSource: function(data) {
                this.globals.selection.source = data.item;
            },
            selectStorage: function(data) {
                this.globals.selection.storage = data.item;
            },
        }
    });

})(jQuery, Vue, Core, Shell);
