import Hero from "./Hero.tsx"
import Visual from "./Visual.tsx"
import Logos from "./Logos.tsx"
import About from "./About.tsx"
import ProjectKeyFeatures from "./ProjectKeyFeatures.tsx"
import Footer from "./Footer.tsx"

export default function Landing()
{
    return (
        <main className="overflow-hidden bg-[linear-gradient(180deg,rgba(0,0,0,1)_50%,rgba(34,1,50,1)_65%,rgba(0,0,0,1)_83%,rgba(85,0,255,1)_100%)]" data-model-id="1:6">
            <Hero/>
            <Visual/>
            <Logos/>
            <About/>
            <ProjectKeyFeatures/>
            <Footer/>
        </main>
    )
}