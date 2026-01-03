import './App.css'
import Hero from "./components/Landing/Hero.tsx"
import Visual from "./components/Landing/Visual.tsx"
import Logos from "./components/Landing/Logos.tsx"
import About from "./components/Landing/About.tsx"
import ProjectKeyFeatures from "./components/Landing/ProjectKeyFeatures.tsx"
import Footer from "./components/Landing/Footer.tsx"

export default function App()
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