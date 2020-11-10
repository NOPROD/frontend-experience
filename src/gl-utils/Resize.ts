import { PerspectiveCamera, Renderer } from 'three'

export const onResize = (camera: PerspectiveCamera, renderer: Renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
