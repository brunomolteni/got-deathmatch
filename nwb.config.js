module.exports = {
  webpack: {
    html: {
      template: 'pages/layout.html'
    },
    rules: {
      svg: {
        limit: 100000
      }
    }
  },
  devServer: {
    proxy: {
      "/socket.io": "http://localhost:5000"
    }
  }
}
