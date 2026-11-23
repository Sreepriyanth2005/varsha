import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RotateCw, ZoomIn, ZoomOut, Sparkles, Layers, Info } from 'lucide-react'

export interface Preset3D {
  id: string
  name: string
  category: string
  liquidColor: string
  capColor: string
  labelTitle: string
  subtitle: string
  volumeText: string
  type: 'bottle' | 'drum'
  features: string[]
}

export const presets3D: Preset3D[] = [
  {
    id: 'citrus',
    name: 'VarshaPure Citrus Cleaner',
    category: 'Floor Cleaner',
    liquidColor: '#E3C058', // Mustard Yellow
    capColor: '#7D2D76', // Brand Purple
    labelTitle: 'VarshaPure',
    subtitle: 'Citrus Fresh Disinfectant',
    volumeText: '1000 ML (1L)',
    type: 'bottle',
    features: ['99.9% Proven Germ Kill', 'Active botanical citrus', 'Streak-free glossy shine'],
  },
  {
    id: 'ocean',
    name: 'VarshaTide Bio-Enzyme Liquid',
    category: 'Washing Liquid',
    liquidColor: '#3B82F6', // Ocean Blue
    capColor: '#56344F', // Deep Plum
    labelTitle: 'VarshaTide',
    subtitle: 'Quad-Enzyme Laundry Care',
    volumeText: '1500 ML (1.5L)',
    type: 'bottle',
    features: ['Cold Water 20°C Stains', 'Zero residue on darks', 'Fabric conditioning'],
  },
  {
    id: 'pine',
    name: 'VarshaShield Herbal Pine',
    category: 'Disinfectant',
    liquidColor: '#10B981', // Emerald Pine
    capColor: '#D2AE34', // Golden Yellow
    labelTitle: 'VarshaShield',
    subtitle: 'Pure Alpine Pine Disinfectant',
    volumeText: '5000 ML (5L)',
    type: 'bottle',
    features: ['Distilled Pine Oil', 'Anti-insect aroma', 'Hospital grade formulation'],
  },
  {
    id: 'lavender',
    name: 'VarshaGentleCare Woolens',
    category: 'Delicate Care',
    liquidColor: '#EE6B8B', // Brand Pink
    capColor: '#7D2D76', // Brand Purple
    labelTitle: 'VarshaGentle',
    subtitle: 'Silk & Woolens Neutral Wash',
    volumeText: '1000 ML (1L)',
    type: 'bottle',
    features: ['Hypoallergenic Aloe Extract', 'Zero Bleach or Enzymes', 'Keratin fiber protection'],
  },
  {
    id: 'drum',
    name: 'VarshaSurf SLES 70% Drum',
    category: 'Specialty Chemical',
    liquidColor: '#0284C7', // Industrial Blue
    capColor: '#1E293B', // Charcoal Steel
    labelTitle: 'VarshaSurf SLES 70%',
    subtitle: 'High-Active Raw Surfactant',
    volumeText: '170 KG HDPE Drum',
    type: 'drum',
    features: ['70% Active Surfactant', 'Low 1,4-Dioxane <15 ppm', 'Heavy Duty Tight-Head Drum'],
  },
]

interface ProductViewer3DProps {
  presetId?: string
  height?: string
  showControls?: boolean
  autoRotateInit?: boolean
  className?: string
  onPresetChange?: (preset: Preset3D) => void
}

