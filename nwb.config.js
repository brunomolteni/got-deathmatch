module.exports = {
  webpack: {
    html: {
      template: 'layout.html'
    },
    rules: {
      svg: {
        limit: 100000
      }
    }
  },
  devServer: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
}
