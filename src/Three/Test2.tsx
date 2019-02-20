import React, { Component } from 'react'
import 'three/examples/js/loaders/PCDLoader'
import data from '../data/Zaghetto.pcd'

declare var THREE: any

class Test extends Component {
  private mount: any
  private scene: any
  private camera: any
  private renderer: any
  private frameId: any
  private material: any
  private cube: any

  public componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(
      15,
      width / height,
      0.01,
      40,
    )
    camera.position.x = 0.4
    camera.position.z = -2
    camera.up.set(0, 0, 1)

    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    // const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    // const cube = new THREE.Mesh(geometry, material)
    // console.log(cube)
    const loader = new THREE.PCDLoader()
    loader.load(data, (mesh: any) => {
      console.log(data)
      console.log(mesh)
      scene.add(mesh)
      // const center = mesh.geometry.boundingSphere.center
      // controls.target.set(center.x, center.y, center.z)
      // controls.update()
    })

    // camera.position.z = 4
    // scene.add(cube)
    // renderer.setClearColor('#000000')
    // renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    // this.material = material
    // this.cube = cube

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  public componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  public start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  public stop() {
    cancelAnimationFrame(this.frameId)
  }

  public animate = () => {
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  public renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  public render() {
    return (
      <div
        style={ { width: '800px', height: '800px' } }
        ref={ (mount) => { this.mount = mount} }
      />
    )
  }
}

export default Test
