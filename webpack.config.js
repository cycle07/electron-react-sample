/*
 ** pro和dev都有的，没有超过400行能不拆分就不拆分 
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 公共的配置
class Wp {
  constructor() {
    // entry: './web/src/index.js',
    this.entry = {
      app: './web/src/index.js'
      // print: './web/src/print.js'
    };
    this.devtool = 'eval-source-map'; // 编译后查询报错位置
    this.plugins = [
      // new CleanWebpackPlugin(['dist']), // 编译前删除文件
      new HtmlWebpackPlugin({
        title: 'Output Management',
        inject: false,
        template: require('html-webpack-template'),
        scripts: ['../../renderer/renderer.js'],
        headHtmlSnippet:
          "<script>require('electron-connect').client.create()</script>"
      })
    ];
    this.output = {
      filename: '[name].main.js',
      path: path.resolve(__dirname + '/web', 'dist')
      // publicPath: '/' // 中间键请求头使用到这个
    };
    this.module = {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }
        // {
        //   test: /\.(woff|woff2|eot|ttf|otf)$/,
        //   use: [
        //     'file-loader'
        //   ]
        // }
      ]
    };
    this.watch = true; // 开启瞧峰模式[真正监听全局的是这里...]
    this.watchOptions = {
      aggregateTimeout: 300, // 300毫秒内只让最后一次改动触发编译
      poll: 1000, // 每一秒检查一次有没有变化
      ignored: /node_modules/ // 这个不监听
    };
  }
}

// 正式上线
class WpPro extends Wp {
  constructor(props) {
    super(props);
    this.mode = 'production';
    this.plugins = [
      ...this.plugins,
      new webpack.DefinePlugin({
        __DEV__: false,
        __PRE__: true,
        __BUILD_EXT__: '".min"'
      })
    ];
  }
}

// 开发模式
class WpDev extends Wp {
  constructor(props) {
    super(props);
    this.mode = 'development';
    this.plugins = [
      ...this.plugins,
      new webpack.DefinePlugin({
        __DEV__: true,
        __PRE__: false,
        __BUILD_EXT__: '""'
      })
    ];
  }
}

let build = () => {
  return { ...new WpPro() };
};

// 开发模式通过暴露的方法给gulp使用
build.webpackDevConf = { ...new WpDev() };

// 直接暴露bild给package.json使用
module.exports = build;
