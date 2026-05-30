<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useConfig } from '../composables/useConfig.js'

Chart.register(...registerables)

const config = useConfig()
const canvasRef = ref(null)

onMounted(() => {
  const { skills, skillPoints } = config.polarChart
  const ctx = canvasRef.value.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(94, 158, 255, 0.35)')
  gradient.addColorStop(0.5, 'rgba(168, 130, 255, 0.25)')
  gradient.addColorStop(1, 'rgba(94, 158, 255, 0.1)')

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: skills,
      datasets: [{
        label: '',
        data: skillPoints,
        backgroundColor: gradient,
        borderColor: 'rgba(148, 180, 255, 0.85)',
        borderWidth: 2.5,
        pointBackgroundColor: skillPoints.map(v =>
          v >= 90 ? 'rgba(168, 130, 255, 0.9)' :
          v >= 80 ? 'rgba(94, 158, 255, 0.9)' :
          'rgba(255, 255, 255, 0.5)'
        ),
        pointBorderColor: 'transparent',
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#fff',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,15,0.9)',
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.8)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: ctx => `${ctx.label}: ${ctx.raw}`,
          },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            display: false,
            stepSize: 20,
          },
          pointLabels: {
            color: 'rgba(255,255,255,0.75)',
            font: { size: 12, family: 'PingFang SC, Microsoft YaHei, sans-serif', weight: '500' },
            padding: 12,
          },
          grid: {
            color: 'rgba(255,255,255,0.12)',
            lineWidth: 1,
          },
          angleLines: {
            color: 'rgba(255,255,255,0.1)',
            lineWidth: 1,
          },
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart',
      },
    },
  })
})
</script>
