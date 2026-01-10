import Hero from "./Hero.tsx"
import Logos from "./Logos.tsx"
import About from "./About.tsx"
import ProjectKeyFeatures from "./ProjectKeyFeatures.tsx"
import Footer from "./Footer.tsx"
import Visual from "./Visual.tsx"

export interface LandingNavigtion
{
    onNavigateToExperience?: () => void;
}

export default function Landing({onNavigateToExperience}: LandingNavigtion): JSX.Element
{
    return (
        <main className="overflow-hidden bg-[linear-gradient(180deg,rgba(0,0,0,1)_50%,rgba(34,1,50,1)_65%,rgba(0,0,0,1)_83%,rgba(85,0,255,1)_100%)]" data-model-id="1:6">
            <Hero
                onNavigateToExperience={onNavigateToExperience}
            />
            <Visual/>
            <Logos/>
            <About
                onNavigateToExperience={onNavigateToExperience}
            />
            <ProjectKeyFeatures
                onNavigateToExperience={onNavigateToExperience}
            />
            <Footer/>
        </main>
    )
}