<template>
  <v-container fluid class="pa-0 tab2">
    <v-tabs v-model="tab" :items="tabs" align-tabs="center" height="25" slider-color="var(--zako-vcard-color)">
      <template v-slot:tab="{ item }">
        <v-tab :prepend-icon="item.icon" :text="item.text" :value="item.value" class="text-none" />
      </template>
      <template v-slot:item="{ item }">
        <v-tabs-window-item :value="item.value" class="pa-4">
          <div v-if="item.value==='tab-1'">
            <v-radio-group v-model="radios" inline>
              <template v-slot:label>
                <div class="mb-2 d-flex justify-space-between" style="width:100%;align-items:center;">
                  <div class="itemText"><strong :style="smAndDown?{'font-size':'13px'}:{}">{{ radios.title }}</strong></div>
                  <v-menu location="bottom" :offset="[0,15]">
                    <template v-slot:activator="{ props: ap }">
                      <v-btn variant="tonal" v-bind="ap" :density="smAndDown?'compact':'default'"><v-icon>mdi-swap-horizontal</v-icon></v-btn>
                    </template>
                    <v-card class="d-flex flex-column">
                      <v-btn variant="tonal" v-for="st in deviceTypes" :key="st.type" @click="switchType(st.type,'static')">{{ st.name }}</v-btn>
                    </v-card>
                  </v-menu>
                </div>
              </template>
              <v-row class="scroll-container">
                <v-col :cols="device==='mobile'?6:12" :sm="device==='mobile'?4:6" :md="device==='mobile'?3:4" v-for="item in paginatedPIC" :key="item.preview" class="d-flex justify-center">
                  <v-img rounded="lg" @click="radios=item" style="cursor:pointer" :class="{'selected-item':radios===item}"
                    :max-width="smAndDown?(device==='mobile'?100:200):(device==='mobile'?160:250)"
                    :max-height="smAndDown?(device==='mobile'?170:120):(device==='mobile'?272:150)"
                    cover :src="item.preview">
                    <template v-slot:placeholder>
                      <v-row align="center" class="fill-height ma-0" justify="center">
                        <v-progress-circular color="grey-lighten-5" indeterminate />
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </v-radio-group>
            <v-pagination v-model="currentPICPage" :length="totalPICPages" :density="smAndDown?'compact':'default'" />
          </div>
          <div v-if="item.value==='tab-2'">
            <v-radio-group v-model="radios" inline>
              <template v-slot:label>
                <div class="mb-2 d-flex justify-space-between" style="width:100%;align-items:center;">
                  <div class="itemText"><strong :style="smAndDown?{'font-size':'13px'}:{}">{{ radios.title }}</strong></div>
                  <v-menu location="bottom" :offset="[0,15]">
                    <template v-slot:activator="{ props: ap }">
                      <v-btn variant="tonal" v-bind="ap" :density="smAndDown?'compact':'default'"><v-icon>mdi-swap-horizontal</v-icon></v-btn>
                    </template>
                    <v-card class="d-flex flex-column">
                      <v-btn variant="tonal" v-for="st in deviceTypes" :key="st.type" @click="switchType(st.type,'dynamic')">{{ st.name }}</v-btn>
                    </v-card>
                  </v-menu>
                </div>
              </template>
              <v-row class="scroll-container">
                <v-col :cols="device==='mobile'?6:12" :sm="device==='mobile'?4:6" :md="device==='mobile'?3:4" v-for="item in paginatedVD" :key="item.preview" class="d-flex justify-center">
                  <div class="video-container" @click="radios=item" style="cursor:pointer">
                    <div v-if="!item.loaded" class="loading-spinner"><v-progress-circular indeterminate /></div>
                    <video autoplay loop muted :class="{'selected-item':radios===item}"
                      :style="device==='mobile'?(smAndDown?{width:'100px',height:'170px'}:{width:'160px',height:'272px'}):(smAndDown?{width:'200px'}:{width:'250px'})"
                      style="object-fit:cover;" rounded="lg" @loadeddata="item.loaded=true">
                      <source :src="item.preview" type="video/mp4">
                    </video>
                  </div>
                </v-col>
              </v-row>
            </v-radio-group>
            <v-pagination v-model="currentVDPage" :length="totalVDPages" :density="smAndDown?'compact':'default'" />
          </div>
        </v-tabs-window-item>
      </template>
    </v-tabs>
    <div style="text-align:center;font-size:12px;"><span>壁纸在对应设备上生效</span></div>
  </v-container>
  <div class="pa-4">
    <div class="d-flex align-center" style="gap:8px;">
      <input type="file" accept="image/*" ref="fileInput" style="display:none" @change="onFilePicked" />
      <v-btn variant="tonal" size="small" @click="fileInput.click()" prepend-icon="mdi-image-plus">上传壁纸</v-btn>
      <v-text-field v-model="customUrl" label="或粘贴URL" variant="outlined" density="compact" hide-details placeholder="https://..." />
      <v-btn variant="tonal" size="small" @click="useCustomUrl" :disabled="!customUrl">Use</v-btn>
    </div>
  </div>
  <div class="d-flex justify-center mt-3">
    <v-btn :loading="loading1" variant="tonal" class="ma-2" @click="reset()">Reset</v-btn>
    <v-btn variant="tonal" class="ma-2" @click="$emit('cancel')">Cancel</v-btn>
    <v-btn :loading="loading2" variant="tonal" class="ma-2" @click="save()">Apply</v-btn>
  </div>
  <v-snackbar :timeout="2000" rounded="pill" location="top" v-model="snackbar">Please select a wallpaper</v-snackbar>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useTheme } from '../../composables/useTheme.js'
