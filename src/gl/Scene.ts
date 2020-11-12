import { Color, DirectionalLight, PerspectiveCamera, Scene } from 'three'

/**
 * make scene with default params
 * add camera and light, look at center
 * @return scene, camera
 */
export const makeScene = () => {
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
