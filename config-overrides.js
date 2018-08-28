const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = (config, env) => {
  config.externals = {
    react: 'React',
    moment: 'moment',
    antd: 'antd',
    echarts: 'echarts',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  };

  if (env === 'production') {
    const index = config.plugins.findIndex(plugin => plugin instanceof SWPrecacheWebpackPlugin);
    const {options} = config.plugins[index];
    options.navigateFallbackWhitelist = [/^(?!\/__).*/];
    options.runtimeCaching = [
      {
        handler: 'cacheFirst',
        urlPattern: /cdn|thirdqq\.qlogo\.cn|githubusercontent/
      }
    ];
    config.plugins.splice(index, 1, new SWPrecacheWebpackPlugin(options));
  }

  return config;
};
