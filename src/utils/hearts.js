function initHearts() {
  var s = []

  function r() {
    for (var e = 0; e < s.length; e++)
      s[e].alpha <= 0
        ? (document.body.removeChild(s[e].el), s.splice(e, 1))
        : (s[e].y--,
          s[e].scale += 0.004,
          s[e].alpha -= s[e].decay,
          s[e].el.style.cssText =
            'left:' +
            s[e].x +
            'px;top:' +
            s[e].y +
            'px;opacity:' +
            s[e].alpha +
            ';transform:scale(' +
            s[e].scale +
            ',' +
            s[e].scale +
            ') rotate(45deg);background:' +
            s[e].color +
            ';z-index:99999')
    requestAnimationFrame(r)
  }

  function randomColor() {
    return 'rgb(' + ~~(255 * Math.random()) + ',' + ~~(255 * Math.random()) + ',' + ~~(255 * Math.random()) + ')'
  }

  document.addEventListener('click', function (e) {
    for (var i = 0; i < 3; i++) {
      var a = document.createElement('div')
      a.className = 'click-heart'
      var o = 22
      var sc = 0.3 + Math.random() * 0.7
      s.push({
        el: a,
        x: e.clientX + (Math.random() - 0.5) * o,
        y: e.clientY + (Math.random() - 0.5) * o,
        scale: sc,
        alpha: 1,
        decay: 0.005 + sc * 0.012,
        color: randomColor(),
      })
      document.body.appendChild(a)
    }
  })

  requestAnimationFrame(r)
}

export { initHearts }
