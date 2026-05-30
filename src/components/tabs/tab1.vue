<template>
  <div class="mx-auto rounded" style="background:transparent;">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="color.themecolor" label="主题颜色" @click="selectColor='themecolor';colorDialog=true" readonly variant="outlined" />
      <v-text-field v-model="color.welcometitlecolor" label="标题颜色" @click="selectColor='welcometitlecolor';colorDialog=true" readonly variant="outlined" />
      <v-slider class="ml-5 mr-8" label="背景亮度" :max="100" :min="50" :step="0.5" :thumb-size="xs?15:18" v-model="brightness" thumb-label="always" />
      <v-slider class="ml-5 mr-8" label="模糊度" :max="20" :min="0" :step="0.2" :thumb-size="xs?15:18" v-model="blur" thumb-label="always" />
      <div style="display:flex;justify-content:center;align-items:center;">
        <v-btn :loading="loading1" variant="tonal" class="ma-2" @click="reset()">Reset</v-btn>
        <v-btn variant="tonal" class="ma-2" @click="$emit('cancel')">Cancel</v-btn>
        <v-btn :loading="loading2" variant="tonal" class="ma-2" @click="save()">Apply</v-btn>
      </div>
      <v-dialog v-model="colorDialog" width="auto">
        <v-card title="Pick Color">
          <div class="d-flex flex-column">
            <v-color-picker v-model="color[selectColor]" v-model:mode="mode" />
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn text="OK" variant="elevated" @click="colorDialog=false" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
  <v-snackbar :timeout="2000" variant="tonal" rounded="pill" v-model="snackbar">{{ snackbarText }}</v-snackbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useTheme } from '../../composables/useTheme.js'

const emit = defineEmits(['cancel'])
const { xs } = useDisplay()
const { getColorData, setCookie, eraseCookie } = useTheme()

const loading1 = ref(false)
const loading2 = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const color = ref({ themecolor: '', welcometitlecolor: '' })
const brightness = ref(78)
const blur = ref(0)
const selectColor = ref('themecolor')
const colorDialog = ref(false)
const mode = ref('hex')

onMounted(() => {
  const data = getColorData()
  color.value = { ...data.color }
  brightness.value = data.brightness
  blur.value = data.blur
})

function save() {
  loading2.value = true
  setTimeout(() => {
    setCookie('zakodata', { color: color.value, brightness: String(brightness.value), blur: String(blur.value) }, 0.005)
    location.reload()
  }, 600)
}

function reset() {
  loading1.value = true
  setTimeout(() => {
    eraseCookie('zakodata')
    location.reload()
  }, 600)
}
</script>
