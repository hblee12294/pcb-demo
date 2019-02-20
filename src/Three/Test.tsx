import React, { Component } from 'react'
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
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material)
    console.log(cube)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

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
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  public renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  public render() {
    return (
      <div
        style={ { width: '400px', height: '400px' } }
        ref={ (mount) => { this.mount = mount } }
      />
    )
  }
}

export default Test
