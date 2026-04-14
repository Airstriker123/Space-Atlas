import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { GalacticBackground } from './GalacticBackground';

interface VideoIntroProps {
    objectName: string;
    videoUrl?: string;
    onComplete: () => void;
}

const getObjectConfig = (name: string) => {
    switch (name) {
        case 'Earth':
            return {
                glowPrimary: 'bg-blue-600/20',
                glowSecondary: 'bg-green-500/20',
                border1: 'border-blue-500/30',
                border2: 'border-green-400/30',
                border3: 'border-blue-300/30',
                text: 'text-blue-400',
                textLight: 'text-blue-300',
                particle: 'bg-blue-400',
                progress: 'from-blue-600 via-green-500 to-blue-400',
                btn: 'from-blue-600 to-green-500 hover:from-blue-500 hover:to-green-400',
                btnShadow: 'shadow-blue-500/50',
                shadowColor: 'rgba(59, 130, 246, 0.4)',
                shadowColorHover: 'rgba(59, 130, 246, 0.6)',
                gradientOverlay: 'from-blue-950/40',
                particleCount: 35,
                circleAnim: { scale: [1, 2, 1], rotate: [0, 90, 0] }
            };
        case 'Jupiter':
            return {
                glowPrimary: 'bg-orange-600/20',
                glowSecondary: 'bg-red-500/20',
                border1: 'border-orange-500/30',
                border2: 'border-red-400/30',
                border3: 'border-amber-300/30',
                text: 'text-orange-400',
                textLight: 'text-orange-300',
                particle: 'bg-orange-400',
                progress: 'from-orange-600 via-red-500 to-amber-400',
                btn: 'from-orange-600 to-red-500 hover:from-orange-500 hover:to-red-400',
                btnShadow: 'shadow-orange-500/50',
                shadowColor: 'rgba(249, 115, 22, 0.4)',
                shadowColorHover: 'rgba(249, 115, 22, 0.6)',
                gradientOverlay: 'from-orange-950/40',
                particleCount: 40,
                circleAnim: { scale: [1, 2.2, 1], rotate: [0, 180, 0] }
            };
        case 'Stars':
            return {
                glowPrimary: 'bg-yellow-500/20',
                glowSecondary: 'bg-amber-400/20',
                border1: 'border-yellow-400/30',
                border2: 'border-white/30',
                border3: 'border-amber-300/30',
                text: 'text-yellow-300',
                textLight: 'text-yellow-200',
                particle: 'bg-yellow-200',
                progress: 'from-yellow-500 via-white to-yellow-300',
                btn: 'from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400',
                btnShadow: 'shadow-yellow-500/50',
                shadowColor: 'rgba(234, 179, 8, 0.4)',
                shadowColorHover: 'rgba(234, 179, 8, 0.6)',
                gradientOverlay: 'from-yellow-950/40',
                particleCount: 60,
                circleAnim: { scale: [1, 3, 1], rotate: [0, 45, 0] }
            };
        case 'Neutron Stars':
            return {
                glowPrimary: 'bg-cyan-600/20',
                glowSecondary: 'bg-blue-500/20',
                border1: 'border-cyan-500/30',
                border2: 'border-teal-400/30',
                border3: 'border-blue-300/30',
                text: 'text-cyan-400',
                textLight: 'text-cyan-300',
                particle: 'bg-cyan-200',
                progress: 'from-cyan-600 via-teal-500 to-blue-400',
                btn: 'from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400',
                btnShadow: 'shadow-cyan-500/50',
                shadowColor: 'rgba(6, 182, 212, 0.4)',
                shadowColorHover: 'rgba(6, 182, 212, 0.6)',
                gradientOverlay: 'from-cyan-950/40',
                particleCount: 50,
                circleAnim: { scale: [0.8, 2.5, 0.8], rotate: [0, 360, 0] }
            };
        case 'Black Holes':
            return {
                glowPrimary: 'bg-red-900/20',
                glowSecondary: 'bg-orange-900/20',
                border1: 'border-red-900/50',
                border2: 'border-orange-900/50',
                border3: 'border-red-800/30',
                text: 'text-red-500',
                textLight: 'text-red-400',
                particle: 'bg-red-500',
                progress: 'from-black via-red-900 to-red-600',
                btn: 'from-red-900 to-black hover:from-red-800 hover:to-gray-900 border border-red-500/30',
                btnShadow: 'shadow-red-900/50',
                shadowColor: 'rgba(127, 29, 29, 0.4)',
                shadowColorHover: 'rgba(127, 29, 29, 0.6)',
                gradientOverlay: 'from-red-950/40',
                particleCount: 45,
                circleAnim: { scale: [2, 0.5, 2], rotate: [0, -180, 0] } // sucking in effect
            };
        case 'Galaxies':
        default:
            return {
                glowPrimary: 'bg-purple-600/20',
                glowSecondary: 'bg-purple-500/20',
                border1: 'border-purple-500/30',
                border2: 'border-purple-400/30',
                border3: 'border-purple-300/30',
                text: 'text-purple-400',
                textLight: 'text-purple-300',
                particle: 'bg-purple-400',
                progress: 'from-purple-600 via-purple-500 to-purple-400',
                btn: 'from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400',
                btnShadow: 'shadow-purple-500/50',
                shadowColor: 'rgba(168, 85, 247, 0.4)',
                shadowColorHover: 'rgba(168, 85, 247, 0.6)',
                gradientOverlay: 'from-purple-950/40',
                particleCount: 30,
                circleAnim: { scale: [1, 2, 1], rotate: [0, 0, 0] }
            };
    }
};

