<template>
  <div class="flex-col"><canvas :id="`lg_svg_${this.path}`"></canvas></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  import { WaveMotion } from '@/gl/WaveMotion'

  import { load } from '@/services/Svg'

  import { onResize } from '@/gl-utils'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  // import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
  import {
    Clock,
    DoubleSide,
    Mesh,
    PerspectiveCamera,
    PlaneGeometry,
    Renderer,
    Scene,
    ShaderMaterial,
    SpotLight,
    TextureLoader,
    WebGLRenderer,
    Color,
    Group,
    GridHelper
  } from 'three'

  @Component
  export default class SvgComponent extends Vue {
    @Prop()
    public path!: string

    private id!: string

    private scene!: Scene
    private camera!: PerspectiveCamera
    private renderer!: Renderer
    private clock!: Clock
    private controls!: OrbitControls
    private geometry!: PlaneGeometry
    private material!: ShaderMaterial
    private mesh!: Mesh

    private light!: SpotLight

    private svg!: Group

    async mounted() {
      this.id = `lg_svg_${this.path}`

      await load(this.path).then((svgMesh: any) => {
        this.svg = svgMesh
      })
      this.init(this.id)
      this.addObjects()

      this.addEvents()
      this.run()
    }

    public run() {
      window.requestAnimationFrame(this.run.bind(this))
      this.renderer.render(this.scene, this.camera)
    }

    private init(id: string) {
      this.scene = new Scene()
      this.scene.background = new Color(0xb0b0b0)
      this.light = new SpotLight(0xffffff)
      this.light.intensity = 100

      this.camera = new PerspectiveCamera(45, 500 / 500, 0.1, 1000)
      this.camera.position.set(0, 0, -5)
      this.renderer = new WebGLRenderer({
        //@ts-ignore
        canvas: document.getElementById(id),
        antialias: true,
        preserveDrawingBuffer: true
      })
      this.renderer.setSize(500, 500)
      //@ts-ignore
      this.renderer.setClearColor(0xffffff, 1)

      this.clock = new Clock()
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.update()
    }

    private addObjects() {
      this.scene.add(this.svg)
      this.camera.lookAt(this.svg.position)
      this.scene.add(this.light)
      const helper = new GridHelper(500, 500)
      this.scene.add(helper)
    }

    private addEvents(): void {
      window.addEventListener(
        'resize',
        onResize.bind(this, this.camera, this.renderer),
        false
      )
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
