<template>
  <div class="flex-col">
    <div v-if="load">load</div>
    <div
      v-for="(scene, key) in scenesData"
      :key="key"
      :data-scene-name="`${scene.name}`"
      class="scene"
    ></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Scenes } from '@/models'

  import { multipleScenes } from '@/gl/MultipleScenes'

  @Component
  export default class SvgComponent extends Vue {
    @Prop()
    public scenesData!: Scenes[]

    public load: boolean = true

    mounted() {
      console.time('init')
      console.time('outsideinit')
      multipleScenes
        .init(document.querySelectorAll('[data-scene-name]'))
        .then(() => {
          multipleScenes.render()
        })
      console.timeEnd('outsideinit')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .scene {
    width: 500;
    height: 500;
  }
</style>
