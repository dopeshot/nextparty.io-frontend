/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// const browserify = require('@cypress/browserify-preprocessor')
module.exports = (on: Cypress.PluginEvents, config: Cypress.ConfigOptions) => {
  require('@cypress/code-coverage/task')(on, config)

  // MC: This is the attempt to add coverage without starting the application. Tests are not working at the cypress examples: https://github.com/cypress-io/code-coverage/blob/4cfcc9ad968e6ad628b1abb9e81a8c504833b65d/examples/unit-tests-ts/README.md
  // const options = browserify.defaultOptions
  // options.browserifyOptions.extensions.push('.ts')
  // options.typescript = require.resolve('typescript')
  // // transform[1][1] is "babelify"
  // // so we just add our code instrumentation plugin to the list
  // options.browserifyOptions.transform[1][1].plugins.push('babel-plugin-istanbul')

  // on('file:preprocessor', browserify(options))
  return config
}


export { }

