// Landing.tsx
import { useEffect } from "react";
import Hero from "./Hero";
import Logos from "./Logos";
import About from "./About";
import ProjectKeyFeatures from "./ProjectKeyFeatures";
import Footer from "./Footer";
import Solar_system from "../models/Solar_system.tsx"
//animations
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export interface LandingNavigation {
    onNavigateToExperience?: () => void;
}

export default function Landing({onNavigateToExperience}: LandingNavigation): JSX.Element
{

    useEffect(() =>
    {
        if (typeof window === "undefined") return; // SSR safe

        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
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
                id="smooth-wrapper">
                <div
                    className="bg-[linear-gradient(180deg,rgba(0,0,0,1)_50%,rgba(34,1,50,1)_65%,rgba(0,0,0,1)_83%,rgba(85,0,255,1)_100%)]" data-model-id="1:6"
                    id="smooth-content">
                    <Hero onNavigateToExperience={onNavigateToExperience} />
                    <Solar_system/>
                    <Logos />
                    <About onNavigateToExperience={onNavigateToExperience} />
                    <ProjectKeyFeatures onNavigateToExperience={onNavigateToExperience} />
                    <Footer />
                </div>
            </div>
        </main>
    );
}
