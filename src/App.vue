<template>
  <v-app class="app-root" style="overflow:hidden;" :class="{'radius-before':!xs}"
  :style="xs?{height:'100%',width:'100%',top:'0',left:'0'}:(sm?{height:'98%',width:'98%',top:'1%',left:'1%'}:{height:'96.6%',width:'99%',top:'1.7%',left:'0.5%'})">

    <transition name="fade">
      <div class="loading" v-show="isLoading"><loader /></div>
    </transition>

    <video v-if="videoSrc" autoplay loop muted class="video-bg" ref="vdPlayer"
    :style="xs?{height:'100%',width:'100%',top:'0',left:'0'}:(sm?{height:'98%',width:'98%',top:'1%',left:'1%','border-radius':'16px'}:{height:'96.6%',width:'99%',top:'1.7%',left:'0.5%','border-radius':'16px'})">
      <source :src="videoSrc" type="video/mp4">
    </video>

    <!-- Always-visible toggle -->
    <div class="toggle-fab">
      <v-btn size="40" icon variant="text" @click="isClearScreen=!isClearScreen">
        <v-icon :icon="isClearScreen?'mdi-eye-outline':'mdi-eye-off-outline'" size="20" />
      </v-btn>
    </div>

    <div v-show="!isLoading && !isClearScreen" class="main-scroll" :class="{mobile:xs||sm}">

      <!-- Hero -->
      <div class="hero">
        <div class="avatar-ring" @mouseenter="showMusic=true" @mouseleave="showMusic=false">
          <v-avatar :size="xs?130:180" class="hero-avatar">
            <v-img :class="{'avatar-spin':isPlaying}" :src="configData.avatar" cover />
            <transition name="fade">
              <div v-show="showMusic" class="music-overlay">
                <div v-if="audioLoading" class="loading-spinner"><v-progress-circular indeterminate size="24" /></div>
                <span class="music-title">{{ musicInfo?.[playlistIndex]?.title }}</span>
                <span class="music-author">{{ musicInfo?.[playlistIndex]?.author }}</span>
                <audio v-show="false" ref="audioRef" :src="musicInfo?.[playlistIndex]?.url" @waiting="audioLoading=true" @canplay="onCanPlay" />
                <div class="music-controls">
                  <v-btn v-if="hasMultipleSongs" size="x-small" icon variant="text" @click="prevTrack()"><v-icon size="14">mdi-skip-previous</v-icon></v-btn>
                  <v-btn size="small" icon variant="text" @click="togglePlay()"><v-icon size="20">{{ isPlaying?'mdi-pause':'mdi-play' }}</v-icon></v-btn>
                  <v-btn v-if="hasMultipleSongs" size="x-small" icon variant="text" @click="nextTrack()"><v-icon size="14">mdi-skip-next</v-icon></v-btn>
                </div>
              </div>
            </transition>
          </v-avatar>
        </div>
        <h1 class="hero-title">{{ configData.welcometitle }}</h1>
        <div class="hero-typewriter glass-card" :style="xs?{padding:'0.8rem 1rem'}:{padding:'1.2rem 2rem'}">
          <typewriter />
        </div>
      </div>

      <!-- Row: Tags | Skills | Clock -->
      <v-row class="content-row">
        <v-col cols="12" md="4" class="col-stack">
          <div class="glass-card tag-card">
            <div class="card-label">Tags</div>
            <div class="tag-cloud">
              <v-chip v-for="(tag,i) in configData.tags" :key="tag" size="default" class="ma-1 tag-chip" :style="{animationDelay:(i*0.05).toFixed(2)+'s'}" style="animation:fadeInUp 0.4s var(--spring) both;">{{ tag }}</v-chip>
            </div>
          </div>
          <div class="glass-card sutra-card">
            <div class="card-label">心经</div>
            <div class="sutra-text">
              <p>观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。</p>
              <p>舍利子，色不异空，空不异色，色即是空，空即是色，受想行识，亦复如是。</p>
              <p>舍利子，是诸法空相，不生不灭，不垢不净，不增不减。是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界，乃至无意识界。无无明，亦无无明尽，乃至无老死，亦无老死尽。无苦集灭道，无智亦无得，以无所得故。</p>
              <p>菩提萨埵，依般若波罗蜜多故，心无挂碍，无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。</p>
              <p>三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。</p>
              <p>故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。</p>
              <p>故说般若波罗蜜多咒，即说咒曰：揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。</p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="glass-card skills-card" style="height:100%;">
            <div class="card-label">Skills</div>
            <div :style="xs?{height:'320px'}:{height:'400px'}">
              <polarchart />
            </div>
            <div style="text-align:center;color:var(--zako-vcard-color);opacity:0.45;font-size:0.7rem;margin-top:0.5rem;">{{ configData.polarChart.note }}</div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="glass-card clock-card" style="height:100%;">
            <div class="clock-time" :style="xs?{fontSize:'2.2rem'}:{fontSize:'3.2rem'}">{{ formattedTime }}</div>
            <div class="clock-date" style="font-size:1rem;">{{ formattedDate }}</div>
            <turntable :color1="configData.color.turntablecolor1" :color2="configData.color.turntablecolor2" />
          </div>
        </v-col>
      </v-row>

      <!-- Projects -->
      <div class="section-header">
        <v-chip prepend-icon="mdi-rocket-launch-outline" size="large" style="color:var(--zako-vcard-color);font-weight:600;">Projects</v-chip>
      </div>
      <v-row class="content-row">
        <v-col v-for="(item,key) in configData.projectcards" :key="key" cols="6" md="4" lg="3" :style="xs?{padding:'5px'}:{padding:'8px'}">
          <div class="glass-card project-card" :style="{animationDelay:(key*0.06).toFixed(2)+'s'}" style="animation:scaleIn 0.5s var(--spring) both;overflow:hidden;padding:0;">
            <div class="project-img-wrap">
              <v-img aspect-ratio="1.7778" :src="item.img" cover class="project-img" />
              <div class="project-gradient" />
            </div>
            <div style="padding:0.5rem 0.7rem;">
              <div class="project-title">{{ item.title }}</div>
              <div class="project-sub">{{ item.subtitle }}</div>
            </div>
            <div class="project-actions">
              <v-btn :href="item.url" target="_blank" :text="item.go" variant="text" size="small" />
              <v-spacer />
              <v-btn :icon="item.show?'mdi-chevron-up':'mdi-chevron-down'" variant="text" size="small" @click="item.show=!item.show;collapseOthers(key)" />
            </div>
            <v-expand-transition>
              <div v-show="item.show">
                <v-divider />
                <div class="project-text" :style="xs?{fontSize:'0.7rem',padding:'0.6rem'}:{fontSize:'0.85rem',padding:'0.8rem'}">{{ item.text }}</div>
              </div>
            </v-expand-transition>
          </div>
        </v-col>
      </v-row>

      <!-- Footer -->
      <div class="page-footer" v-if="configData.statement.length">
        <span v-for="s in configData.statement" :key="s">{{ s }}</span>
      </div>

      <!-- Dock -->
      <div class="dock">
        <v-btn v-for="item in configData.socialPlatformIcons" :key="item.icon" :size="36" variant="text" class="dock-item" icon :href="item.link" target="_blank">
          <v-icon :icon="item.icon" size="20" />
        </v-btn>
        <div class="dock-sep" />
        <v-btn size="36" variant="text" class="dock-item" icon @click="dialogStyle=true"><v-icon icon="mdi-palette-outline" size="20" /></v-btn>
        <v-btn size="36" variant="text" class="dock-item" icon @click="dialogBg=true"><v-icon icon="mdi-wallpaper" size="20" /></v-btn>
        <v-btn size="36" variant="text" class="dock-item" icon @click="dialogMusic=true"><v-icon icon="mdi-music-circle-outline" size="20" /></v-btn>
        <v-btn size="36" variant="text" class="dock-item" icon @click="dialogAbout=true"><v-icon icon="mdi-information-outline" size="20" /></v-btn>
      </div>

    </div>

    <v-dialog v-model="dialogStyle" width="900"><v-card class="dialog-glass"><tab1 @cancel="dialogStyle=false" /></v-card></v-dialog>
    <v-dialog v-model="dialogBg" width="900"><v-card class="dialog-glass"><tab2 @cancel="dialogBg=false" /></v-card></v-dialog>
    <v-dialog v-model="dialogMusic" width="800"><v-card class="dialog-glass">
      <div v-if="musicLoading" class="d-flex justify-center pa-10"><v-progress-circular indeterminate /></div>
      <tab3 v-else :musicinfo="musicInfo" :currentIndex="playlistIndex" :isPlaying="isPlaying" :audioPlayer="audioRef" :fromLyrics="lyricsCache" :audioLoading="audioLoading"
        @update:current-index="idx=>{playlistIndex=idx;updateAudio()}" @update:is-playing="val=>isPlaying=val" @update:current-lyrics="v=>lyricsCache=v" />
    </v-card></v-dialog>
    <v-dialog v-model="dialogAbout" width="480"><v-card class="dialog-glass pa-6" style="text-align:center;">
      <h3 style="margin-bottom:1.2rem;font-weight:600;">About</h3>
      <p style="color:var(--zako-vcard-color);opacity:0.5;font-size:0.8rem;margin-bottom:1rem;">Built with</p>
      <div class="stack-grid">
        <div class="stack-item" v-for="item in stackIcons" :key="item.name">
          <span class="stack-name">{{ item.name }}</span>
          <span class="stack-ver">{{ item.ver }}</span>
        </div>
      </div>
      <p class="mt-4" v-if="configData.statement.length"><span v-for="s in configData.statement" :key="s">{{s}}<br></span></p>
    </v-card></v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useConfig } from './composables/useConfig.js'
