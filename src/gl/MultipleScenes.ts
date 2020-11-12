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
  GridHelper,
  DirectionalLight
} from 'three'

import { load } from '@/services/Svg'
class MultipleScenes {
  private sceneElements: any[] = []

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

  private canvas!: HTMLCanvasElement

  public init(elements: NodeListOf<Element>) {
    const canvas = document.createElement('canvas')
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      preserveDrawingBuffer: true
    })

    elements.forEach(async (elem: Element) => {
      const sceneRender = await this.sceneInit(elem)
      const ctx = document.createElement('canvas').getContext('2d')
      elem.appendChild(ctx?.canvas)
      this.sceneElements.push({ elem, ctx, sceneRender })
    })
  }

  private async sceneInit(elem: Element) {
    const { scene, camera } = this.makeScene(elem)
    scene.background = new Color(0xb0b0b0)
    //@ts-ignore
    await load(`/logo/${elem.dataset.sceneName}.svg`).then((svgMesh: any) => {
      scene.add(svgMesh)
    })
    console.log(scene)
    return () => {
      camera.updateProjectionMatrix()
      this.renderer.render(scene, camera)
    }
  }

  private makeScene(elem: Element) {
    const scene = new Scene()
    scene.background = new Color(0xb0b0b0)

    const fov = 45
    const aspect = 2
    const near = 0.1
    const far = 5
    const camera = new PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 1, 2)
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    {
      const color = 0xffffff
      const intensity = 1
      const light = new DirectionalLight(color, intensity)
      light.position.set(-1, 2, 4)
      camera.add(light)
    }

    return { scene, camera }
  }

  public render(time?: number) {
    time *= 0.001

    for (const { elem, ctx, sceneRender } of this.sceneElements) {
      // get the viewport relative position of this element
      const rect = elem.getBoundingClientRect()
      var { left, right, top, bottom, width, height } = rect
      const rendererCanvas = this.renderer.domElement
      width = 500
      height = 500
      const isOffscreen =
        bottom < 0 ||
        top > window.innerHeight ||
        right < 0 ||
        left > window.innerWidth

      if (!isOffscreen) {
        // make sure the renderer's canvas is big enough
        if (rendererCanvas.width < width || rendererCanvas.height < height) {
          this.renderer.setSize(width, height, false)
        }

        // make sure the canvas for this area is the same size as the area
        if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
          ctx.canvas.width = width
          ctx.canvas.height = height
        }

        this.renderer.setScissor(0, 0, width, height)
        this.renderer.setViewport(0, 0, width, height)

        sceneRender()

        // copy the rendered scene to this element's canvas
        ctx.globalCompositeOperation = 'copy'
        ctx.drawImage(
          rendererCanvas,
          0,
          rendererCanvas.height - height,
          width,
          height, // src rect
          0,
          0,
          500,
          500
        ) // dst rect
      }
    }

    requestAnimationFrame(this.render.bind(this))
  }
}

export const multipleScenes = new MultipleScenes()
