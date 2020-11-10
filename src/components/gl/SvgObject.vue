<template>
  <div class="flex-col"><canvas :id="`lg_svg_${this.path}`"></canvas></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  import { WaveMotion } from '@/gl/WaveMotion'

  import { load } from '@/services/Svg'

  @Component
  export default class SvgComponent extends Vue {
    @Prop()
    public path!: string

    mounted() {
      // var wave = new WaveMotion()
      // wave.init()
      // wave.run()
      load(this.path).then(console.log)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