import { useTheme } from './composables/useTheme.js'
import { setMeta, getFormattedTime, getFormattedDate, dataConsole } from './utils/common.js'
import typewriter from './components/typewriter.vue'
import turntable from './components/turntable.vue'
import polarchart from './components/polarchart.vue'
import loader from './components/loader.vue'
import tab1 from './components/tabs/tab1.vue'
import tab2 from './components/tabs/tab2.vue'
import tab3 from './components/tabs/tab3.vue'

const { xs, sm } = useDisplay()
const configData = useConfig()
const { applyColors, applyBackground } = useTheme()

const isLoading = ref(true)
const isClearScreen = ref(false)
const formattedTime = ref('')
const formattedDate = ref('')
const videoSrc = ref('')
const showMusic = ref(false)
const isPlaying = ref(false)
const playlistIndex = ref(0)
const audioLoading = ref(false)
const musicInfo = ref(null)
const musicLoading = ref(false)
const lyricsCache = ref({})
const audioRef = ref(null)
const vdPlayer = ref(null)
const shouldAutoPlay = ref(false)
const dialogStyle = ref(false)
const dialogBg = ref(false)
const dialogMusic = ref(false)
const dialogAbout = ref(false)

const hasMultipleSongs = computed(() => (musicInfo.value?.length||0) > 1)

