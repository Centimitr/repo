module.exports = {
  map: function (u) {
    let url = u.substr(10)
    const names = ['index', 'location', 'history', 'downloads', 'blank']
    const index = names.map(n => n + '/').indexOf(url)
    if (index >= 0) {
      url = names[index] + '.html'
    } else {
      names.forEach(n => url = url.replace(n + '/', ''))
    }
    return url
  },
}