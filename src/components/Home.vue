<template>
  <div class="flex-col">
    <ScenesComponent :scenesData="logos" /><canvas id="logo"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  import { WaveMotion } from '@/gl/WaveMotion'

  import { load } from '@/services/Svg'

  import ScenesComponent from './gl/Scenes.vue'
  import { Scenes } from '@/models'

  @Component({ components: { ScenesComponent } })
  export default class Home extends Vue {
    public logos: Scenes[] = [{ name: 'paper' }, { name: 'paper' }]

    mounted() {
      // var wave = new WaveMotion()
      // wave.init()
      // wave.run()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
