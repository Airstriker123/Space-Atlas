import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Footer(): JSX.Element {
    const footerRef = useRef<HTMLDivElement>(null);
    const columnsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (columnsRef.current.length) {
                columnsRef.current.forEach((col, i) => {
                    gsap.from(col, {
                        scrollTrigger: {
                            trigger: col,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: 'power3.out',
                        delay: i * 0.2, // stagger between columns
                    });
                });
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="overflow-hidden flex flex-col items-start gap-12 px-6 md:px-16 py-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 w-full">
                {[
                    {
                        title: 'Inspiration',
                        text: 'I was inspired by space, futuristic design, and sci‑fi games. My project lets people feel like they’re exploring space.',
                    },
                    {
                        title: 'Learning experience',
                        text: 'This project allowed me to further improve my web development skills. By learning to use multimedia JavaScript libraries such as threeJS, GSAP I was able to improve my knowledge of web development.',
                    },
                    {
                        title: 'Time Usage',
                        text: 'This project took me about 1 month to create. I spent most of my school holidays working on it.',
                    },
                ].map((col, idx) => (
                    <div
                        key={idx}
                        ref={(el) => {
                            if (el) columnsRef.current[idx] = el;
                        }}
                        className="flex flex-col gap-4 pt-6 border-t border-white w-full"
                    >
                        <h3 className="font-bold text-white text-2xl ransition-colors duration-300">
                            {col.title}
                        </h3>
                        <p className="text-white text-base">{col.text}</p>
                    </div>
                ))}
            </div>
        </footer>
    );
}
