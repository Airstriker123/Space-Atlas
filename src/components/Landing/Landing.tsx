// Landing.tsx
import { useEffect } from "react";
import Hero from "./Hero";
import Logos from "./Logos";
import About from "./About";
import ProjectKeyFeatures from "./ProjectKeyFeatures";
import Solar_system from "../models/Solar_system.tsx"
//animations
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import {isMobile} from 'react-device-detect';


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export interface LandingNavigation {
    onNavigateToExperience?: () => void;
}

export default function Landing({onNavigateToExperience}: LandingNavigation): JSX.Element
{
    if (isMobile) console.log('ENABLED MOBILE MODE')

    useEffect(() =>
    {
        if (typeof window === "undefined") return; // SSR safe

        const smoother = ScrollSmoother.create({
            content: "#smooth-content",
            smooth: 1.2, // seconds to "catch up" to native scroll
            effects: true, // looks for data-speed / data-lag
            smoothTouch: 0.1, // touch devices
        });

        return () => {
            smoother.kill(); // destroy component unmounts
        };
    }, []);

    return (
        <main>
            {/* ScrollSmoother wrapper */}
                <div
                    className="bg-[linear-gradient(180deg,rgba(0,0,0,1)_50%,rgba(34,1,50,1)_65%,rgba(0,0,0,1)_83%,rgba(85,0,255,1)_100%)]" data-model-id="1:6"
                    id="smooth-content">
                    <Hero onNavigateToExperience={onNavigateToExperience} />
                    {!isMobile && (<Solar_system/>)}
                    <Logos />
                    <About onNavigateToExperience={onNavigateToExperience} />
                    <ProjectKeyFeatures />
                    <footer className="relative z-10 border-t border-purple-500/20 backdrop-blur-sm bg-black/20 mt-20">
                        <div className="container mx-auto px-4 py-6">
                            <div className="text-center text-white">
                                <p>© 2026 Space Atlas. All rights reserved.
                                    Original code, UI, animation, 3D assets, and design are fully protected.
                                    Some media assets are used under license and remain the property of their respective owners.
                                </p>
                                <button onClick={() => window.open("https://github.com/Airstriker123/Space-Atlas#project---space-atlas")}>
                                    <span className={`text-blue-500 hover:text-purple-700`}><b>View credits by clicking me!</b></span>
                                </button>
                            </div>
                        </div>
                    </footer>
                </div>
        </main>
    );
}
