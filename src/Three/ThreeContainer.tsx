import React, { Component } from 'react'
import * as THREE from 'three'
import PCDLoader from './loader/PCDLoader'

class ThreeContainer extends Component {
  private mount: any
  private scene: any
  private camera: any
  private renderer: any
  private frameId: any

  public componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    scene.add(camera)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    const loader = new PCDLoader()
    loader.load( './models/pcd/binary/Zaghetto.pcd', function ( mesh ) {
      scene.add(mesh)
      const center = mesh.geometry.boundingSphere.center;
    } )

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

  public animate() {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  public renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  public render() {
    return (
      <div
        style={ { width: '400px', height: '400px' } }
        ref={ (mount) => {
          this.mount = mount
        } }
      />
    )
  }
}

export default ThreeContainer
