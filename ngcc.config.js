module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
        /assign-deep/,
        /slickgrid\//,
        /flatpickr/,
        /dequal/,
      ]
    },
    "ngx-highlightjs": {
      ignorableDeepImportMatchers: [/highlight.js\//],
    },
  },
};
