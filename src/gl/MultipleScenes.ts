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
  private scenesElements: any[] = []

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

  public async init(elem: Element) {
    console.log(elem.dataset)
    //@ts-ignore
    await load(`/logo/${elem.dataset.sceneName}.svg`).then((svgMesh: any) => {
      this.svg = svgMesh
    })
    console.log(this.svg)
    this.canvas = document.createElement('canvas')
    this.renderer = new WebGLRenderer({ canvas: this.canvas, alpha: true })
    //@ts-ignore
    this.renderer.setScissorTest(true)

    this.dataToScene(elem)

    this.addEvents()
  }

  private dataToScene(elem: Element) {
    //@ts-ignore
    const sceneName = elem.dataset.sceneName
    console.log(sceneName)
    const sceneRenderFunction = this.sceneByName(sceneName)

    this.addScene(elem, sceneRenderFunction)
  }

  private makeScene() {
    const scene = new Scene()

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

  private sceneByName(elem: Element) {
    const { scene, camera } = this.makeScene()
    scene.add(this.svg)
    return (elem: any) => {
      camera.updateProjectionMatrix()
      this.renderer.render(scene, camera)
    }
  }

  private render(time: number = 1) {
    time *= 0.001
    console.log(this.scenesElements)
    for (const { elem, ctx } of this.scenesElements) {
      const rect = elem.getBoundingClientRect()
      const { left, right, top, bottom, width, height } = rect
      const rendererCanvas = this.renderer.domElement

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
        //@ts-ignore
        this.renderer.setScissor(0, 0, width, height)
        //@ts-ignore
        this.renderer.setViewport(0, 0, width, height)

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
          width,
          height
        ) // dst rect
      }
    }
    window.requestAnimationFrame(this.render.bind(this))
  }

  private addScene(elem: any, fn: any) {
    const ctx = document.createElement('canvas').getContext('2d')
    elem.appendChild(ctx?.canvas)
    this.scenesElements.push({ elem, ctx, fn })
  }

  private addEvents(): void {
    window.addEventListener(
      'resize',
      onResize.bind(this, this.camera, this.renderer),
      false
    )
  }
}

export const multipleScenes = new MultipleScenes()
