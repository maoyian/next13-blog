import React, { useEffect, useState, useRef } from 'react'
import * as three from 'three'
const THREE = three
import { _throttle } from '@/utils/tools'
// 引入扩展库
import { OrbitControls } from 'three/addons/controls/OrbitControls.js' // 控制器
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js' // glf加载器
// 引入gui.js库
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { AxesHelper, Mesh } from 'three'

let domW,
  domH,
  scene, // 场景
  mesh, // 网格
  camera, // 相机
  cameraControls, // 相机控件
  renderer, // 渲染器
  sphere, // 球
  box,
  boxMaterial,
  gridHelper,
  gui,
  guiPosition,
  guiMaterial,
  pointer

const lookToX = 0,
  lookToY = 0,
  lookToZ = 0
const loader = new three.TextureLoader()

const ballPosition = {
  x: 0,
  y: 0,
  z: 0,
}
// 获取世界坐标
const v3 = new three.Vector3() // 创建一个向量

export default function Three() {
  const rootRef = useRef(null)
  pointer = new THREE.Vector2()
  const init = () => {
    // gui
    gui = new GUI()
    guiPosition = gui.addFolder('位置')
    guiMaterial = gui.addFolder('材质')
    // 场景
    domH = rootRef.current.offsetHeight
    domW = rootRef.current.offsetWidth
    scene = new three.Scene()
    // 坐标系
    const axesHelper = new AxesHelper(10000)
    // 光照(环境光)
    const ambientLight = new three.AmbientLight('white', 0.5)
    // 相机
    camera = new three.PerspectiveCamera(60, domW / domH, 1, 10000)
    camera.position.set(1500, 500, 1500)
    camera.lookAt(lookToX, lookToY, lookToZ)
    // 添加场景
    scene.add(camera)
    scene.add(ambientLight)
    scene.add(axesHelper)
    // 渲染器
    renderer = new three.WebGLRenderer({
      antialias: true, // 抗锯齿
    })
    renderer.setPixelRatio(window.devicePixelRatio) // 避免模糊
    renderer.setSize(domW, domH)
    // 相机控件
    cameraControls = new OrbitControls(camera, renderer.domElement)
    // cameraControls.target.set(lookToX, lookToY, lookToZ)
    // cameraControls.addEventListener('change', () => {
    //   console.log('change :>> ', 'change')
    //   renderer.render(scene, camera)
    // })
    renderer.render(scene, camera)
    rootRef.current.append(renderer.domElement)
  }
  const animationBox = () => {
    const clock = new three.Clock()
    let timer = null
    const animate = () => {
      // 渲染间隔
      const spt = clock.getDelta() * 1000 // 毫秒
      mesh.rotateY(0.01)
      renderer.render(scene, camera) // 重新渲染
      // 每秒渲染60次(由设备刷新率决定)
      requestAnimationFrame(animate)
    }
    animate()
  }
  const drawBall = () => {
    const geometry = new three.SphereGeometry(200)
    const material = new THREE.MeshPhongMaterial({
      color: 'green',
      opacity: 0.8,
      transparent: true,
    })
    sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(100, 100, 100)
    console.log('sphere.position.length() :>> ', sphere.position.length())
    sphere.position.normalize()
    console.log('sphere.position.length() :>> ', sphere.position.length())

    guiPosition
      .add(ballPosition, 'x', -1000, 1000)
      .name('ball-x')
      .onChange((v) => {
        sphere.position.set(v, 0, ballPosition.z)
      })
    guiPosition
      .add(ballPosition, 'z', -1000, 1000)
      .name('ball-z')
      .onChange((v) => {
        sphere.position.set(ballPosition.x, 0, v)
      })
    scene.add(sphere)
  }

  const drawAnyGeometry = () => {
    const geometry = new three.BufferGeometry()
    // 添加顶点数据
    const vertices = new Float32Array([
      0, 0, 0, 200, 50, 0, 0, 50, 100, 100, 0, 300, 400, 200, 0, 300, 100, 500,
    ])

    /**
     * 用点模型渲染定义的几何体
     */
    // 三个数据为一组构成一个点
    const attribute = new three.BufferAttribute(vertices, 3)
    geometry.attributes.position = attribute
    const pointMaterial = new three.PointsMaterial({
      color: '#ff4444',
      size: 50,
    })
    const points = new three.Points(geometry, pointMaterial)
    scene.add(points)

    /**
     * 用线模型渲染定义的几何体
     */
    const lineMaterial = new three.LineBasicMaterial({
      color: '#ff4444',
      opacity: 0.8,
      transparent: true,
    })
    // const line = new three.Line(geometry, lineMaterial) // 连线
    const line = new three.LineLoop(geometry, lineMaterial) // 闭合线路
    // const line = new three.LineSegments(geometry, lineMaterial) // 两点组成的线段
    scene.add(line)

    /**
     *用网格模型渲染几何体
     */
    const meshMaterial = new three.MeshBasicMaterial({
      side: three.DoubleSide, // 默认只正面(逆时针方向)可见
    })
    const mesh = new Mesh(geometry, meshMaterial)
    scene.add(mesh)
    /**
     *画一个简单正方形
     */
    const rectVertices = new Float32Array([
      500,
      0,
      0, //
      500,
      500,
      0, //
      1000,
      0,
      0, //
      500,
      500,
      0, //
      1000,
      500,
      0, //
      1000,
      0,
      0,
    ])
    // 缓冲属性对象对点分组
    const reactAttribute = new three.BufferAttribute(rectVertices, 3) // 三个点为一组
    // 绑定几何体和点
    const rectGeometry = new three.BufferGeometry()
    rectGeometry.attributes.position = reactAttribute
    const rectMeshMaterial = new three.MeshBasicMaterial({
      side: three.DoubleSide,
      color: '#999999',
    })
    const rectMesh = new Mesh(rectGeometry, rectMeshMaterial)
    const rectMesh2 = rectMesh.clone()
    rectMesh2.position.y += 600
    scene.add(rectMesh)
    scene.add(rectMesh2)
  }
  // 辅助网格
  const drawGrid = () => {
    const size = 10000
    const divisions = 100 // 分成多少格
    const colorCenterLine = 'white'
    const colorGrid = 'gray'
    const opacity = 0.6
    const transparent = true
    gridHelper = new three.GridHelper(
      size,
      divisions,
      colorCenterLine,
      colorGrid,
      opacity,
      transparent
    )
    scene.add(gridHelper)
  }
  const drawBoxHelper = () => {
    var object = new three.Mesh(box, new three.MeshBasicMaterial(0xff0000))
    var box = new three.BoxHelper(object, 0xffff00)
    scene.add(box)
  }
  const drawBox = () => {
    // 几何体
    box = new three.BoxGeometry(300, 300, 300)
    // 材质
    const material = {
      color: '#00ff00',
      // map: loader.load('textures/img.jpg'),
      opacity: 0.5,
      transparent: true,
    }
    boxMaterial = new three.MeshLambertMaterial(material)
    // 网格
    mesh = new three.Mesh(box, boxMaterial)
    guiMaterial
      .addColor(material, 'color')
      .onChange((v) => {
        console.log('v :>> ', v)
        mesh.material.color.set(v)
      })
      .name('立方体颜色')

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const meshs = new three.Mesh(box, boxMaterial)
        meshs.position.set(i * 350, 0, j * 350)
        scene.add(meshs)
      }
    }
    scene.add(mesh)
  }
  // 添加键盘事件
  const addKeyEvent = () => {
    rootRef.current.addEventListener('focus', () => {
      console.log('focus :>> ')
    })
    rootRef.current.addEventListener('blur', () => {
      console.log('blur :>> ')
    })
    rootRef.current.addEventListener('keydown', (e) => {
      console.log('e.keycode :>> ', e.keyCode)
    })
  }
  const handleMove = () => {}
  useEffect(() => {
    init()
    addKeyEvent()
    drawGrid()
    // drawBoxHelper()
    // drawBox()
    drawBall()
    drawAnyGeometry()
    // animationBox()
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('models/Soldier.glb', function (gltf) {
      console.log('gltf :>> ', gltf)
      gltf.scene.position.set(0, 0, 300)
      scene.add(gltf.scene)
    })
    function move() {
      //   console.log('sphere.positions :>> ', sphere.position.length())
      //   sphere.position.x += 1

      renderer.render(scene, camera)
      requestAnimationFrame(move)
    }
    move()
  }, [])
  return <div tabIndex="0" className="h-full" ref={rootRef}></div>
}
