(function(Vue, $, Core, Shell) {

    var PageSpec =
    Vue.component('pages-sources-setup-dialog-page-spec', {
        template: '#pages-sources-setup-dialog-page-spec',
        props: {
            selection: Object,
        },
        data: function() {
            return {
                url: this.url,
                type: this.type,
                error: this.error,
                loading: this.loading,
                spec: this.spec,
            }
        },
        created: function() {
            this.url = '';
            this.type = 'swagger_2.0';
            this.error = null;
            this.loading = false;
            this.spec = null;
        },
        methods: {
            load: function() {
                this.loading = true;
                $.ajax({
                    url: this.url,
                    method: 'GET',
                    dataType: "json",
                    contentType: "application/json",
                })
                .done((d, a, b, c) => {
                    this.loading = false;
                    this.error = null;
                    this.spec = d;
                    this.submit();
                })
                .fail((e, m, d) => {
                    this.loading = false;
                    this.error = `[${m}] ${d}`;
                    this.spec = null;
                })
            },
            submit: function() {
                if (this.spec) {
                    this.$dispatch('next', { page: 'spec', spec: this.spec, url: this.url });
                }
            },
            reset: function() {
                this.$dispatch('reset');
            },
        }
    });

    var PageMethod =
    Vue.component('pages-sources-setup-dialog-page-method', {
        template: '#pages-sources-setup-dialog-page-method',
        props: {
            selection: Object,
        },
        data: function() {
            return {
                tags: this.tags,
                active: this.active,
            }
        },
        created: function() {

            let tags = [];
            let tagsMap = {};

            if (this.selection.spec.tags) {

                for (const tag of this.selection.spec.tags) {

                    let t = {
                        ...tag,
                        methods: []
                    }

                    tags.push(t);
                    tagsMap[t.name] = t;
                }
            }

            let noname = {
                methods: []
            }

            tags.push(noname);

            if (this.selection.spec.paths) {

                for (const path in this.selection.spec.paths) {

                    let onPath = this.selection.spec.paths[path]
                    for (const method in onPath) {

                        let operation = onPath[method];

                        let used = false;

                        if (operation.tags) {

                            for (const t of operation.tags) {

                                let tag = tagsMap[t];
                                if (tag) {

                                    tag.methods.push({
                                        method,
                                        path,
                                        operation,
                                    });

                                    used = true;
                                }
                            }
                        }

                        if (!used) {
                            noname.methods.push({
                                method,
                                path,
                                operation,
                            });
                        }
                    }
                }
            }

            this.tags = tags;
            this.active = this.tags ? this.tags[0] : null;
        },
        methods: {
            submit: function(method) {
                this.selection.method = method;
                this.$dispatch('submit');
            },
            reset: function() {
                this.$dispatch('reset');
            },
            prev: function() {
                this.$dispatch('prev', { page: 'method' });
            },
        }
    });

    var SetupModalEditor =
    Vue.component('pages-sources-setup-dialog', {
        template: '#pages-sources-setup-dialog',
        mixins: [Core.ModalEditorMixin],
        data: function() {
            return {
                page: this.page,
                selection: this.selection,
            };
        },
        created: function() {

            this.page = 'spec';
            this.selection = {
                spec: null,
                method: null,
            }
        },
        components: {
            'page-spec': PageSpec,
            'page-method': PageMethod,
        },
        events: {
            submit: function() {
                this.current = {
                    method: (this.selection.method.method || '').toUpperCase(),
                    name: this.selection.method.operation.operationId,
                    url: `${this.selection.url}${this.selection.method.path}`,
                    params: this.selection.method.operation.parameters.map(p => ({
                        _action: 'create',
                        in: p.in,
                        name: p.name,
                        required: p.required,
                        specified: true,
                    }))
                };
                this.submit();
            },
            reset: function() {
                this.reset();
            },
            next: function({ page, spec, url }) {
                switch (page) {
                    case 'spec':
                        this.selection.spec = spec;
                        this.selection.url = (function() {

                            let u = new URI(url);

                            let protocol = ('schemes' in spec && spec.schemes.length) ? spec.schemes[0] : u.protocol();
                            let host = ('host' in spec) ? spec.host : u.host();
                            let basePath = ('basePath' in spec) ? spec.basePath : u.directory();

                            basePath = basePath == '/' ? '' : basePath;

                            return `${protocol}://${host}${basePath}`;
                        })();
                        this.page = 'method';
                        break;
                }
                this.$nextTick(() => {
                    $(window).trigger('resize');
                })
            },
            prev: function({ page }) {
                switch (page) {
                    case 'method':
                        this.selection.spec = null;
                        this.page = 'spec';
                        break;
                }
                this.$nextTick(() => {
                    $(window).trigger('resize');
                })
            }
        }
    });

    var SourcesSetupEditor =
    Vue.component('pages-sources-setup', {
        mixins: [Core.ActionMixin(SetupModalEditor)],
    });

})(Vue, jQuery, Core, Shell);
