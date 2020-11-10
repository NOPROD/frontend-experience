import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  ShapeBufferGeometry
} from 'three'
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader.js'

const loader = new SVGLoader()

// load svg, get all <path> data, convert to mesh, add to Object3D group and return it
export const load = async (path: string) => {
  return new Promise((res, rej) => {
    loader.load(
      path,
      (data: SVGResult) => {
        if (data.paths.length === 0) throw 'Error on load'
        const paths = data.paths
        const group = new Group()

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i]

          const material = new MeshBasicMaterial({
            color: path.color,
            side: DoubleSide,
            depthWrite: false
          })

          const shapes = path.toShapes(true)

          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j]
            const geo = new ShapeBufferGeometry(shape)

            const mesh = new Mesh(geo, material)

            group.add(mesh)
          }
        }
        res(group)
      },
      (progress: ProgressEvent<EventTarget>) => {
        console.log((progress.loaded / progress.total) * 100 + '% loaded')
      },
      (err: ErrorEvent) => {
        rej(err)
      }
    )
  })
}
