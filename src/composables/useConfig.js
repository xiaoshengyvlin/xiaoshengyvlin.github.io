import config from '../config.js'

const resolved = import.meta.env.VITE_CONFIG
  ? JSON.parse(import.meta.env.VITE_CONFIG)
  : config

export function useConfig() {
  return resolved
}