const stackIcons = [
  { name:'Vue', ver:'3.5' },
  { name:'Vuetify', ver:'3.7' },
  { name:'Vite', ver:'5.4' },
  { name:'Chart.js', ver:'4.4' },
  { name:'TypeIt', ver:'8.8' },
  { name:'Less', ver:'4.2' },
  { name:'MDI', ver:'7.4' },
]

function initBackground(mobile) {
  const r = applyBackground(mobile)
  if (r.type==='pic') { videoSrc.value=''; return r.url }
  videoSrc.value=r.url; return ''
}

async function preloadAssets(imageUrl) {
  const urls = [configData.avatar, ...configData.projectcards.map(p=>p.img)]
  const proms = urls.map(u=>new Promise((res,rej)=>{const i=new Image();i.src=u;i.onload=res;i.onerror=rej}))
  await Promise.race([Promise.all(proms), new Promise(r=>setTimeout(r,2500))])
  if (imageUrl) await new Promise((res,rej)=>{const i=new Image();i.src=imageUrl;i.onload=res;i.onerror=rej})
  else if (vdPlayer.value) await new Promise(r=>{vdPlayer.value.onloadedmetadata=()=>setTimeout(r,200);vdPlayer.value.onerror=r})
}

function fetchMusic() {
  const m = configData.music
  if (!m?.songs?.length) {
    musicLoading.value = false
    return
  }
  musicInfo.value = m.songs.map(s => ({ title: s.title, author: s.author, url: s.src, pic: '', lrc: '' }))
  musicLoading.value = false
}

