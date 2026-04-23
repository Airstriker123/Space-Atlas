import './App.css'
import Experience from "./components/Experience/page/Experience.tsx"
import Landing from "./components/Landing/Landing.tsx"
import {useEffect, useRef, useState} from "react"
import {toast, Toaster} from "sonner";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {usePreloadAssets} from "./hooks/usePreloadAssets.ts";
import LoadingScreen from "./components/LoadingScreen.tsx";
import {useAssetLoader} from "./hooks/useAssestLoader.ts";

const TOAST_ID = 'fullscreen-alert';

export default function App(): JSX.Element
{
    const [currentSection, setCurrentSection] = useState<'Experience' | 'Landing'>('Landing');
    const hasAlerted = useRef(false);
    const audio = new Audio('./media/button.wav')
    const handle = useFullScreenHandle();
    const assets = [
        "./about.jpg",
        "./3d.webp",
        "./object/blackhole.gif",
        "./object/earth.gif",
        "./object/galaxy.gif",
        "./object/jupiter.gif",
        "./object/neutronStar.gif",
        "./object/stars.gif",
        "./media/button.wav",
        "./media/Earth/earth.mp4",
        "./media/Earth/soundtrack.mp3",
        "./3D/blackhole-transformed.glb",
        "./3D/jupiter-transformed.glb",
        "./3D/planet_earth-transformed.glb",
        "./3D/solar_system-transformed.glb",
        "./3D/star-transformed.glb",
    ]
    const loaded = usePreloadAssets(assets)
    const progress = useAssetLoader(assets)

    useEffect(() =>
    {
        const checkFullscreen = () =>
        {
            const isWindowFull =
                window.innerWidth === window.screen.width &&
                window.innerHeight === window.screen.height;

            if (!isWindowFull && !hasAlerted.current)
            {
                toast.error("Enter fullscreen mode for the best experience!", {
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
        audio.play().catch(e => console.log('Audio play prevented:', e));
        setCurrentSection('Experience');
        handle.enter().catch(e => console.log('Audio play prevented:', e));
        console.log(currentSection);
    }

    const handleSwapLanding = () =>
    {
        audio.play().catch(e => console.log('Audio play prevented:', e));
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

    if (!loaded) return <LoadingScreen

        progress={progress} />;
    return (
        <main className="app-container">
                <FullScreen handle={handle}>
                    {renderCurrentSection()}
                </FullScreen>
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