import webpack, { Stats } from 'webpack';

// const config = async () =>

(async () => {
  const { default: config } = await import('../config/webpack.dev.js');

  const compiler = webpack(config);

  compiler.run((err, stats: Stats) => {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(JSON.stringify(stats, null, 4));
    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
      })
    );
  });
})();
