// import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { Renderer, WebGLRenderer, Color } from 'three'

import { load } from '@/services/Svg'

import { makeScene } from '@/gl'
class MultipleScenes {
  private sceneElements: any[] = []
  private renderer!: Renderer

  /**
   * @param elements all scene.name from vue file
   */
  public async init(elements: NodeListOf<Element>): Promise<boolean> {
    return new Promise(res => {
      const canvas = document.createElement('canvas')
      this.renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        preserveDrawingBuffer: true
      })

      elements.forEach(async (elem: Element) => {
        await this.toSceneElements(elem)
      })

      res(true)
    })
  }

  /**
   * init scene with default params
   * load svg by scene.name
   * @return renderer function
   */
  private async sceneInit(elem: Element) {
    const { scene, camera } = makeScene()
    scene.background = new Color(0xb0b0b0)
    //@ts-ignore
    await load(`/logo/${elem.dataset.sceneName}.svg`).then((svgMesh: any) => {
      scene.add(svgMesh)
    })
    return () => {
      camera.updateProjectionMatrix()
      this.renderer.render(scene, camera)
    }
  }

  private async toSceneElements(elem: Element) {
    const sceneRender = await this.sceneInit(elem)
    const ctx = document.createElement('canvas').getContext('2d')
    elem.appendChild(ctx?.canvas)
    this.sceneElements.push({ elem, ctx, sceneRender })
  }

  /**
   * Get all scenes with canvas
   * set scenes size
   * copy scene render to canvas
   * animate
   */
  public render(time?: number) {
    for (const { elem, ctx, sceneRender } of this.sceneElements) {
      // get the viewport relative position of this element
      const rect = elem.getBoundingClientRect()
      var { left, right, top, bottom, width, height } = rect
      const rendererCanvas = this.renderer.domElement
      width = 30
      height = 30
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
          width,
          height
        ) // dst rect
      }
    }

    requestAnimationFrame(this.render.bind(this))
  }
}

export const multipleScenes = new MultipleScenes()
