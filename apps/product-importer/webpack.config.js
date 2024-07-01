const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/product-importer'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      additionalEntryPoints: [
        {
          entryName: 'worker',
          entryPath: './apps/product-importer/src/worker.ts',
        },
      ],
      tsConfig: './tsconfig.app.json',
      assets: [
        './src/assets',
        {
          glob: '**/*.yaml',
          input: './src/config',
          output: 'config',
        },
      ],
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