import { useConfig } from '../../composables/useConfig.js'

const emit = defineEmits(['cancel'])
const { smAndDown } = useDisplay()
const { setCookie, getCookie, eraseCookie, getBackground } = useTheme()
const config = useConfig()

const loading1 = ref(false)
const loading2 = ref(false)
const snackbar = ref(false)
const customUrl = ref('')
const fileInput = ref(null)
const wallpaperPIC = ref([])
const wallpaperVD = ref([])
const radios = ref({ title: 'Select wallpaper' })
const currentVDPage = ref(1)
const currentPICPage = ref(1)
const itemsPerPage = ref(6)
const tab = ref(null)
const device = ref('pc')

const tabs = [
  { icon: 'mdi-image-outline', text: 'Static', value: 'tab-1' },
  { icon: 'mdi-video-outline', text: 'Dynamic', value: 'tab-2' },
]

const deviceTypes = [
  { type: 'pc', name: 'Desktop' },
  { type: 'mobile', name: 'Mobile' },
]

const totalVDPages = computed(() => Math.ceil(wallpaperVD.value.length / itemsPerPage.value))
const totalPICPages = computed(() => Math.ceil(wallpaperPIC.value.length / itemsPerPage.value))

const paginatedPIC = computed(() => {
  const s = (currentPICPage.value - 1) * itemsPerPage.value
  return wallpaperPIC.value.slice(s, s + itemsPerPage.value)
})

const paginatedVD = computed(() => {
  const s = (currentVDPage.value - 1) * itemsPerPage.value
  return wallpaperVD.value.slice(s, s + itemsPerPage.value)
})

watch(tab, (val) => {
  device.value = 'pc'
  itemsPerPage.value = 6
  if (val === 'tab-1') wallpaperPIC.value = config.wallpaper.pic
  else wallpaperVD.value = config.wallpaper.video
})

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('zako-wallpapers') || '[]')
  wallpaperPIC.value = [...config.wallpaper.pic, ...stored]
  wallpaperVD.value = config.wallpaper.video
})

function switchType(type, tabType) {
  device.value = type
  if (tabType === 'static') {
    itemsPerPage.value = type === 'mobile' ? 8 : 6
    wallpaperPIC.value = type === 'mobile' ? config.wallpaper.picMobile : config.wallpaper.pic
    currentPICPage.value = 1
  } else {
    itemsPerPage.value = type === 'mobile' ? 8 : 6
    wallpaperVD.value = type === 'mobile' ? config.wallpaper.videoMobile : config.wallpaper.video
    currentVDPage.value = 1
  }
}

function useCustomUrl() {
  if (!customUrl.value) return
  radios.value = { title: '自定义', preview: customUrl.value, url: customUrl.value }
  customUrl.value = ''
}

function onFilePicked(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const dataUrl = reader.result
    const stored = JSON.parse(localStorage.getItem('zako-wallpapers') || '[]')
    stored.push({ title: file.name, preview: dataUrl, url: dataUrl })
    localStorage.setItem('zako-wallpapers', JSON.stringify(stored))
    wallpaperPIC.value = [...config.wallpaper.pic, ...stored]
    radios.value = { title: file.name, preview: dataUrl, url: dataUrl }
  }
  reader.readAsDataURL(file)
  e.target.value = ''
}

function save() {
  if (!radios.value.url) { snackbar.value = true; return }
  const bg = { pc: {}, mobile: {} }
  const cookieBg = getCookie('zakodatabackground')
  delete radios.value.loaded

  if (device.value === 'mobile') {
    bg.mobile = { type: tab.value === 'tab-1' ? 'pic' : 'video', datainfo: radios.value }
    bg.pc = cookieBg ? cookieBg.pc : config.background.pc
  } else {
    bg.pc = { type: tab.value === 'tab-1' ? 'pic' : 'video', datainfo: radios.value }
    bg.mobile = cookieBg ? cookieBg.mobile : config.background.mobile
  }

  loading2.value = true
  setTimeout(() => {
    setCookie('zakodatabackground', bg, 0.005)
    location.reload()
  }, 600)
}

function reset() {
  loading1.value = true
  setTimeout(() => {
    eraseCookie('zakodatabackground')
    location.reload()
  }, 600)
}
</script>

<style scoped>
@import url(/css/mobile.less);
video { pointer-events:none;border-radius:0.5rem; }
.itemText { width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.loading-spinner { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1; }
.video-container { position:relative;display:flex; }
.scroll-container { max-height:300px;overflow-y:auto; }
.scroll-container::-webkit-scrollbar { width:5px; }
.scroll-container::-webkit-scrollbar-thumb { background-color:#888;border-radius:4px; }
.selected-item { border-color:var(--zako-vcard-color);box-shadow:0 0 10px var(--zako-vcard-color); }
</style>