export function VideoIntro({ objectName, videoUrl, onComplete }: VideoIntroProps) {
    const [progress, setProgress] = useState(0);
    const [showContinue, setShowContinue] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const config = useMemo(() => getObjectConfig(objectName), [objectName]);

    useEffect(() => {
        // Simulate loading/introduction progress
        const duration = 5000; // 5 seconds
        const interval = 50; // Update every 50ms
        const increment = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + increment;
                if (newProgress >= 100) {
                    clearInterval(timer);
                    setShowContinue(true);
                    return 100;
                }
                return newProgress;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            {/* Animated background */}
            <GalacticBackground />

            {/* Video layer */}
            {videoUrl && !videoError && (
                <video
                    ref={videoRef}
                    src={videoUrl}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-50' : 'opacity-0'}`}
                    onCanPlay={() => setVideoLoaded(true)}
                    onError={() => setVideoError(true)}
                />
            )}

            {/* Thematic gradient overlay */}
            <div className={`fixed inset-0 bg-gradient-to-br ${config.gradientOverlay} via-black/80 to-black pointer-events-none z-0`} />

            {/* Main content - Full viewport */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
                {/* Animated visual container - Full viewport */}
                <div className="fixed inset-0 overflow-hidden">
                    {/* Animated circles */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{
                                scale: config.circleAnim.scale,
                                rotate: config.circleAnim.rotate,
                                opacity: [0.3, 0.1, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute w-32 h-32 rounded-full border-2 ${config.border1}`}
                        />
                        <motion.div
                            animate={{
                                scale: config.circleAnim.scale.map(s => typeof s === 'number' ? s * 1.25 : s),
                                rotate: config.circleAnim.rotate,
                                opacity: [0.3, 0, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className={`absolute w-32 h-32 rounded-full border-2 ${config.border2}`}
                        />
                        <motion.div
                            animate={{
                                scale: config.circleAnim.scale.map(s => typeof s === 'number' ? s * 1.5 : s),
                                rotate: config.circleAnim.rotate,
                                opacity: [0.3, 0, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className={`absolute w-32 h-32 rounded-full border-2 ${config.border3}`}
                        />
                    </div>

                    {/* Central glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className={`w-96 h-96 md:w-[600px] md:h-[600px] rounded-full ${config.glowPrimary} blur-3xl`}
                        />
                    </div>

                    {/* Title at top */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-20 left-0 right-0 text-center px-4"
                    >
                        <motion.div
                            animate={{
                                rotate: 360,
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="inline-block mb-6"
                        >
                            <Sparkles className={`w-16 h-16 ${config.text}`} />
                        </motion.div>

                        <h1 className="text-white mb-4 tracking-wider">
                            Entering {objectName}
                        </h1>
                        <div className={`h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-current to-transparent rounded-full ${config.text}`} />
                    </motion.div>

                    {/* Object name in center */}
                    <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-white text-4xl md:text-6xl lg:text-7xl tracking-wider text-center"
                        >
                            {objectName}
                        </motion.h2>
                    </div>

                    {/* Floating particles */}
                    {[...Array(config.particleCount)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * 100 + '%',
                                y: Math.random() * 100 + '%',
                                opacity: 0
                            }}
                            animate={{
                                x: [
                                    Math.random() * 100 + '%',
                                    Math.random() * 100 + '%',
                                    Math.random() * 100 + '%'
                                ],
                                y: [
                                    Math.random() * 100 + '%',
                                    Math.random() * 100 + '%',
                                    Math.random() * 100 + '%'
                                ],
                                opacity: [0, 0.6, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2
                            }}
                            className={`absolute w-1 h-1 ${config.particle} rounded-full`}
                        />
                    ))}

                    {/* Progress overlay at bottom */}
                    <AnimatePresence>
                        {!showContinue && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute bottom-20 left-0 right-0 px-6 md:px-12"
                            >
                                <div className="max-w-2xl mx-auto">
                                    <div className="mb-3 text-center">
                                        <p className={`${config.textLight} text-sm md:text-base`}>Initializing Journey...</p>
                                    </div>
                                    <div className="h-1.5 bg-black/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                                        <motion.div
                                            className={`h-full bg-gradient-to-r ${config.progress} rounded-full`}
                                            style={{ width: `${progress}%` }}
                                            transition={{ duration: 0.1 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Continue button overlay */}
                    <AnimatePresence>
                        {showContinue && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md px-4 z-20"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="mb-6">
                                        <motion.div
                                            className={`w-20 h-20 mx-auto rounded-full ${config.glowPrimary} border-2 ${config.border1} flex items-center justify-center mb-4`}
                                            animate={{
                                                boxShadow: [
                                                    `0 0 20px ${config.shadowColor}`,
                                                    `0 0 40px ${config.shadowColorHover}`,
                                                    `0 0 20px ${config.shadowColor}`
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <svg className={`w-10 h-10 ${config.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                        <h2 className="text-white mb-2 text-2xl font-semibold">Journey Ready</h2>
                                        <p className={`${config.textLight} mb-8`}>
                                            Prepare to explore {objectName}
                                        </p>
                                    </div>

                                    <motion.button
                                        onClick={onComplete}
                                        className={`px-8 py-4 bg-gradient-to-r ${config.btn} text-white rounded-full shadow-lg ${config.btnShadow} transition-all duration-300 tracking-wide font-medium`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Continue to {objectName}
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Skip button (bottom of screen) */}
                {!showContinue && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        onClick={onComplete}
                        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-20 px-6 py-3 ${config.textLight} hover:text-white border ${config.border1} hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Skip Introduction
                    </motion.button>
                )}
            </div>

            {/* Decorative glow effects */}
            <div className={`fixed top-20 left-10 w-96 h-96 ${config.glowPrimary} rounded-full blur-3xl pointer-events-none`} />
            <div className={`fixed bottom-20 right-10 w-96 h-96 ${config.glowSecondary} rounded-full blur-3xl pointer-events-none`} />
        </div>
    );
}
