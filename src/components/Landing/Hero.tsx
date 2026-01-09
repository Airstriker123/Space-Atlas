import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export interface LandingNavigation {
    onNavigateToExperience?: () => void;
}

export default function AnimatedHero({
                                         onNavigateToExperience,
                                     }: LandingNavigation): JSX.Element {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set([titleRef.current, paragraphRef.current , subtitleRef.current, buttonsRef.current], {
                opacity: 0,
                y: 50,
            });

            // Create timeline for entrance animations
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                    duration: 1.2,
                },
            });

            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
            })
                .to(paragraphRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                    },
                    '-=0.8'
                )
                .to(
                    subtitleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                    },
                    '-=0.7'
                )
                .to(
                    buttonsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                    },
                    '-=0.6'
                );

            // Scroll-triggered animations
            if (sectionRef.current && contentRef.current) {
                // Parallax effect on scroll
                gsap.to(contentRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                    y: -100,
                    opacity: 0.5,
                });

                // Title scale on scroll
                gsap.to(titleRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                    scale: 0.8,
                });

                // Rotate paragraph slightly
                gsap.to(paragraphRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                    rotateX: 5,
                });

                // Rotate subtitle slightly
                gsap.to(subtitleRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                    rotateX: 10,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Button hover animations
    const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    return (
        <>
            <section
                ref={sectionRef}
                className="overflow-hidden relative before:absolute before:top-0 before:left-0 before:w-full before:h-0.75 before:bg-linear-to-r before:from-purple-700 before:via-purple-500 before:to-purple-100 before:blur-sm before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.75 after:bg-linear-to-r after:from-purple-700 after:via-purple-500 after:to-purple-100 after:blur-sm after:content-['']"
            >
                <div className="bg-[linear-gradient(90deg,rgba(104,0,173,0.49)_0%,rgba(19,0,31,0.88)_8%,rgba(0,0,0,1)_13%,rgba(43,0,72,0.72)_50%,rgba(14,0,26,1)_88%,rgba(82,0,154,0.63)_100%)] lg:grid lg:h-screen lg:place-content-center">
                    <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
                        <div ref={contentRef} className="max-w-prose text-left">
                            <h1
                                ref={titleRef}
                                className="text-4xl font-bold bg-[linear-gradient(89deg,rgba(45,0,134,1)_0%,rgba(115,0,255,1)_48%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent text-[80px] tracking-[0] leading-[normal]"
                            >
                                <strong>Project Galactic</strong>
                            </h1>

                            <h2 ref={paragraphRef}
                               className="bg-[linear-gradient(89deg,rgba(138,5,255,1)_0%,rgba(115,0,255,1)_48%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent]">
                                <strong>A project that utilises aspects of multimedia to forge an engaging experience using various animations and methods to demonstrate the use of multimedia.
                                </strong>
                                </h2>

                            <h3
                                ref={subtitleRef}
                                className="mt-4 text-3xl [-webkit-text-stroke:1px_#7200ff] bg-[linear-gradient(89deg,rgba(138,5,255,1)_0%,rgba(115,0,255,1)_48%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent tracking-[0] leading-[normal]"
                            >
                                <strong>By student: 39736463</strong>
                            </h3>

                            <div ref={buttonsRef} className="mt-4 flex gap-4 sm:mt-6">
                                <button
                                    className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 hover:from-purple-800 hover:to-purple-600 transition duration-300 shadow-lg transform-gpu"
                                    onClick={onNavigateToExperience}
                                    onMouseEnter={handleButtonHover}
                                    onMouseLeave={handleButtonLeave}
                                >
                                    go to experience
                                </button>
                                <a
                                    className="px-6 py-3 rounded-lg font-semibold text-base bg-[linear-gradient(89deg,rgba(138,5,255,1)_0%,rgba(115,0,255,1)_48%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] border-2 border-purple-500 hover:border-purple-600 hover:text-purple-100 transition duration-300 transform-gpu"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                    href="https://github.com/Airstriker123/Project-Galactic"
                                >
                                    contribute to project galactic
                                </a>
                            </div>
                        </div>
                        <img
                            src="http://www.w3.org/2000/svg"
                            className="mx-auto hidden max-w-md text-gray-900 md:block dark:text-white"
                            alt="logo"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