function updateAudio() {
  const s = musicInfo.value?.[playlistIndex.value]
  if (!s||!audioRef.value) return
  shouldAutoPlay.value = true
  audioLoading.value = true
  audioRef.value.src = s.url
}

function onCanPlay() {
  audioLoading.value = false
  if (shouldAutoPlay.value) {
    shouldAutoPlay.value = false
    audioRef.value?.play()
    isPlaying.value = true
  }
}

function togglePlay() {
  if(!audioRef.value)return
  shouldAutoPlay.value = false
  if(isPlaying.value) { audioRef.value.pause(); isPlaying.value=false }
  else { audioRef.value.play(); isPlaying.value=true }
}
function nextTrack() { playlistIndex.value=(playlistIndex.value+1)%(musicInfo.value?.length||1); updateAudio() }
function prevTrack() { if(!musicInfo.value)return; playlistIndex.value=playlistIndex.value>0?playlistIndex.value-1:musicInfo.value.length-1; updateAudio() }
function onAudioEnded() { nextTrack() }
function tick() { formattedTime.value = getFormattedTime(new Date()) }
function collapseOthers(key) { configData.projectcards.forEach((item,i)=>{if(i!==key)item.show=false}) }

watch(isClearScreen, v=>{ if(!vdPlayer.value||!videoSrc.value)return; vdPlayer.value.style.zIndex=v?0:-100; vdPlayer.value.controls=v })

onMounted(async()=>{
  dataConsole()
  setMeta(configData.metaData.title, configData.metaData.description, configData.metaData.keywords, configData.metaData.icon)
  applyColors()
  formattedDate.value=getFormattedDate(new Date()); tick(); setInterval(tick,1000)
  const imageUrl = initBackground(xs.value)
  await preloadAssets(imageUrl)
  setTimeout(()=>{isLoading.value=false},350)
  fetchMusic()
  audioRef.value?.addEventListener('ended', onAudioEnded)
})

onBeforeUnmount(()=>{ audioRef.value?.removeEventListener('ended', onAudioEnded) })
</script>

<style scoped>
@import url(/css/mobile.less);

.app-root {
  position: fixed;
  background-color: #0a0a0f;
  z-index: -1;
}

.app-root::before {
  content: "";
  background-image: var(--zako-background-image-url);
  transition: background-image 1s var(--ease);
  background-size: cover;
  background-position: center;
  position: absolute;
  inset: 0;
  z-index: -1;
  filter: brightness(var(--zako-brightness));
}

.app-root.radius-before::before { border-radius: 16px; }

.video-bg {
  position: fixed;
  z-index: -100;
  object-fit: cover;
  margin: auto;
  filter: brightness(var(--zako-brightness)) blur(1px);
  transform: scale(1.02);
}

.floating-switch-container {
  position: fixed;
  right: 16px;
  top: 16px;
  z-index: 99;
}

.floating-switch {
  transform: translateX(48%);
  transition: transform 0.35s var(--spring);
}
.floating-switch:hover { transform: translateX(0); }

