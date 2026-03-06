import './App.css'
import Experience from "./components/Experience/page/Experience.tsx"
import Landing from "./components/Landing/Landing.tsx"
import {useEffect, useRef, useState} from "react"
import {toast, Toaster} from "sonner";
const TOAST_ID = 'fullscreen-alert';
export default function App(): JSX.Element
{
    const [currentSection, setCurrentSection] = useState<'Experience' | 'Landing'>('Experience');
    const hasAlerted = useRef(false);

    useEffect(() =>
    {
        const checkFullscreen = () =>
        {
            const isWindowFull =
                window.innerWidth === window.screen.width &&
                window.innerHeight === window.screen.height;

            if (!isWindowFull && !hasAlerted.current)
            {
                toast.error("Please enter fullscreen mode for the best experience!", {
                    id: TOAST_ID, // This prevents duplicates!
                    onDismiss: () => { hasAlerted.current = true; },
                    onAutoClose: () => { hasAlerted.current = true; },
                });

                // Mark as alerted so Strict Mode's second run is ignored
                hasAlerted.current = true;
            }
        };

        // Run the check
        checkFullscreen();

        window.addEventListener('resize', checkFullscreen);
        return () => window.removeEventListener('resize', checkFullscreen);
    }, []);

    const handleSwapExperience = () =>
    {
        setCurrentSection('Experience');
        console.log(currentSection);
    }

    const handleSwapLanding = () => {
        setCurrentSection('Landing');
        console.log(currentSection);
    }

    useEffect(() =>
    {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentSection]);



    const renderCurrentSection = () =>
    {
        switch(currentSection)
        {
            case 'Experience':
                return (
                    <Experience
                        onNavigateToLanding={handleSwapLanding}
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
    return (
        <main className="app-container">
            {renderCurrentSection()}
            <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'linear-gradient(135deg, rgb(47, 0, 100), rgb(138,5,255,1))',
                        border: '1px solid linear-gradient(135deg, rgb(0, 147, 255), rgb(122, 0, 255))',
                        color: '#DBE9F3',
                    },
                }}
            />
        </main>
    )
}