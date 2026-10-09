import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Language, ScreenId } from '../types';
import { ARTIST_IMAGES } from '../data/content';
import { Box, Disc3, Camera } from 'lucide-react';

export type Scene3DMode = 'sculpture' | 'vinyl' | 'lens';
export type MaterialFinish = 'lila' | 'rosa' | 'rojo' | 'rayo' | 'blanco';

interface Spatial3DCanvasProps {
  currentScreen: ScreenId;
  language: Language;
  className?: string;
  initialMode?: Scene3DMode;
  heightClass?: string;
}

export const Spatial3DCanvas: React.FC<Spatial3DCanvasProps> = ({
  currentScreen,
  language,
  className = '',
  initialMode,
  heightClass = 'h-[360px] sm:h-[420px]',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneMode, setSceneMode] = useState<Scene3DMode>(() => {
    if (initialMode) return initialMode;
    if (currentScreen === 'discografia') return 'vinyl';
    if (currentScreen === 'galeria') return 'lens';
    return 'sculpture';
  });
  const [finish, setFinish] = useState<MaterialFinish>('lila');
  const [webglReady, setWebglReady] = useState<boolean>(true);

  useEffect(() => {
    if (initialMode) return;
    if (currentScreen === 'discografia') setSceneMode('vinyl');
    else if (currentScreen === 'galeria') setSceneMode('lens');
    else setSceneMode('sculpture');
  }, [currentScreen, initialMode]);

  const stateRef = useRef({
    mode: sceneMode,
    finish: finish,
    targetRotX: 0.18,
    targetRotY: 0.35,
    mouseX: 0,
    mouseY: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    stateRef.current.mode = sceneMode;
    stateRef.current.finish = finish;
  }, [sceneMode, finish]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglReady(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const canvasEl = renderer.domElement;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglReady(false);
    };
    const handleContextRestored = () => {
      setWebglReady(true);
    };
    canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.055);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 6.8);

    // Three-Point Studio Lighting (Blanco, Lila, Rosa & Rojo)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf472b6, 2.3);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa855f7, 1.6);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xe11d48, 3.0, 18);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    const electricLight = new THREE.PointLight(0x00d4ff, 2.4, 20);
    electricLight.position.set(-4, 4, 4);
    scene.add(electricLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const primaryMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.85,
      roughness: 0.18,
    });

    const secondaryMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.88,
      roughness: 0.16,
    });

    const crimsonMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.9,
      roughness: 0.15,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });

    // 1. Escultura Orbital
    const sculptureGroup = new THREE.Group();
    const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 1), primaryMat);
    sculptureGroup.add(coreMesh);

    const wireCage = new THREE.Mesh(new THREE.IcosahedronGeometry(1.58, 1), wireMat);
    sculptureGroup.add(wireCage);

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.028, 20, 100), secondaryMat);
    ring1.rotation.x = Math.PI / 2.5;
    sculptureGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.022, 20, 100), crimsonMat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = Math.PI / 5;
    sculptureGroup.add(ring2);
    rootGroup.add(sculptureGroup);

    // 2. Vinilo de Estudio
    const vinylGroup = new THREE.Group();
    const platterMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 0.07, 64), primaryMat);
    platterMesh.rotation.x = Math.PI / 2;
    vinylGroup.add(platterMesh);

    const labelMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.09, 48), crimsonMat);
    labelMesh.rotation.x = Math.PI / 2;
    vinylGroup.add(labelMesh);

    for (let r = 0.85; r <= 1.7; r += 0.25) {
      const groove = new THREE.Mesh(new THREE.TorusGeometry(r, 0.01, 12, 64), wireMat);
      groove.position.z = 0.045;
      vinylGroup.add(groove);
    }
    rootGroup.add(vinylGroup);

    // 3. Óptica Fotográfica
    const lensGroup = new THREE.Group();
    const lensRings: THREE.Mesh[] = [];
    const radii = [0.68, 1.12, 1.55, 1.98, 2.35];
    radii.forEach((r, idx) => {
      const tube = idx === 2 ? 0.1 : 0.045;
      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 24, 96),
        idx % 3 === 0 ? primaryMat : idx % 3 === 1 ? secondaryMat : crimsonMat
      );
      ringMesh.position.z = (idx - 2) * 0.36;
      lensGroup.add(ringMesh);
      lensRings.push(ringMesh);
    });
    const centerGlass = new THREE.Mesh(new THREE.SphereGeometry(0.54, 32, 32), secondaryMat);
    centerGlass.scale.set(1, 1, 0.3);
    lensGroup.add(centerGlass);
    rootGroup.add(lensGroup);

    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      stateRef.current.mouseX = normX;
      stateRef.current.mouseY = normY;

      if (stateRef.current.isDragging) {
        const dx = e.clientX - stateRef.current.lastX;
        const dy = e.clientY - stateRef.current.lastY;
        stateRef.current.targetRotY += dx * 0.007;
        stateRef.current.targetRotX += dy * 0.007;
        stateRef.current.lastX = e.clientX;
        stateRef.current.lastY = e.clientY;
      }
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
    };

    canvasEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const st = stateRef.current;

      if (st.finish === 'lila') {
        primaryMat.color.setHex(0xa855f7);
        primaryMat.metalness = 0.85;
        primaryMat.roughness = 0.18;
      } else if (st.finish === 'rosa') {
        primaryMat.color.setHex(0xec4899);
        primaryMat.metalness = 0.88;
        primaryMat.roughness = 0.16;
      } else if (st.finish === 'rojo') {
        primaryMat.color.setHex(0xe11d48);
        primaryMat.metalness = 0.86;
        primaryMat.roughness = 0.18;
      } else if (st.finish === 'rayo') {
        primaryMat.color.setHex(0x00d4ff);
        primaryMat.metalness = 0.9;
        primaryMat.roughness = 0.14;
      } else if (st.finish === 'blanco') {
        primaryMat.color.setHex(0xffffff);
        primaryMat.metalness = 0.92;
        primaryMat.roughness = 0.12;
      }

      sculptureGroup.visible = st.mode === 'sculpture';
      vinylGroup.visible = st.mode === 'vinyl';
      lensGroup.visible = st.mode === 'lens';

      const desiredY = st.targetRotY + t * 0.18 + st.mouseX * 0.35;
      const desiredX = st.targetRotX + st.mouseY * 0.25;
      rootGroup.rotation.y = THREE.MathUtils.lerp(rootGroup.rotation.y, desiredY, 0.05);
      rootGroup.rotation.x = THREE.MathUtils.lerp(rootGroup.rotation.x, desiredX, 0.05);

      if (st.mode === 'sculpture') {
        wireCage.rotation.y = -t * 0.25;
        ring1.rotation.z = t * 0.35;
        ring2.rotation.y = -t * 0.3;
      } else if (st.mode === 'vinyl') {
        vinylGroup.rotation.z = -t * 0.5;
      } else if (st.mode === 'lens') {
        lensRings.forEach((ring, idx) => {
          ring.rotation.z = t * (idx % 2 === 0 ? 0.25 : -0.3) * (idx + 1) * 0.3;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);
      renderer.dispose();
    };
  }, []);

  const modeButtons: { id: Scene3DMode; label: Record<Language, string>; icon: React.ReactNode }[] = [
    {
      id: 'sculpture',
      label: { ca: 'I. Escultura', es: 'I. Escultura', en: 'I. Sculpture' },
      icon: <Box className="w-3.5 h-3.5" />,
    },
    {
      id: 'vinyl',
      label: { ca: 'II. Vinil', es: 'II. Vinilo', en: 'II. Vinyl' },
      icon: <Disc3 className="w-3.5 h-3.5" />,
    },
    {
      id: 'lens',
      label: { ca: 'III. Òptica', es: 'III. Óptica', en: 'III. Optics' },
      icon: <Camera className="w-3.5 h-3.5" />,
    },
  ];

  const finishes: { id: MaterialFinish; label: Record<Language, string> }[] = [
    { id: 'lila', label: { ca: 'Lila', es: 'Lila', en: 'Lilac' } },
    { id: 'rosa', label: { ca: 'Rosa', es: 'Rosa', en: 'Pink' } },
    { id: 'rojo', label: { ca: 'Vermell', es: 'Rojo', en: 'Red' } },
    { id: 'rayo', label: { ca: 'Raig', es: 'Rayo', en: 'Electric' } },
    { id: 'blanco', label: { ca: 'Blanc', es: 'Blanco', en: 'White' } },
  ];

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-[#050507] border border-[#00d4ff]/35 shadow-[0_0_25px_rgba(0,212,255,0.12)] ${heightClass} ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,212,255,0.16),rgba(168,85,247,0.14)_45%,transparent_75%)]"
      />

      {webglReady ? (
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          title={
            language === 'ca'
              ? 'Arrossega per orbitar la peça 3D'
              : language === 'es'
              ? 'Arrastra para orbitar la pieza 3D'
              : 'Drag to orbit 3D sculpture'
          }
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <img
            src={ARTIST_IMAGES.heroPortrait}
            alt="RAFA 930"
            referrerPolicy="no-referrer"
            className="w-36 h-36 rounded-lg object-cover border border-[#22222e] mb-3"
          />
          <p className="text-xs font-mono text-[#a1a1b5]">RAFA 930</p>
        </div>
      )}

      {/* Bottom Curatorial 3D Controls */}
      <div className="pointer-events-none absolute bottom-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2">
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
          {modeButtons.map((btn) => {
            const active = sceneMode === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setSceneMode(btn.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'gradient-lila-rosa-rojo text-white font-semibold'
                    : 'text-[#a1a1b5] hover:text-white'
                }`}
              >
                {btn.icon}
                <span>{btn.label[language]}</span>
              </button>
            );
          })}
        </div>

        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
          {finishes.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFinish(f.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors whitespace-nowrap shrink-0 ${
                finish === f.id
                  ? 'bg-white text-[#050507] font-bold'
                  : 'text-[#a1a1b5] hover:text-white'
              }`}
            >
              {f.label[language]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
