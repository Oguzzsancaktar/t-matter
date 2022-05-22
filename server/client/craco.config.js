const CracoAlias = require('craco-alias')
const path = require('path')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.path.json'
      }
    }
  ],
  webpack: {
    alias: {
      things: path.resolve(__dirname, './src/things/')
    },
    configure: {
      module: {
        rules: [
          {
            type: 'javascript/auto',
            test: /\.mjs$/,
            use: []
          }
        ]
      }
    }
  }
}
