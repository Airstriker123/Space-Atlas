import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import spline from './spline.ts';

export interface WormholeProps {
    /** Optional custom CSS class for the container */
    className?: string;
    /** Optional custom inline style for the container */
    style?: React.CSSProperties;
}

export const Loading: React.FC<WormholeProps> = ({ className, style }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Dimensions based on container
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;

        // Scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.3);

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
        bloomPass.threshold = 0.00002;
        bloomPass.strength = 2;
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
        const tubeGeo = new THREE.TubeGeometry(spline, 232, 0.65, 16, true);

        // Create edges geometry from the spline
        const edges = new THREE.EdgesGeometry(tubeGeo, 0);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff  });
        const tubeLines = new THREE.LineSegments(edges, lineMat);
        scene.add(tubeLines);

        let animationFrameId: number;

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

    const defaultStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000000',
        ...style,
    };

    return (
        <div
            ref={containerRef}
            className={className}
            style={defaultStyle}
        />
    );
};
