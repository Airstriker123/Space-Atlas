import './App.css'
import Experience from "./components/Experience/page/Experience.tsx"
import Landing from "./components/Landing/Landing.tsx"
import {useState, useEffect} from "react"


export default function App()
{
    let [currentSection, setCurrentSection] = useState<'Experience' | 'Landing'>('Landing');

    const handleSwapExperience = () =>
    {
        setCurrentSection('Experience');
        console.log(currentSection);
    }

    const handleSwapLanding = () => {
        setCurrentSection('Landing');
        console.log(currentSection);
    }


    const renderCurrentSection = () =>
    {
        switch(currentSection)
        {
            case 'Experience':
                return (
                    <
                        Experience

                    />
                )
            case 'Landing':
                return <Landing
                    onNavigateToExperience={handleSwapExperience}
                />
            default:
                return (
                    <>
                        <body className="bg-linear-to-r from-purple-950/20 via-purple-900 to-black/10 flex items-center justify-center h-screen">
                        <div className="text-center">
                            <h1 className="text-9xl font-extrabold text-white">404</h1>
                            <p className="text-2xl text-white mt-4">Oops! Page not found.</p>
                            <p className="text-white mt-2">The page you're looking for doesn't exist or has been moved.</p>
                            <a href="/$"
                               className="mt-6 inline-block px-6 py-3 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">Go
                                Home</a>
                        </div>
                        </body>
                    </>
                )
        }
    };
    return renderCurrentSection();
}