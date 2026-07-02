import './App.css'
import Experience from "./components/Experience/page/Experience.tsx"
import Landing from "./components/Landing/Landing.tsx"
import {useEffect, useRef, useState} from "react"
import {toast, Toaster} from "sonner";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {Loading} from "./components/Loader/Loading.tsx";


const TOAST_ID = 'fullscreen-alert';

export default function App(): JSX.Element
{
    const [currentSection, setCurrentSection] = useState<'Experience' | 'Landing'>('Landing');
    const hasAlerted = useRef(false);
    const audio = new Audio('./media/button.wav')
    const handle = useFullScreenHandle();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading) return;
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.ready.then(() => {
                console.log("Service worker fully loaded");
                setLoading(false);
            });
        }
        if (loading) toast.loading("Loading assets to service worker");
    }, [loading]);

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
        handle.exit().catch(e => console.log(' prevented exit:', e));
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
                    <FullScreen handle={handle}>
                        <Experience
                            onNavigateToLanding={handleSwapLanding}
                        />
                    </FullScreen>
                )
            case 'Landing':
                return (
                    <FullScreen handle={handle}>
                        <Landing onNavigateToExperience={handleSwapExperience}/>
                    </FullScreen>
                )
            default:
                return null
        }
    };

    return (
        <main className="app-container">
            {loading && (<>
                <Loading/>
            </>)}
            {!loading && (
                    <>
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
                    </>
                )
            }
        </main>
    )
}