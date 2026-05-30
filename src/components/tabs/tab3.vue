<template>
  <div v-if="!lyricsLoaded || audioLoading" class="loading-spinner">
    <v-progress-circular indeterminate />
  </div>
  <v-container class="pa-0">
    <v-divider :thickness="4" />
    <div class="pa-3">
      <div style="display:flex;width:100%;align-items:center;">
        <v-avatar rounded="0" :image="currentSong?.pic" :size="xs?48:64" />
        <v-btn icon @click="togglePlay" :size="xs?28:38" variant="tonal" class="ml-1">
          <v-icon>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
        </v-btn>
        <v-btn v-if="musicinfo.length>1" icon @click="nextTrack" :size="xs?28:38" variant="tonal" class="ml-1">
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
        <v-slider style="margin-bottom:-22px;padding:0;"
          v-model="currentTime" :max="duration"
          thumb-size="12" density="compact"
          @update:modelValue="seek"
          @end="onSliderEnd" @start="onSliderStart" />
        <span :style="xs?{'font-size':'10px'}:{'font-size':'12px'}" style="color:var(--zako-vcard-color);">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </span>
      </div>
      <div class="lyrics-container ml-1">
        <div class="lyrics" v-if="currentLyric" :style="xs?{'font-size':'10px'}:{'font-size':'13px'}">{{ currentLyric }}</div>
        <div>
          <span :style="xs?{'font-size':'10px'}:{'font-size':'14px'}" style="opacity:0.7;">{{ currentSong?.title }}</span>
          <span :style="xs?{'font-size':'10px'}:{'font-size':'12px'}" style="opacity:0.7;"> - {{ currentSong?.author }}</span>
        </div>
      </div>
    </div>
    <v-divider :thickness="4" />
    <v-list style="max-height:300px;background:transparent;overflow-y:auto;" ref="songList">
      <v-list-item style="position:relative;"
        v-for="(song, index) in musicinfo" :key="index"
        @click="play(index)"
        :class="{'active-song':index===currentIndex}"
        ref="songItems">
        <v-list-item-content class="d-flex justify-space-between">
          <v-list-item-title style="color:var(--zako-vcard-color);">
            <span style="margin-right:12px;">{{ index + 1 }}</span>
            <span>{{ song.title }}</span>
          </v-list-item-title>
          <span style="font-size:12px;color:var(--zako-vcard-color);">{{ song.author }}</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const props = defineProps({
  musicinfo: { type: Array, required: true },
  fromLyrics: { type: Object, default: () => ({}) },
  currentIndex: { type: Number, required: true },
  isPlaying: { type: Boolean, required: true },
  audioPlayer: { type: Object, default: null },
  audioLoading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:current-index', 'update:is-playing', 'update:current-lyrics'])

const lyricsLoaded = ref(true)
const lyrics = ref([])
const currentLyric = ref('')
const lyricTimer = ref(null)
const currentTime = ref(0)
const duration = ref(0)
const songList = ref(null)
const songItems = ref([])

const currentSong = computed(() => props.musicinfo[props.currentIndex])

watch(() => props.currentIndex, () => {
  loadLyrics()
  scrollToCurrent()
})

watch(() => props.isPlaying, (val) => {
  val ? startLyricTimer() : stopLyricTimer()
})

async function loadLyrics() {
  if (!currentSong.value?.lrc) return
  lyricsLoaded.value = false
  try {
    currentLyric.value = ''
    const res = await fetch(currentSong.value.lrc)
    const text = await res.text()
    lyrics.value = parseLyrics(text)
    emit('update:current-lyrics', { index: props.currentIndex, lyrics: lyrics.value })
    lyricsLoaded.value = true
  } catch { /* ignore */ }
}

function parseLyrics(text) {
  return text.split('\n')
    .map(line => {
      const m = line.match(/^\[(\d+):(\d+)\.(\d+)\](.*)/)
      if (!m) return null
      return { time: +m[1] * 60 + +m[2] + +m[3] / 1000, text: m[4].trim() }
    })
    .filter(Boolean)
}

function updateLyric() {
  const ct = props.audioPlayer?.currentTime || 0
  for (let i = lyrics.value.length - 1; i >= 0; i--) {
    if (ct >= lyrics.value[i].time) { currentLyric.value = lyrics.value[i].text; break }
  }
}

function startLyricTimer() {
  lyricTimer.value = setInterval(updateLyric, 100)
}

function stopLyricTimer() {
  if (lyricTimer.value) { clearInterval(lyricTimer.value); lyricTimer.value = null }
}

function play(index) {
  if (index === props.currentIndex && props.isPlaying) {
    togglePlay()
  } else {
    emit('update:current-index', index)
    emit('update:is-playing', true)
  }
}

function togglePlay() {
  if (!props.audioPlayer) return
  props.isPlaying ? props.audioPlayer.pause() : props.audioPlayer.play()
  emit('update:is-playing', !props.isPlaying)
}

function nextTrack() {
  emit('update:current-index', (props.currentIndex + 1) % props.musicinfo.length)
  emit('update:is-playing', true)
}

function scrollToCurrent() {
  const el = songItems.value?.[props.currentIndex]
  el?.$el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
}

function onTimeUpdate() { currentTime.value = props.audioPlayer?.currentTime || 0 }
function onMetaLoaded() { duration.value = props.audioPlayer?.duration || 0 }

function seek(t) { if (props.audioPlayer) props.audioPlayer.currentTime = t }
function onSliderStart() { props.audioPlayer?.pause(); emit('update:is-playing', false) }
function onSliderEnd() { props.audioPlayer?.play(); emit('update:is-playing', true) }

function formatTime(t) {
  if (!t || isNaN(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

onMounted(() => {
  if (props.fromLyrics.index >= 0 && props.currentIndex === props.fromLyrics.index) {
    lyrics.value = props.fromLyrics.lyrics
    startLyricTimer()
  } else {
    if (props.isPlaying) {
      startLyricTimer()
      duration.value = props.audioPlayer?.duration || 0
    }
    loadLyrics()
  }
  props.audioPlayer?.addEventListener('timeupdate', onTimeUpdate)
  props.audioPlayer?.addEventListener('loadedmetadata', onMetaLoaded)
  duration.value = props.audioPlayer?.duration || 0
  scrollToCurrent()
})

onBeforeUnmount(() => {
  stopLyricTimer()
  props.audioPlayer?.removeEventListener('timeupdate', onTimeUpdate)
  props.audioPlayer?.removeEventListener('loadedmetadata', onMetaLoaded)
})
</script>

<style scoped>
.loading-spinner { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1; }
.lyrics-container { width:100%;margin-top:10px; }
.lyrics { width:100%;color:var(--zako-vcard-color); }
.v-list { border-radius:0 0 8px 8px; }
.v-list-item { border-bottom:solid 1px rgba(255,255,255,0.08);min-height:40px!important;padding:8px!important; }
.v-list-item-title { font-size:12px; }
.active-song { background-color:rgba(255,255,255,0.06);border-radius:4px; }
.v-list::-webkit-scrollbar { width:5px; }
.v-list::-webkit-scrollbar-thumb { background-color:#888;border-radius:4px; }
</style>
