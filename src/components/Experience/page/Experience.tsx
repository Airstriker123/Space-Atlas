import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {ArrowLeft, Sparkles} from 'lucide-react';
import { SpaceObjectCard } from './objects/SpaceObjectCard';
import { GalacticBackground } from './objects/GalacticBackground';
import { CelestialObjectDetail } from './objects/CelestialObjectDetail';
import { celestialObjects } from './data/celestialObjects.tsx';
import planets from "./data/planets.json"
import { VideoIntro } from './objects/VideoIntro';

const spaceObjects = planets

export interface NavigateToLanding
{
  onNavigateToLanding?: () => void;
}

export default function Experience({onNavigateToLanding}: NavigateToLanding)
{
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [showVideoIntro, setShowVideoIntro] = useState(false);
  // Audio refs
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements
    if (!backgroundAudioRef.current) {
      backgroundAudioRef.current = new Audio();
      backgroundAudioRef.current.loop = true;
      backgroundAudioRef.current.volume = 0.5;
    }
    if (!clickAudioRef.current) {
      clickAudioRef.current = new Audio('./media/button.wav');
      clickAudioRef.current.volume = 0.7;
    }
  }, []);

  // Update background audio when selection changes
  useEffect(() => {
    if (backgroundAudioRef.current) {
      if (selectedObjectId) {
        const obj = celestialObjects.find(o => o.id === selectedObjectId);
        if (obj?.audioUrl) {
          if (backgroundAudioRef.current.src !== obj.audioUrl) {
            backgroundAudioRef.current.src = obj.audioUrl;
          }
          backgroundAudioRef.current.play().catch(e => console.log('Audio play prevented:', e));
        } else {
          backgroundAudioRef.current.pause();
        }
      } else {
        backgroundAudioRef.current.pause();
      }
    }
  }, [selectedObjectId]);

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(e => console.log('Click audio play prevented:', e));
    }
  };

  const handleObjectClick = (objectId: string) => {
    playClickSound();
    setSelectedObjectId(objectId);
    setShowVideoIntro(true);
  };

  const handleBack = () => {
    playClickSound();
    setSelectedObjectId(null);
    setShowVideoIntro(false);
  };

  const handleVideoComplete = () => {
    playClickSound();
    setShowVideoIntro(false);
  };

  const handleNext = () => {
    playClickSound();
    if (selectedObjectId) {
      const currentIndex = celestialObjects.findIndex(obj => obj.id === selectedObjectId);
      const nextIndex = (currentIndex + 1) % celestialObjects.length;
      setSelectedObjectId(celestialObjects[nextIndex].id);
      setShowVideoIntro(true);
    }
  };

  const handlePrevious = () => {
    playClickSound();
    if (selectedObjectId) {
      const currentIndex = celestialObjects.findIndex(obj => obj.id === selectedObjectId);
      const previousIndex = (currentIndex - 1 + celestialObjects.length) % celestialObjects.length;
      setSelectedObjectId(celestialObjects[previousIndex].id);
      setShowVideoIntro(true);
    }
  };

  // If an object is selected, show video intro or detail page
  const selectedObject = celestialObjects.find(obj => obj.id === selectedObjectId);
  if (selectedObject) {
    // Show video intro first if not completed
    if (showVideoIntro) {
      return (
          <VideoIntro
              objectName={selectedObject.name}
              videoUrl={selectedObject.videoUrl}
              onComplete={handleVideoComplete}
          />
      );
    }

    // Then show detail page
    return (
        <CelestialObjectDetail
            object={selectedObject}
            onBack={handleBack}
            onNext={handleNext}
            onPrevious={handlePrevious}
        />
    );
  }

  // Otherwise show main experience page
  return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950 to-black -z-10" />

        {/* Secondary gradient overlay for depth */}
        <div className="fixed inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-black/40 -z-10" />

        {/* Star field animation */}
        <GalacticBackground />

        <header className="relative z-10 border-b border-purple-500/20 backdrop-blur-sm bg-black/20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between relative">

              {/* Left: Back button */}
              <motion.button
                  onClick={onNavigateToLanding}
                  className="flex items-center gap-2 text-purple-300 hover:text-purple-600 transition-colors duration-300 group"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
                <span>Back</span>
              </motion.button>

              {/* Center: Title */}
              <motion.div
                  className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h1 className="text-white tracking-wide">SPACE ATLAS</h1>
                <Sparkles className="w-6 h-6 text-purple-400" />
              </motion.div>

              {/* Right: Spacer */}
              <div className="w-20" />
            </div>
          </div>
        </header>


        {/* Main content */}
        <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-purple-200 mb-4 tracking-wider uppercase">
              Select an Space Explorable
            </h2>
            <p className="text-purple-300/70 max-w-2xl mx-auto">
              Select a celestial object to explore its mysteries and discover the wonders of our universe
            </p>
          </motion.div>

          {/* Grid of space objects */}
          <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {spaceObjects.map((object, index) => (
                <motion.div
                    key={object.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 400,
                      damping: 30
                    }}
                >
                  <SpaceObjectCard
                      name={object.name}
                      imageUrl={object.imageUrl}
                      onClick={() => handleObjectClick(object.id)}
                  />
                </motion.div>
            ))}
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-purple-500/20 backdrop-blur-sm bg-black/20 mt-20">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-purple-400/60">
              <p>© 2026 Space Atlas. All rights reserved.
                Original code, UI, animation, 3D assets, and design are fully protected.
                Some media assets are used under license and remain the property of their respective owners.
              </p>
            </div>
          </div>
        </footer>

        {/* Vignette effect */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/40 -z-5" />
      </div>
  );
}