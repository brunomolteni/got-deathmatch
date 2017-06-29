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
  }
}
