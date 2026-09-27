import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * InteractiveGlobe Component
 * Renders an elegant, softened 3D Earth globe with soothing GoComet blue tones,
 * gentle matte continents, softened atmospheric glow, and miniature 3D container
 * cargo ships sailing along the global logistics trade arcs.
 */
export default function InteractiveGlobe({ activeNode, onNodesCalculated }) {
  const mountRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    isHoveredRef.current = !!activeNode;
  }, [activeNode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 13.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Subtle lighting for 3D ships
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 2. Globe Group: Lowered position so globe and horizon sit deeper in the ocean canvas
    const globeRadius = 8.6;
    const globePositionY = -8.75; // Lowered from -8.1 to move everything down with generous top breathing room

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.14; // natural tilt
    globeGroup.position.set(0, globePositionY, 0);
    scene.add(globeGroup);

    // 3. Texture Loading (Atmos map & Specular ocean mask)
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('/earth_atmos_2048.jpg');
    const earthSpec = textureLoader.load('/earth_specular_2048.jpg');
    earthMap.wrapS = THREE.RepeatWrapping;
    earthSpec.wrapS = THREE.RepeatWrapping;

    // 4. Softened, Eye-Pleasing Shader for GoComet Earth Aesthetic
    // Gentle silky blending, soft matte navy continents, deep tranquil oceans, zero harsh speckles
    const earthVertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const earthFragmentShader = `
      uniform sampler2D mapTexture;
      uniform sampler2D specularTexture;
      uniform vec3 oceanColorDeep;
      uniform vec3 oceanColorBright;
      uniform vec3 landColor;
      uniform float time;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        float spec = texture2D(specularTexture, vUv).r;
        vec4 day = texture2D(mapTexture, vUv);

        // Soft, gentle transition between land and ocean
        float isOcean = smoothstep(0.18, 0.40, spec);

        // Soft, deep GoComet ocean gradient
        vec3 ocean = mix(oceanColorDeep, oceanColorBright, spec * 0.75 + 0.1);

        // Matte, soft corporate navy continents without harsh speckles
        vec3 land = mix(landColor, landColor * 1.18, day.r * 0.25);

        // Smooth surface blend
        vec3 surface = mix(land, ocean, isOcean);

        // Soft, delicate Fresnel atmosphere rim
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDir, vNormal));
        float rim = pow(fresnel, 3.2);

        // Soothing cyan-blue atmospheric rim light
        vec3 rimColor = mix(vec3(0.0, 0.3, 0.9), vec3(0.0, 0.7, 0.95), rim);
        surface += rimColor * rim * 1.1;

        gl_FragColor = vec4(surface, 1.0);
      }
    `;

    const earthGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        mapTexture: { value: earthMap },
        specularTexture: { value: earthSpec },
        oceanColorDeep: { value: new THREE.Color('#061a48') },
        oceanColorBright: { value: new THREE.Color('#004fe6') },
        landColor: { value: new THREE.Color('#0e224e') },
        time: { value: 0 },
      },
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);

    // 5. Outer Atmosphere Halo Sphere (Soft, gentle celestial bloom)
    const atmosVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const atmosFragmentShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 viewDir = normalize(vViewPosition);
        float rim = 1.0 - max(0.0, dot(viewDir, vNormal));
        float intensity = pow(rim, 3.8);

        vec3 haloColor = mix(vec3(0.0, 0.35, 0.9), vec3(0.0, 0.8, 1.0), intensity);
        gl_FragColor = vec4(haloColor, intensity * 0.6);
      }
    `;

    const atmosGeometry = new THREE.SphereGeometry(globeRadius * 1.018, 64, 64);
    const atmosMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosVertexShader,
      fragmentShader: atmosFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });

    const atmosMesh = new THREE.Mesh(atmosGeometry, atmosMaterial);
    globeGroup.add(atmosMesh);

    // 6. Global Freight Shipping Logistics Arcs with Miniature 3D Cargo Ships!
    const latLongToVector3 = (lat, lon, radius, alt = 0) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const r = radius + alt;
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Helper: Build a miniature, dainty 3D Container Ship (Reduced size as requested)
    const createShipMesh = () => {
      const shipGroup = new THREE.Group();

      // Compact Hull
      const hullGeo = new THREE.BoxGeometry(0.10, 0.04, 0.22);
      const hullMat = new THREE.MeshStandardMaterial({
        color: 0x0054ff, // GoComet blue
        roughness: 0.3,
        metalness: 0.2,
      });
      const hullMesh = new THREE.Mesh(hullGeo, hullMat);
      shipGroup.add(hullMesh);

      // Tapered Bow
      const bowGeo = new THREE.ConeGeometry(0.05, 0.10, 4);
      const bowMat = new THREE.MeshStandardMaterial({ color: 0x003cb8 });
      const bowMesh = new THREE.Mesh(bowGeo, bowMat);
      bowMesh.rotation.x = Math.PI / 2;
      bowMesh.position.set(0, 0, 0.14);
      bowMesh.scale.set(1, 1, 0.5);
      shipGroup.add(bowMesh);

      // Stacked miniature freight containers
      const containerColors = [0xff8a3d, 0xa033ff, 0x00d4ff, 0xffffff];
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
          const boxGeo = new THREE.BoxGeometry(0.032, 0.026, 0.05);
          const boxMat = new THREE.MeshBasicMaterial({
            color: containerColors[(r * 2 + c) % containerColors.length],
          });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          boxMesh.position.set(-0.02 + c * 0.04, 0.028, -0.035 + r * 0.06);
          shipGroup.add(boxMesh);
        }
      }

      // Miniature Bridge Tower
      const bridgeGeo = new THREE.BoxGeometry(0.055, 0.045, 0.04);
      const bridgeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const bridgeMesh = new THREE.Mesh(bridgeGeo, bridgeMat);
      bridgeMesh.position.set(0, 0.035, -0.07);
      shipGroup.add(bridgeMesh);

      // Delicate Navigation Mast Light
      const beaconGeo = new THREE.SphereGeometry(0.02, 6, 6);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        blending: THREE.AdditiveBlending,
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.set(0, 0.075, -0.07);
      shipGroup.add(beaconMesh);

      // Increased size a tad bit as requested: clear, crisp, and elegant
      shipGroup.scale.set(0.95, 0.95, 0.95);
      return shipGroup;
    };

    // 3 iconic major trans-oceanic routes (removed short, fast-looping routes)
    const shippingRoutes = [
      { from: [31.2, 121.5], to: [33.7, -118.2], name: 'Shanghai → Los Angeles' },
      { from: [1.3, 103.8], to: [51.9, 4.5], name: 'Singapore → Rotterdam' },
      { from: [-23.9, -46.3], to: [51.9, 4.5], name: 'Santos → Rotterdam' },
    ];

    const arcGroup = new THREE.Group();
    const packetMeshes = [];

    shippingRoutes.forEach((route) => {
      const p1 = latLongToVector3(route.from[0], route.from[1], globeRadius);
      const p2 = latLongToVector3(route.to[0], route.to[1], globeRadius);

      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      const arcHeight = globeRadius + distance * 0.16;
      mid.normalize().multiplyScalar(arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(50);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      });

      const routeLine = new THREE.Line(lineGeometry, lineMaterial);
      arcGroup.add(routeLine);

      // Miniature 3D Container Ship Vessel
      const shipMesh = createShipMesh();
      arcGroup.add(shipMesh);

      packetMeshes.push({
        ship: shipMesh,
        curve,
        progress: Math.random(),
        // Serene, steady, slow sailing speed (no fast erratic motion)
        speed: 0.0006 + Math.random() * 0.0003,
      });
    });

    globeGroup.add(arcGroup);

    // 7. Calculate Exact Node Coordinates on Lowered Globe Horizon
    const computeHorizonNodes = () => {
      if (!onNodesCalculated) return;
      const curW = container.clientWidth || window.innerWidth;
      const curH = container.clientHeight || window.innerHeight;

      camera.updateMatrixWorld();

      // Perfectly distributed over the globe curvature: Left (26%), Center (50%), Right (74%)
      const targets = [
        { key: 'graphic-design', screenXFrac: 0.26 },
        { key: 'websites', screenXFrac: 0.50 },
        { key: 'motion', screenXFrac: 0.74 },
      ];

      const nodes = {};
      const globeRadiusAtmos = globeRadius * 1.018; // Exact outer cyan atmospheric glow rim
      const center = new THREE.Vector3(0, globePositionY, 0);

      targets.forEach(({ key, screenXFrac }) => {
        const targetX = screenXFrac * curW;

        // Binary search for exact screen Y where camera ray is tangent to the globe sphere
        let lowY = 0;
        let highY = curH;
        const ray = new THREE.Ray();
        const pTarget = new THREE.Vector3();

        for (let iter = 0; iter < 28; iter++) {
          const midY = (lowY + highY) * 0.5;
          const ndcX = (targetX / curW) * 2 - 1;
          const ndcY = -(midY / curH) * 2 + 1;

          ray.origin.copy(camera.position);
          pTarget.set(ndcX, ndcY, 0.5).unproject(camera);
          ray.direction.copy(pTarget.sub(camera.position).normalize());

          const dist = ray.distanceToPoint(center);
          if (dist < globeRadiusAtmos) {
            // Ray hits inside the globe, so midY is below top horizon edge
            highY = midY;
          } else {
            // Ray is in space above the globe
            lowY = midY;
          }
        }

        const horizonY = (lowY + highY) * 0.5;

        nodes[key] = {
          x: Math.round(targetX),
          y: Math.round(horizonY),
        };
      });

      onNodesCalculated(nodes);
    };

    computeHorizonNodes();

    // 8. Interactive Drag & Spin Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocityX = 0;
    const autoRotationSpeed = 0.0016;

    const onPointerDown = (e) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
      };
      rotationVelocityX = 0;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - previousMousePosition.x;

      globeGroup.rotation.y += deltaX * 0.004;
      rotationVelocityX = deltaX * 0.004;

      previousMousePosition = {
        x: clientX,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
      };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      computeHorizonNodes();
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      earthMaterial.uniforms.time.value += delta;

      if (!isDragging) {
        if (Math.abs(rotationVelocityX) > 0.0001) {
          globeGroup.rotation.y += rotationVelocityX;
          rotationVelocityX *= 0.94;
        } else {
          const currentSpeed = isHoveredRef.current ? autoRotationSpeed * 0.35 : autoRotationSpeed;
          globeGroup.rotation.y += currentSpeed;
        }
      }

      // Animate miniature 3D cargo ships sailing along logistics arcs
      packetMeshes.forEach((packet) => {
        packet.progress += packet.speed;
        if (packet.progress > 1) packet.progress = 0;

        const pos = packet.curve.getPoint(packet.progress);
        packet.ship.position.copy(pos);

        // Align ship with trajectory
        const tangent = packet.curve.getTangent(packet.progress);
        const up = pos.clone().normalize();
        const lookTarget = pos.clone().add(tangent);
        packet.ship.lookAt(lookTarget);
        packet.ship.up.copy(up);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosGeometry.dispose();
      atmosMaterial.dispose();
      renderer.dispose();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, [onNodesCalculated]);

  return (
    <div className="interactive-globe-canvas-wrapper" ref={mountRef}>
      {/* 3D WebGL Canvas */}
    </div>
  );
}