.loading {
  position: fixed;
  inset: 0;
  background: #0a0a0f;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s var(--ease); }
.fade-enter, .fade-leave-to { opacity: 0; }

.main-scroll {
  height: 100vh;
  overflow-y: auto;
  padding: 2rem 3rem 6rem;
}
.main-scroll.mobile { padding: 1rem 0.75rem 5rem; }

/* Hero */
.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-ring {
  display: inline-block;
  padding: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
  box-shadow: 0 0 40px rgba(255,255,255,0.06);
  margin-bottom: 1rem;
}

.hero-avatar {
  position: relative;
}

.avatar-spin { animation: spin 8s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }

.music-overlay {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.music-title, .music-author {
  font-size: 13px;
  color: var(--zako-vcard-color);
  pointer-events: none;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1.3;
}

.music-controls {
  display: flex;
  align-items: center;
  gap: 2px;
  color: rgba(255,255,255,0.7);
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1;
}

.hero-title {
  font-family: "Press Start 2P", monospace;
  color: var(--zako-welcomtitle-color);
  text-shadow: 0 2px 20px rgba(0,0,0,0.5);
  letter-spacing: 0.02em;
  margin-bottom: 1.2rem;
  font-size: clamp(1.6rem, 5vw, 3rem);
  font-weight: 400;
  line-height: 1.5;
}

.hero-typewriter {
  max-width: 900px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
}

/* Cards */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow-sm);
  padding: 1rem 1.2rem;
  transition: all 0.35s var(--ease);
}
.glass-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  box-shadow: var(--glass-shadow);
  transform: translateY(-2px);
}

.card-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--zako-vcard-color);
  opacity: 0.45;
  margin-bottom: 0.8rem;
}

.content-row { margin: 0 0 1rem; }

.tag-card { min-height: auto; }
.tag-cloud { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; align-items: center; min-height: 60px; }
.tag-chip { padding: 0 12px !important; height: 32px !important; font-size: 0.85rem; }

.col-stack {
  display: flex !important;
  flex-direction: column;
}

.sutra-card {
  flex: 1;
  margin-top: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sutra-text {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
}
.sutra-text p {
  font-family: "STKaiti", "KaiTi", "楷体", "华文楷体", serif;
  font-size: 0.78rem;
  line-height: 1.9;
  color: var(--zako-vcard-color);
  opacity: 0.55;
  margin: 0 0 0.5rem;
  letter-spacing: 0.03em;
}

.sutra-text::-webkit-scrollbar { width: 3px; }
.sutra-text::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }

.clock-card { text-align: center; }
.clock-time { font-family: "digital"; font-weight: 800; letter-spacing: 3px; color: var(--zako-vcard-color); }
.clock-date { font-size: 0.85rem; color: var(--zako-vcard-color); opacity: 0.6; margin-bottom: 0.5rem; }

.skills-card { margin-bottom: 1.5rem; }

.section-header { margin-bottom: 0.8rem; margin-left: 0.25rem; }

.project-card { height: 100%; display: flex; flex-direction: column; }
.project-img-wrap { position: relative; overflow: hidden; }
.project-img { transition: transform 0.5s var(--ease); }
.project-card:hover .project-img { transform: scale(1.05); }
.project-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4));
  pointer-events: none;
}
.project-title { font-size: 0.9rem; font-weight: 600; color: var(--zako-vcard-color); }
.project-sub { font-size: 0.7rem; color: var(--zako-vcard-color); opacity: 0.6; }
.project-actions { display: flex; align-items: center; padding: 0 0.3rem; min-height: 2.5rem; }
.project-text { color: var(--zako-vcard-color); opacity: 0.8; line-height: 1.5; }

/* Dock */
.toggle-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
}
.toggle-fab:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
}

.page-footer {
  text-align: center;
  color: var(--zako-vcard-color);
  opacity: 0.35;
  font-size: 0.78rem;
  padding: 1.5rem 0 1rem;
  letter-spacing: 0.04em;
}

.dock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 14px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
  width: fit-content;
  margin: 1.5rem auto 0;
  position: sticky;
  bottom: 0;
}

.dock-item {
  transition: all 0.35s var(--spring);
  color: var(--zako-vcard-color) !important;
}
.dock-item:hover { transform: scale(1.25) translateY(-6px); color: #fff !important; }

.dock-sep {
  width: 1px;
  height: 18px;
  background: var(--glass-border);
  margin: 0 6px;
}

/* Dialog */
.dialog-glass {
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg) !important;
}

.stack-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.stack-item {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.stack-name { font-size: 0.8rem; color: var(--zako-vcard-color); font-weight: 500; }
.stack-ver { font-size: 0.65rem; color: var(--zako-vcard-color); opacity: 0.4; }
</style>
