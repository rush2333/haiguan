module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://canteen.tonglingok.com/api/v1/',
        ws: true,
        changeOrigin: true
      },
    }
  }
}