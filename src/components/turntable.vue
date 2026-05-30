<template>
  <div class="cosmos" :style="{'--c1':color1,'--c2':color2}">
    <div class="starfield"></div>
    <div class="core-dot"></div>
    <div class="ring ring-1"></div>
    <div class="ring ring-2"></div>
    <div class="ring ring-3"></div>
    <div class="ring ring-4"></div>
    <div class="ring ring-5"></div>
    <div class="ring ring-6"></div>
    <div class="dot d1"></div>
    <div class="dot d2"></div>
    <div class="dot d3"></div>
    <div class="dot d4"></div>
    <div class="dot d5"></div>
    <div class="dot d6"></div>
    <div class="dot d7"></div>
    <div class="dot d8"></div>
    <!-- firework sparks -->
    <div class="spark s1"></div>
    <div class="spark s2"></div>
    <div class="spark s3"></div>
    <div class="spark s4"></div>
    <div class="spark s5"></div>
    <div class="spark s6"></div>
    <div class="spark s7"></div>
    <div class="spark s8"></div>
    <div class="spark s9"></div>
    <div class="spark s10"></div>
    <div class="spark s11"></div>
    <div class="spark s12"></div>
  </div>
</template>

<script setup>
defineProps({
  color1: { type: String, default: '#64B5F6' },
  color2: { type: String, default: '#CE93D8' },
})
</script>

<style scoped>
.cosmos {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0.5rem auto -0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.starfield {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 55% 12%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 72% 58%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 82% 22%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 62% 78%, rgba(255,255,255,0.3), transparent);
  border-radius: 50%;
}

.core-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 20px rgba(255,255,255,0.9), 0 0 45px var(--c1), 0 0 90px var(--c2);
  z-index: 10;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all 0.5s ease;
}
.ring-1 { width: 62px; height: 62px; border-top-color: var(--c1); animation: ringSpin 2s linear infinite; }
.ring-2 { width: 96px; height: 96px; border-right-color: var(--c2); animation: ringSpin 3s linear infinite reverse; }
.ring-3 { width: 132px; height: 132px; border-left-color: var(--c1); border-bottom-color: rgba(255,255,255,0.2); animation: ringSpin 4s linear infinite; }
.ring-4 { width: 170px; height: 170px; border-top-color: rgba(255,255,255,0.18); border-right-color: var(--c2); animation: ringSpin 5s linear infinite reverse; }
.ring-5 { width: 210px; height: 210px; border-bottom-color: var(--c1); border-left-color: rgba(255,255,255,0.12); animation: ringSpin 6.5s linear infinite; }
.ring-6 { width: 250px; height: 250px; border-top-color: rgba(255,255,255,0.1); border-right-color: var(--c2); animation: ringSpin 8s linear infinite reverse; }

.dot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 5px var(--c1), 0 0 12px var(--c2);
  transition: all 0.4s ease;
}
.d1 { animation: orbit1 2.5s linear infinite; }
.d2 { animation: orbit2 3.5s linear infinite; }
.d3 { animation: orbit3 3s linear infinite; }
.d4 { animation: orbit4 4.5s linear infinite; }
.d5 { animation: orbit5 5s linear infinite; }
.d6 { animation: orbit6 4s linear infinite; }
.d7 { animation: orbit7 5.5s linear infinite; }
.d8 { animation: orbit8 6s linear infinite; }

/* Firework sparks - hidden by default */
.spark {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--c1);
  box-shadow: 0 0 6px var(--c1);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
