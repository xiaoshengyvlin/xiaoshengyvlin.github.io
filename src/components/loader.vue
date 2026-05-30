<template>
  <div class="loader">
    <svg class="loader-svg" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
      <circle cx="20" cy="20" r="16" fill="none" :stroke="accentColor" stroke-width="2" stroke-linecap="round"
        stroke-dasharray="100" stroke-dashoffset="75" />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'
const { getColorData } = useTheme()
const accentColor = computed(() => {
  try { return getColorData().color.themecolor || '#fff' } catch { return '#fff' }
})
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-svg {
  width: 48px;
  height: 48px;
  animation: loaderSpin 1.2s linear infinite;
}

.loader-svg circle:last-child {
  animation: loaderDash 1.5s ease-in-out infinite;
}

@keyframes loaderSpin {
  100% { transform: rotate(360deg); }
}

@keyframes loaderDash {
  0%   { stroke-dashoffset: 100; }
  50%  { stroke-dashoffset: 25; }
  100% { stroke-dashoffset: 100; }
}
</style>
