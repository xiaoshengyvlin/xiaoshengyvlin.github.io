import { getCookie, setCookie, eraseCookie } from '../utils/cookieUtils.js'
import { useConfig } from './useConfig.js'

const root = document.documentElement

export function useTheme() {
  const config = useConfig()

  function getColorData() {
    return getCookie('zakodata') || config
  }

  function applyColors(data = null) {
    const d = data || getColorData()
    root.style.setProperty('--zako-welcomtitle-color', d.color.welcometitlecolor)
    root.style.setProperty('--zako-vcard-color', d.color.themecolor)
    root.style.setProperty('--zako-brightness', `${d.brightness}%`)
    root.style.setProperty('--zako-blur', `${d.blur}px`)
    root.style.setProperty('--glass-blur', `blur(${d.blur}px) saturate(180%)`)
  }

  function getBackground() {
    return getCookie('zakodatabackground') || config.background
  }

  function resolveBackground(isMobile) {
    const bg = getBackground()
    const key = isMobile ? 'mobile' : 'pc'
    return bg[key]
  }

  function applyBackground(isMobile) {
    const bgSection = resolveBackground(isMobile)
    if (bgSection.type === 'pic') {
      root.style.setProperty('--zako-background-image-url', `url('${bgSection.datainfo.url}')`)
      return { type: 'pic', url: bgSection.datainfo.url }
    }
    return { type: 'video', url: bgSection.datainfo.url }
  }

  return {
    applyColors,
    getColorData,
    getBackground,
    resolveBackground,
    applyBackground,
    setCookie,
    getCookie,
    eraseCookie
  }
}
