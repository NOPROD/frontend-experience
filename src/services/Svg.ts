import * as THREE from 'three'
import loadSvg from 'load-svg'
import parsePath from 'extract-svg-path'
import svgMesh3d from 'svg-mesh-3d'
import Complex from 'three-simplicial-complex'

const complex = new Complex(THREE)

// load svg, get all <path> data, convert to mesh, add to Object3D group and return it
export const load = async (path: string) => {
  return new Promise((res, rej) => {
    loadSvg('/logo/paper.svg', (err: any, svg: any) => {
      if (err) rej(err)
      const svgPath = parsePath.parse(svg)
      const svgMesh = svgMesh3d(svgPath, {
        delaunay: false,
        scale: 4
      })
      const geometry = complex(svgMesh)

      const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: false,
        uniforms: {
          opacity: { value: 1 },
          scale: { value: 0 },
          animate: { value: 0 }
        }
      })

      const mesh = new THREE.Mesh(geometry, material)
      res(mesh)
    })
  })
}
