import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import spline from './spline.ts';



export const Loading: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto"; // restore on unmount
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Dimensions based on container
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;

        // Scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.01);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(w, h);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        // Post-processing setup
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1, 0.3, 100);
        bloomPass.threshold = 0.1;
        bloomPass.strength = 0.2867
        bloomPass.radius = 0;

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // Create a line from the spline points
        const points = spline.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        //const line = new THREE.Line(geometry, material);
        //scene.add(line); // Commented out in index.js, keeping it here too

        // Create a tube geometry along the spline
        const tubeGeo = new THREE.TubeGeometry(spline, 232, 0.65, 17, true);

        // Create edges geometry from the spline
        const edges = new THREE.EdgesGeometry(tubeGeo, 0);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff  });
        const tubeLines = new THREE.LineSegments(edges, lineMat);
        scene.add(tubeLines);

        let animationFrameId: number;

        // Create stars
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 10000;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;

            // Positions
            positions[i3] = (Math.random() - 0.5) * 2000;
            positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i3 + 2] = (Math.random() - 0.5) * 1000;

            // Colors (purple/pink/white)
            const colorChoice = Math.random();
            if (colorChoice > 0.7) {
                // Purple
                colors[i3] = 0.66;
                colors[i3 + 1] = 0.33;
                colors[i3 + 2] = 0.97;
            } else if (colorChoice > 0.4) {
                // Pink
                colors[i3] = 0.93;
                colors[i3 + 1] = 0.51;
                colors[i3 + 2] = 0.93;
            } else {
                // White
                colors[i3] = 1;
                colors[i3 + 1] = 1;
                colors[i3 + 2] = 1;
            }

            // Sizes
            sizes[i] = Math.random() * 3;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Create nebula clouds
        const nebulaGeometry = new THREE.BufferGeometry();
        const nebulaCount = 1000;
        const nebulaPositions = new Float32Array(nebulaCount * 3);
        const nebulaColors = new Float32Array(nebulaCount * 3);
        const nebulaSizes = new Float32Array(nebulaCount);

        for (let i = 0; i < nebulaCount; i++) {
            const i3 = i * 3;

            nebulaPositions[i3] = (Math.random() - 0.5) * 1500;
            nebulaPositions[i3 + 1] = (Math.random() - 0.5) * 1500;
            nebulaPositions[i3 + 2] = (Math.random() - 0.5) * 800;

            // Purple/pink nebula colors
            const purple = Math.random() * 0.3 + 0.5;
            nebulaColors[i3] = purple;
            nebulaColors[i3 + 1] = purple * 0.3;
            nebulaColors[i3 + 2] = purple * 1.2;

            nebulaSizes[i] = Math.random() * 30 + 10;
        }

        nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
        nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
        nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1));

        const nebulaMaterial = new THREE.PointsMaterial({
            size: 20,
            vertexColors: true,
            transparent: true,
            opacity: 0.15,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
        });

        const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
        scene.add(nebula);

        // Flythrough camera animation
        const updateCamera = (t: number) => {
            const time = t * 0.1;
            const looptime = 4 * 1000;
            const p = (time % looptime) / looptime;
            const pos = tubeGeo.parameters.path.getPointAt(p);
            const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.01) % 1);
            camera.position.copy(pos);
            camera.lookAt(lookAt);
        };

        const animate = (t = 0) => {
            animationFrameId = requestAnimationFrame(animate);
            updateCamera(t);
            // Rotate stars slowly
            stars.rotation.y += 0.0002;
            stars.rotation.x += 0.0001;

            // Rotate nebula
            nebula.rotation.y -= 0.0001;
            nebula.rotation.x -= 0.00005;
            composer.render();
        };
        animate(0);

        // Resize handler
        const handleResize = () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            composer.setSize(width, height);
            bloomPass.setSize(width, height);
        };

        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });
        resizeObserver.observe(container);

        // Cleanup resources
        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();

            renderer.dispose();
            composer.dispose();

            geometry.dispose();
            material.dispose();
            tubeGeo.dispose();
            edges.dispose();
            lineMat.dispose();


            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);



    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 w-full h-full"
            style={{ background: 'radial-gradient(ellipse at center, #1a0b2e 0%, #000000 100%)' }}
        />

    );
};
