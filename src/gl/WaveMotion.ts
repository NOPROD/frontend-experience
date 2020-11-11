import { onResize } from '@/gl-utils'
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
  Vector2,
  BoxGeometry,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Noise from './glsl/vertex/Noise.glsl'
import Wave from './glsl/fragments/Wave.glsl'

import SpaceFog from './glsl/fragments/SpaceFog.glsl'
import Starfield from './glsl/vertex/Starfield.glsl'

export class WaveMotion {
  private scene!: Scene
  private camera!: PerspectiveCamera
  private renderer!: Renderer
  private clock!: Clock
  private controls!: OrbitControls
  private geometry!: PlaneGeometry
  private material!: ShaderMaterial
  private mesh!: Mesh

  private light!: SpotLight

  constructor() {
    this.scene = new Scene()
    this.light = new SpotLight(0xffffff)
    this.light.position.set(0, 0, 1)
    this.light.intensity = 100

    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    this.camera.position.z = -1

    this.renderer = new WebGLRenderer({
      //@ts-ignore
      canvas: document.getElementById('logo'),
      antialias: true
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    //@ts-ignore
    this.renderer.setClearColor(0xffffff, 1)

    this.clock = new Clock()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  public init() {
    this.createMesh()
    this.addEvents()
  }

  public run() {
    window.requestAnimationFrame(this.run.bind(this))
    this.material.uniforms.uTime.value = this.clock.getElapsedTime()
    this.renderer.render(this.scene, this.camera)
  }

  private createMesh() {
    this.geometry = new BoxGeometry(200, 200, 1)
    this.material = new ShaderMaterial({
      vertexShader: Starfield,
      fragmentShader: SpaceFog,
      uniforms: {
        uTime: { value: 0.0 }
      },
      // wireframe: true,
      side: DoubleSide
    })
    this.mesh = new Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
    this.scene.add(this.light)
    this.light.lookAt(this.mesh.position)
  }

  private addEvents(): void {
    window.addEventListener(
      'resize',
      onResize.bind(this, this.camera, this.renderer),
      false
    )
  }
}
