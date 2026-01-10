import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 1460;

export default function Visual() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // Load all frames
    useEffect(() => {
        const frameImages: HTMLImageElement[] = [];
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
            frameImages.push(img);
        }
        setImages(frameImages);
    }, []);

    // Animate canvas frames
    useEffect(() => {
        if (images.length === 0) return;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const scale = window.devicePixelRatio || 1;
        canvas.width = 1920 * scale;
        canvas.height = 1080 * scale;
        ctx.scale(scale, scale);

        const frameState = { frame: 0 };

        const render = () => {
            const img = images[frameState.frame];
            if (!img?.complete) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width / scale, canvas.height / scale);
        };

        // Pin canvas until all frames are cycled
        gsap.to(frameState, {
            frame: TOTAL_FRAMES - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${window.innerHeight *0.8}`, // adjust scroll length for speed
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
            onUpdate: render,
        });

        // Render first frame immediately
        images[0].onload = render;
        if (images[0].complete) render();
    }, [images]);

    return (
        <div ref={containerRef} className="w-full h-screen">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}