/* HOVER: explosion */
.cosmos:hover .core-dot {
  width: 28px; height: 28px;
  box-shadow: 0 0 50px #fff, 0 0 100px var(--c1), 0 0 200px var(--c2), 0 0 300px rgba(255,255,255,0.5);
}
.cosmos:hover .ring-1 { width: 100px; height: 100px; opacity: 0.3; }
.cosmos:hover .ring-2 { width: 150px; height: 150px; opacity: 0.25; }
.cosmos:hover .ring-3 { width: 200px; height: 200px; opacity: 0.2; }
.cosmos:hover .ring-4 { width: 250px; height: 250px; opacity: 0.12; }
.cosmos:hover .ring-5 { width: 300px; height: 300px; opacity: 0.06; }
.cosmos:hover .ring-6 { width: 350px; height: 350px; opacity: 0.03; }
.cosmos:hover .dot { opacity: 0; }

/* Firework sparks explode outward */
.cosmos:hover .s1  { opacity: 1; transform: translate(0, -145px); background: #fff; box-shadow: 0 0 10px #fff, 0 0 20px var(--c1); }
.cosmos:hover .s2  { opacity: 1; transform: translate(100px, -100px); transition-delay: 0.03s; }
.cosmos:hover .s3  { opacity: 1; transform: translate(145px, 0); transition-delay: 0.06s; background: var(--c2); box-shadow: 0 0 10px var(--c2); }
.cosmos:hover .s4  { opacity: 1; transform: translate(100px, 100px); transition-delay: 0.02s; }
.cosmos:hover .s5  { opacity: 1; transform: translate(0, 145px); transition-delay: 0.05s; background: #fff; }
.cosmos:hover .s6  { opacity: 1; transform: translate(-100px, 100px); transition-delay: 0.04s; }
.cosmos:hover .s7  { opacity: 1; transform: translate(-145px, 0); transition-delay: 0.07s; background: var(--c2); box-shadow: 0 0 10px var(--c2); }
.cosmos:hover .s8  { opacity: 1; transform: translate(-100px, -100px); transition-delay: 0.01s; }
.cosmos:hover .s9  { opacity: 1; transform: translate(60px, -130px); transition-delay: 0.08s; width: 4px; height: 4px; }
.cosmos:hover .s10 { opacity: 1; transform: translate(130px, 60px); transition-delay: 0.09s; width: 5px; height: 5px; background: #fff; }
.cosmos:hover .s11 { opacity: 1; transform: translate(-60px, 130px); transition-delay: 0.04s; width: 4px; height: 4px; }
.cosmos:hover .s12 { opacity: 1; transform: translate(-130px, -60px); transition-delay: 0.07s; width: 5px; height: 5px; background: var(--c2); }

@keyframes ringSpin { 100% { transform: rotate(360deg); } }

@keyframes orbit1 { 0% { transform: rotate(0deg) translateX(48px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(48px) rotate(-360deg); } }
@keyframes orbit2 { 0% { transform: rotate(45deg) translateX(64px) rotate(-45deg); } 100% { transform: rotate(405deg) translateX(64px) rotate(-405deg); } }
@keyframes orbit3 { 0% { transform: rotate(90deg) translateX(60px) rotate(-90deg); } 100% { transform: rotate(450deg) translateX(60px) rotate(-450deg); } }
@keyframes orbit4 { 0% { transform: rotate(135deg) translateX(72px) rotate(-135deg); } 100% { transform: rotate(495deg) translateX(72px) rotate(-495deg); } }
@keyframes orbit5 { 0% { transform: rotate(180deg) translateX(56px) rotate(-180deg); } 100% { transform: rotate(540deg) translateX(56px) rotate(-540deg); } }
@keyframes orbit6 { 0% { transform: rotate(225deg) translateX(76px) rotate(-225deg); } 100% { transform: rotate(585deg) translateX(76px) rotate(-585deg); } }
@keyframes orbit7 { 0% { transform: rotate(270deg) translateX(68px) rotate(-270deg); } 100% { transform: rotate(630deg) translateX(68px) rotate(-630deg); } }
@keyframes orbit8 { 0% { transform: rotate(315deg) translateX(62px) rotate(-315deg); } 100% { transform: rotate(675deg) translateX(62px) rotate(-675deg); } }
</style>
