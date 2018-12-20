const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

class Wp {
  constructor() {
    // entry: './web/src/index.js',
    this.entry = {
      app: './web/src/index.js',
      print: './web/src/print.js'
    };
    this.devtool = 'eval-source-map'; // 编译后查询报错位置
    this.plugins = [
      // new CleanWebpackPlugin(['dist']), // 编译前删除文件
      new HtmlWebpackPlugin({
        title: 'Output Management',
        inject: false,
        template: require('html-webpack-template'),
        scripts: [
          "../../renderer/renderer.js"
        ],
        headHtmlSnippet: "<script>require('electron-connect').client.create()</script>"
      })
    ];
    this.output = {
      filename: '[name].main.js',
      path: path.resolve(__dirname + '/web', 'dist')
    };
    this.module = {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
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
};

class WpPro extends Wp {
  constructor(props) {
    super(props);
  }
}

let build = () => {
  return { ...new WpPro }
}

build.webpackDevConf = { ...new Wp }

module.exports = build;