export default function ProductViewer3D({
  presetId = 'citrus',
  height = '500px',
  showControls = true,
  autoRotateInit = true,
  className = '',
  onPresetChange,
}: ProductViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePreset, setActivePreset] = useState<Preset3D>(
    presets3D.find((p) => p.id === presetId) || presets3D[0]
  )
  const [autoRotate, setAutoRotate] = useState(autoRotateInit)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  // References to three objects to update colors without reconstructing scene
  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null)
  const capMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const labelTextureRef = useRef<THREE.CanvasTexture | null>(null)
  const labelMeshRef = useRef<THREE.Mesh | null>(null)
  const bottleGroupRef = useRef<THREE.Group | null>(null)
  const drumGroupRef = useRef<THREE.Group | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  // Function to create dynamic label texture via canvas
  const createLabelTexture = (preset: Preset3D) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')
    if (!ctx) return new THREE.CanvasTexture(canvas)

    // Background gradient with brand colors
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024)
    grad.addColorStop(0, '#FAF8FC')
    grad.addColorStop(0.5, '#FFFFFF')
    grad.addColorStop(1, '#F3E8FF')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 1024, 1024)

    // Border Frame
    ctx.strokeStyle = '#7D2D76'
    ctx.lineWidth = 24
    ctx.strokeRect(30, 30, 964, 964)

    // Top Header Banner
    ctx.fillStyle = '#7D2D76'
    ctx.fillRect(50, 50, 924, 160)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 54px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('VARSHA PRODUCTS', 512, 140)

    ctx.fillStyle = '#E3C058'
    ctx.font = 'bold 26px system-ui, sans-serif'
    ctx.fillText('PREMIUM HYGIENE & CHEMICAL FORMULATIONS', 512, 185)

    // Brand Title
    ctx.fillStyle = '#2B2430'
    ctx.font = '900 80px system-ui, sans-serif'
    ctx.fillText(preset.labelTitle, 512, 380)

    // Subtitle
    ctx.fillStyle = '#EE6B8B'
    ctx.font = 'bold 38px system-ui, sans-serif'
    ctx.fillText(preset.subtitle, 512, 450)

    // Badge
    ctx.fillStyle = '#FAF8FC'
    ctx.strokeStyle = '#DDCFE6'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.roundRect(160, 520, 704, 140, 24)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#7D2D76'
    ctx.font = 'bold 36px system-ui, sans-serif'
    ctx.fillText('★ 99.9% GERMICIDAL ASSURANCE ★', 512, 580)
    ctx.fillStyle = '#77717B'
    ctx.font = '28px system-ui, sans-serif'
    ctx.fillText('Laboratory Verified • Eco-Safe Surfactants', 512, 630)

    // Volume footer bar
    ctx.fillStyle = '#56344F'
    ctx.fillRect(50, 840, 924, 130)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 44px system-ui, sans-serif'
    ctx.fillText(`NET CONTENT: ${preset.volumeText}`, 512, 920)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }

  // Handle Preset change
  const handleSelectPreset = (p: Preset3D) => {
    setActivePreset(p)
    if (onPresetChange) onPresetChange(p)

    // Update 3D materials dynamically
    if (liquidMaterialRef.current) {
      liquidMaterialRef.current.color.set(p.liquidColor)
    }
    if (capMaterialRef.current) {
      capMaterialRef.current.color.set(p.capColor)
    }

    // Update label texture
    if (labelMeshRef.current) {
      const newTexture = createLabelTexture(p)
      if (labelMeshRef.current.material instanceof THREE.MeshStandardMaterial) {
        labelMeshRef.current.material.map = newTexture
        labelMeshRef.current.material.needsUpdate = true
      }
    }

    // Toggle container visibility (Bottle vs Drum)
    if (bottleGroupRef.current && drumGroupRef.current) {
      if (p.type === 'drum') {
        bottleGroupRef.current.visible = false
        drumGroupRef.current.visible = true
      } else {
        bottleGroupRef.current.visible = true
        drumGroupRef.current.visible = false
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene
    const scene = new THREE.Scene()
    scene.background = null // Transparent for background blend

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0.4, 4.2)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(4, 5, 5)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    scene.add(keyLight)

    // Purple & Pink Studio Rim Lights
    const purpleRim = new THREE.PointLight(0x7d2d76, 2.8, 10)
    purpleRim.position.set(-4, 2, -2)
    scene.add(purpleRim)

    const goldFill = new THREE.PointLight(0xe3c058, 2.2, 10)
    goldFill.position.set(3, -2, 2)
    scene.add(goldFill)

    // Master Pivot Group
    const masterPivot = new THREE.Group()
    scene.add(masterPivot)

    // ───────────────────────────────────────────────
    // 1. BOTTLE CONTAINER (Contoured Ergonomic Bottle)
    // ───────────────────────────────────────────────
    const bottleGroup = new THREE.Group()
    bottleGroupRef.current = bottleGroup
    masterPivot.add(bottleGroup)

    // Outer Translucent Bottle Shell
    const bottlePoints = [
      new THREE.Vector2(0, -1.3),
      new THREE.Vector2(0.68, -1.3),
      new THREE.Vector2(0.72, -1.25),
      new THREE.Vector2(0.72, 0.2),
      new THREE.Vector2(0.66, 0.5),
      new THREE.Vector2(0.5, 0.8),
      new THREE.Vector2(0.24, 1.05),
      new THREE.Vector2(0.24, 1.3),
      new THREE.Vector2(0.26, 1.32),
      new THREE.Vector2(0.22, 1.34),
    ]
    const bottleGeo = new THREE.LatheGeometry(bottlePoints, 48)
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.82,
      opacity: 1,
      transparent: true,
      roughness: 0.12,
      metalness: 0.05,
      ior: 1.45,
      reflectivity: 0.7,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    })
    const bottleMesh = new THREE.Mesh(bottleGeo, bottleMat)
    bottleMesh.castShadow = true
    bottleGroup.add(bottleMesh)

    // Inner Liquid Core
    const liquidPoints = [
      new THREE.Vector2(0, -1.25),
      new THREE.Vector2(0.65, -1.25),
      new THREE.Vector2(0.68, -1.2),
      new THREE.Vector2(0.68, 0.15),
      new THREE.Vector2(0.62, 0.45),
      new THREE.Vector2(0.46, 0.75),
      new THREE.Vector2(0.21, 0.95),
      new THREE.Vector2(0, 0.95),
    ]
    const liquidGeo = new THREE.LatheGeometry(liquidPoints, 48)
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activePreset.liquidColor),
      transmission: 0.55,
      opacity: 0.95,
      transparent: true,
      roughness: 0.15,
      ior: 1.33,
      metalness: 0.1,
    })
    liquidMaterialRef.current = liquidMat
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat)
    bottleGroup.add(liquidMesh)

    // Floating Bio-Enzyme Bubbles inside liquid
    const bubbleGeo = new THREE.SphereGeometry(0.025, 8, 8)
    const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 })
    const bubblesCount = 28
    const bubbles = new THREE.InstancedMesh(bubbleGeo, bubbleMat, bubblesCount)
    const dummy = new THREE.Object3D()
    const bubbleSpeeds: number[] = []

    for (let i = 0; i < bubblesCount; i++) {
      const radius = Math.random() * 0.5
      const angle = Math.random() * Math.PI * 2
      const y = -1.1 + Math.random() * 1.8
      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
      dummy.scale.setScalar(0.5 + Math.random() * 1.2)
      dummy.updateMatrix()
      bubbles.setMatrixAt(i, dummy.matrix)
      bubbleSpeeds.push(0.003 + Math.random() * 0.006)
    }
    bottleGroup.add(bubbles)

    // Bottle Cap (Screw/Twist Top with ribbed grip)
    const capGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.32, 32)
    const capMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activePreset.capColor),
      roughness: 0.3,
      metalness: 0.2,
    })
    capMaterialRef.current = capMat
    const capMesh = new THREE.Mesh(capGeo, capMat)
    capMesh.position.y = 1.46
    capMesh.castShadow = true
    bottleGroup.add(capMesh)

    // Cap Ring Detail
    const capRingGeo = new THREE.TorusGeometry(0.28, 0.025, 12, 32)
    const capRing = new THREE.Mesh(capRingGeo, capMat)
    capRing.rotation.x = Math.PI / 2
    capRing.position.y = 1.31
    bottleGroup.add(capRing)

    // Front Cylindrical Product Label
    const labelGeo = new THREE.CylinderGeometry(0.725, 0.725, 1.1, 48, 1, true, -Math.PI / 3.2, (2 * Math.PI) / 3.2)
    const initialLabelTex = createLabelTexture(activePreset)
    labelTextureRef.current = initialLabelTex
    const labelMat = new THREE.MeshStandardMaterial({
      map: initialLabelTex,
      roughness: 0.25,
      metalness: 0.05,
      side: THREE.DoubleSide,
    })
    const labelMesh = new THREE.Mesh(labelGeo, labelMat)
    labelMesh.position.y = -0.3
    labelMeshRef.current = labelMesh
    bottleGroup.add(labelMesh)

    // Ergonomic Bottle Handle
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.68, 0.3, 0),
      new THREE.Vector3(0.98, 0.0, 0),
      new THREE.Vector3(0.98, -0.6, 0),
      new THREE.Vector3(0.68, -0.9, 0),
    ])
    const handleGeo = new THREE.TubeGeometry(handleCurve, 20, 0.08, 12, false)
    const handleMesh = new THREE.Mesh(handleGeo, bottleMat)
    bottleGroup.add(handleMesh)

    // ───────────────────────────────────────────────
    // 2. INDUSTRIAL DRUM CONTAINER (for SLES & LABSA)
    // ───────────────────────────────────────────────
    const drumGroup = new THREE.Group()
    drumGroupRef.current = drumGroup
    drumGroup.visible = activePreset.type === 'drum'
    masterPivot.add(drumGroup)

    const drumBodyGeo = new THREE.CylinderGeometry(0.9, 0.9, 2.2, 48)
    const drumMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Industrial Blue HDPE
      roughness: 0.35,
      metalness: 0.15,
    })
    const drumMesh = new THREE.Mesh(drumBodyGeo, drumMat)
    drumMesh.castShadow = true
    drumGroup.add(drumMesh)

    // Ribbed reinforcement rings for drum
    const drumRingsY = [-0.6, -0.1, 0.4]
    drumRingsY.forEach((y) => {
      const ringGeo = new THREE.TorusGeometry(0.91, 0.035, 12, 48)
      const ring = new THREE.Mesh(ringGeo, drumMat)
      ring.rotation.x = Math.PI / 2
      ring.position.y = y
      drumGroup.add(ring)
    })

    // Drum Bung / Cap Plugs
    const bungGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.06, 24)
    const bungMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 })
    const bung1 = new THREE.Mesh(bungGeo, bungMat)
    bung1.position.set(0.45, 1.12, 0.2)
    const bung2 = new THREE.Mesh(bungGeo, bungMat)
    bung2.position.set(-0.45, 1.12, -0.2)
    drumGroup.add(bung1, bung2)

    // Drum Hazchem / Brand Label
    const drumLabelGeo = new THREE.CylinderGeometry(0.92, 0.92, 1.0, 48, 1, true, -Math.PI / 3, (2 * Math.PI) / 3)
    const drumLabel = new THREE.Mesh(drumLabelGeo, labelMat)
    drumLabel.position.y = 0.1
    drumGroup.add(drumLabel)

    // Floor Pedestal Shadow Plane
    const shadowGeo = new THREE.CircleGeometry(1.4, 48)
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.18,
    })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = -1.35
    scene.add(shadowMesh)

    // Floating Platform Disc
    const platformGeo = new THREE.CylinderGeometry(1.6, 1.65, 0.08, 48)
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8fc,
      roughness: 0.2,
      metalness: 0.1,
    })
    const platform = new THREE.Mesh(platformGeo, platformMat)
    platform.position.y = -1.4
    platform.receiveShadow = true
    scene.add(platform)

    // ───────────────────────────────────────────────
    // Mouse Interaction & Inertia Drag Rotation
    // ───────────────────────────────────────────────
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let velocityX = 0
    let velocityY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      prevMouseX = e.clientX
      prevMouseY = e.clientY

      masterPivot.rotation.y += deltaX * 0.008
      masterPivot.rotation.x += deltaY * 0.004
      masterPivot.rotation.x = Math.max(-0.4, Math.min(0.4, masterPivot.rotation.x))

      velocityX = deltaX * 0.008
      velocityY = deltaY * 0.004
    }

    const onMouseUp = () => {
      isDragging = false
    }

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - prevMouseX
      const deltaY = e.touches[0].clientY - prevMouseY
      prevMouseX = e.touches[0].clientX
      prevMouseY = e.touches[0].clientY

      masterPivot.rotation.y += deltaX * 0.008
      masterPivot.rotation.x += deltaY * 0.004
      masterPivot.rotation.x = Math.max(-0.4, Math.min(0.4, masterPivot.rotation.x))
    }

    const domEl = renderer.domElement
    domEl.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    domEl.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onMouseUp)

    // Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Auto rotation when enabled and not dragging
      if (autoRotate && !isDragging) {
        masterPivot.rotation.y += 0.008
      } else if (!isDragging) {
        // Inertia damping
        masterPivot.rotation.y += velocityX
        masterPivot.rotation.x += velocityY
        velocityX *= 0.94
        velocityY *= 0.94
      }

      // Gentle floating bob
      masterPivot.position.y = Math.sin(elapsedTime * 1.5) * 0.04

      // Animate bubbles rising inside bottle
      if (bottleGroup.visible) {
        const dummyMatrix = new THREE.Matrix4()
        const dummyPos = new THREE.Vector3()
        const dummyQuat = new THREE.Quaternion()
        const dummyScale = new THREE.Vector3()

        for (let i = 0; i < bubblesCount; i++) {
          bubbles.getMatrixAt(i, dummyMatrix)
          dummyMatrix.decompose(dummyPos, dummyQuat, dummyScale)
          dummyPos.y += bubbleSpeeds[i]
          if (dummyPos.y > 0.9) {
            dummyPos.y = -1.15
          }
          dummyMatrix.compose(dummyPos, dummyQuat, dummyScale)
          bubbles.setMatrixAt(i, dummyMatrix)
        }
        bubbles.instanceMatrix.needsUpdate = true
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      domEl.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      domEl.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onMouseUp)
      renderer.dispose()
      if (container && domEl.parentNode === container) {
        container.removeChild(domEl)
      }
    }
  }, [])

  // Zoom helpers
  const handleZoom = (delta: number) => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(2.6, Math.min(6.0, cameraRef.current.position.z + delta))
    }
  }

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        style={{ height }}
        className="w-full relative cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl"
      >
        {/* Drag Hint overlay */}
        <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-100 flex items-center gap-2 text-xs font-semibold text-[#7D2D76] shadow-sm pointer-events-none">
          <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Interactive 3D • Click &amp; Drag to Rotate</span>
        </div>

        {/* Hotspots Info Toggle */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setActiveHotspot(activeHotspot ? null : 'active')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              activeHotspot ? 'bg-[#7D2D76] text-white' : 'bg-white/90 text-[#2B2430] hover:bg-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            {activeHotspot ? 'Hide Details' : 'Key Specs'}
          </button>
        </div>

        {/* Hotspot Floating Tooltip Overlay */}
        {activeHotspot && (
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm z-20 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-purple-100 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3C058] animate-ping" />
              <h4 className="font-bold text-sm text-[#2B2430]">{activePreset.name}</h4>
            </div>
            <p className="text-xs text-[#77717B] mb-3 leading-relaxed">
              Formulated in ISO 9001:2015 accredited reactors. Equipped with induction leak-proof seals and ergonomic dispensing contour.
            </p>
            <div className="space-y-1.5">
              {activePreset.features.map((f) => (
                <div key={f} className="text-xs text-[#7D2D76] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#E3C058]" /> {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mini 3D Toolbar Controls */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-md border border-gray-100">
          <button
            onClick={() => handleZoom(-0.5)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7D2D76] hover:bg-purple-100 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(0.5)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7D2D76] hover:bg-purple-100 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              autoRotate ? 'bg-[#7D2D76] text-white' : 'text-[#7D2D76] hover:bg-purple-100'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Switcher Bar */}
      {showControls && (
        <div className="w-full mt-4 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2 px-1">
            <Layers className="w-4 h-4 text-[#7D2D76]" />
            <span className="text-xs font-bold text-[#2B2430] uppercase tracking-wider">
              Switch 3D Product Formulation:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {presets3D.map((p) => {
              const isSelected = activePreset.id === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#7D2D76] text-white shadow-sm'
                      : 'bg-[#FAF8FC] text-[#2B2430] hover:bg-purple-50 border border-gray-200'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/50 flex-shrink-0"
                    style={{ backgroundColor: p.liquidColor }}
                  />
                  <span>{p.labelTitle}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {p.type === 'drum' ? 'B2B Drum' : '1L/5L'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
