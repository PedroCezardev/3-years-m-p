"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/header/section-header";

gsap.registerPlugin(ScrollTrigger);

const wordsList = [
  "Amor Puro",
  "Companheirismo",
  "Boboquices",
];

const Words3D = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const h2Refs = useRef<HTMLHeadingElement[]>([]);
  const modelRef = useRef<THREE.Group | null>(null);

  // 1. Configuração do Three.js para o Coração 3D
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.5;

    // Iluminação cinematográfica para destacar o relevo do coração
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffaaaa, 4.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 3.0);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xff5555, 3.5, 15);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // Grupo do modelo
    const modelGroup = new THREE.Group();
    // Posição inicial no fundo e ao alto (como na referência: z: -12, y: 2)
    modelGroup.position.set(0, 2, -12);
    scene.add(modelGroup);
    modelRef.current = modelGroup;

    const loader = new GLTFLoader();
    loader.load(
      "/low_poly_spinning_heart.glb",
      (gltf) => {
        const object = gltf.scene;

        // Normalização do tamanho deixada bem maior e mais chamativa na sessão
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const targetScale = 3.8 / maxDim; // Aumentado significativamente para ser super chamativo!
          object.scale.set(targetScale, targetScale, targetScale);
        }

        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center.multiplyScalar(object.scale.x));

        modelGroup.add(object);
      },
      undefined,
      (error) => {
        console.warn("Erro ao carregar /low_poly_spinning_heart.glb:", error);
      }
    );

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotação contínua no eixo Y (girando suavemente)
      if (modelGroup) {
        modelGroup.rotation.y += 0.015;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  // 2. Animação GSAP Unificada (Master Timeline único para evitar bugs de pin duplo, barra preta e pin antecipado)
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const config = {
        stagger: { each: 0.07, from: "random" as const },
        duration: 1.0,
        blur: "20px",
        pauseEntre: 1.5,
      };

      const totalScrollDistance = "+=4200";

      // ÚNICO ScrollTrigger master para controlar o pino e evitar qualquer salto ou barra preta
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5,
          pin: true,
          start: "top top",
          end: totalScrollDistance,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(h2Refs.current, { opacity: 1 });

      // Animação sequencial das palavras (Aparecer, pausar e desaparecer irregularmente)
      h2Refs.current.forEach((h2) => {
        if (!h2) return;
        const chars = h2.querySelectorAll(".char-span");

        gsap.set(chars, { opacity: 0, filter: `blur(${config.blur})` });

        masterTl.to(chars, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: config.duration,
          stagger: config.stagger,
          ease: "power2.out",
        });

        masterTl.to({}, { duration: config.pauseEntre });

        masterTl.to(chars, {
          opacity: 0,
          filter: `blur(${config.blur})`,
          scale: 1.08,
          duration: config.duration * 0.8,
          stagger: config.stagger,
          ease: "power2.in",
        });
      });

      // Duração exata que todas as palavras levaram na timeline (aprox 3.6 a 4.0 unidades de tempo do GSAP)
      const wordsEndTime = masterTl.duration();

      // Espaço final na timeline master para a transição de explosão/zoom do coração após as palavras sumirem
      masterTl.to({}, { duration: 2.2 });

      // Animação sincronizada do Coração 3D no MESMO masterTl (evita qualquer conflito ou barra preta!)
      if (modelRef.current) {
        // Fase 1: Desce do fundo até ficar flutuando no alto/centro (Y: 1.5, Z: 1.8), em sincronia exata com o tempo das palavras (0 até wordsEndTime)
        masterTl.to(
          modelRef.current.position,
          {
            x: 0,
            y: 1.5,
            z: 1.8,
            duration: wordsEndTime,
            ease: "power1.inOut",
          },
          0
        );
        masterTl.to(
          modelRef.current.rotation,
          {
            x: 1.5 * Math.PI,
            duration: wordsEndTime,
            ease: "power1.inOut",
          },
          0
        );

        // Fase 2: Transição final (desce ao centro da câmera e cresce gigantescamente ocupando a tela toda no final do scroll)
        masterTl.to(
          modelRef.current.position,
          {
            z: 5.35, // Bem próximo da câmera (que está em z = 5.5)
            y: -0.1,
            duration: 2.2,
            ease: "power3.inOut",
          },
          wordsEndTime
        );
        masterTl.to(
          modelRef.current.scale,
          {
            x: 6,
            y: 6,
            z: 6,
            duration: 2.2,
            ease: "power3.inOut",
          },
          wordsEndTime
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="animations bg-[#170000] w-full h-screen relative overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Container div3d abrigando o canvas e os h2 com espaçamento equilibrado entre o coração e as palavras */}
      <div className="div3d relative flex-1 w-full flex justify-center items-center">
        {/* Canvas do Three.js sobreposto para o coração 3D girando */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* H2s posicionados abaixo do coração (com margin/gap) para deixar a seção preenchida e harmoniosa */}
        {wordsList.map((word, index) => (
          <h2
            key={index}
            ref={(el) => {
              if (el) h2Refs.current[index] = el;
            }}
            className="absolute z-10 top-[64%] -translate-y-1/2 font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-wide text-white select-none text-center px-4"
          >
            {word.split("").map((char, charIdx) => (
              <span key={charIdx} className="char-span inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        ))}
      </div>

      {/* Espaçamento inferior */}
      <div className="h-8 sm:h-12 z-30" />
    </section>
  );
};

export default Words3D;
