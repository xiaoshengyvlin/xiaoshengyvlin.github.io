<template>
  <div class="zako-typewriter" style="text-align:center;">
    <span class="quote">" </span>
    <span ref="textEl" class="msg"></span>
    <span class="quote"> "</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TypeIt from 'typeit'
import { useConfig } from '../composables/useConfig.js'

const config = useConfig()
const textEl = ref(null)

onMounted(() => {
  new TypeIt(textEl.value, {
    strings: config.typeWriterStrings,
    cursorChar: "<span style='font-size:1.3em;color:var(--zako-vcard-color);opacity:0.9;'>|</span>",
    speed: 140,
    lifeLike: true,
    cursor: true,
    breakLines: false,
    loop: true,
    nextStringDelay: 2000,
    afterString: () => new Promise(r => setTimeout(r, 2500)),
  }).go()
})
</script>

<style scoped>
.msg {
  font-family: "STKaiti", "KaiTi", "楷体", "华文楷体", serif;
}

.msg, .quote {
  color: var(--zako-vcard-color);
  letter-spacing: 0.05em;
  font-size: 26px;
  font-weight: 400;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  line-height: 1.7;
}

.quote {
  font-size: 32px;
  font-weight: 300;
  opacity: 0.4;
}

@media screen and (min-width: 960px) and (max-width: 1200px) {
  .msg, .quote { font-size: 21px; }
  .quote { font-size: 27px; }
}

@media (max-width: 960px) {
  .zako-typewriter { min-height: 56px; }
  .msg, .quote { font-size: 16px; letter-spacing: 0.03em; }
  .quote { font-size: 20px; }
}
</style>
