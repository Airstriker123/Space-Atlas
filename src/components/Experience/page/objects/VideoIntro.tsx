import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalacticBackground } from "./GalacticBackground.tsx";
import { Loading } from "../../../Loader/Loading.tsx";

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
                circleAnim: { scale: [2, 0.5, 2], rotate: [0, -180, 0] }
            };
    }

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
};

export function VideoIntro({
                               objectName,
                               videoUrl,
                               onComplete
                           }: VideoIntroProps) {

    const [progress, setProgress] = useState(0);
    const [bufferProgress, setBufferProgress] = useState(0);

    const [videoReady, setVideoReady] = useState(false);
    const [buffering, setBuffering] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [showContinue, setShowContinue] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const completedRef = useRef(false);
    const playRequestedRef = useRef(false);
    const initialBufferReadyRef = useRef(false);
    const bufferCheckTimerRef = useRef<number | null>(null);

    const config = useMemo(
        () => getObjectConfig(objectName),
        [objectName]
    );

    /*
     * Initial target.
     *
     * 40% is preferred, but we DO NOT require it if the browser
     * already has enough playable data.
     */
    const MIN_BUFFER_PERCENT = 40;

    /*
     * If the browser has this much playable video ahead,
     * it is safe to start even if the 40% percentage has
     * not been reached.
     */
    const MIN_BUFFER_SECONDS = 10;

    /*
     * ------------------------------------------------------------
     * BUFFERED TIME AHEAD
     * ------------------------------------------------------------
     */

    const getBufferedAhead = useCallback(
        (video: HTMLVideoElement): number => {

            if (
                !Number.isFinite(video.duration) ||
                video.duration <= 0 ||
                video.buffered.length === 0
            ) {
                return 0;
            }

            const currentTime = video.currentTime;

            for (let i = 0; i < video.buffered.length; i++) {

                const start = video.buffered.start(i);
                const end = video.buffered.end(i);

                if (
                    currentTime >= start &&
                    currentTime <= end
                ) {
                    return Math.max(
                        0,
                        end - currentTime
                    );
                }
            }

            return 0;
        },
        []
    );

    /*
     * ------------------------------------------------------------
     * BUFFER PERCENTAGE
     * ------------------------------------------------------------
     */

    const getBufferPercentage = useCallback(
        (video: HTMLVideoElement): number => {

            if (
                !Number.isFinite(video.duration) ||
                video.duration <= 0 ||
                video.buffered.length === 0
            ) {
                return 0;
            }

            const currentTime = video.currentTime;

            /*
             * Prefer the buffered range containing the current
             * playback position.
             */
            for (let i = 0; i < video.buffered.length; i++) {

                const start = video.buffered.start(i);
                const end = video.buffered.end(i);

                if (
                    currentTime >= start &&
                    currentTime <= end
                ) {
                    return Math.min(
                        100,
                        Math.max(
                            0,
                            (end / video.duration) * 100
                        )
                    );
                }
            }

            /*
             * If the current position isn't inside a buffered
             * range, use a range starting close to zero.
             */
            for (let i = 0; i < video.buffered.length; i++) {

                const start = video.buffered.start(i);
                const end = video.buffered.end(i);

                if (start <= 0.5) {

                    return Math.min(
                        100,
                        Math.max(
                            0,
                            (end / video.duration) * 100
                        )
                    );
                }
            }

            return 0;
        },
        []
    );

    /*
     * ------------------------------------------------------------
     * UPDATE BUFFER UI
     * ------------------------------------------------------------
     */

    const updateBufferProgress = useCallback(() => {

        const video = videoRef.current;

        if (!video) return;

        const percentage =
            getBufferPercentage(video);

        setBufferProgress(percentage);

    }, [getBufferPercentage]);

    /*
     * ------------------------------------------------------------
     * UPDATE PLAYBACK UI
     * ------------------------------------------------------------
     */

    const updatePlaybackProgress = useCallback(() => {

        const video = videoRef.current;

        if (
            !video ||
            !Number.isFinite(video.duration) ||
            video.duration <= 0
        ) {
            return;
        }

        const percentage =
            (video.currentTime / video.duration) * 100;

        setProgress(
            Math.min(
                100,
                Math.max(0, percentage)
            )
        );

    }, []);

    /*
     * ------------------------------------------------------------
     * START PLAYBACK
     * ------------------------------------------------------------
     */

    const startPlayback = useCallback(async () => {

        const video = videoRef.current;

        if (!video) return;

        if (
            initialBufferReadyRef.current &&
            !video.paused
        ) {
            return;
        }

        if (playRequestedRef.current) {
            return;
        }

        playRequestedRef.current = true;

        try {

            await video.play();

            console.log(
                '[VideoIntro] Playback started'
            );

        } catch (error) {

            console.warn(
                '[VideoIntro] play() failed:',
                error
            );

        } finally {

            playRequestedRef.current = false;
        }

    }, []);

    /*
     * ------------------------------------------------------------
     * INITIAL BUFFER CHECK
     * ------------------------------------------------------------
     *
     * IMPORTANT:
     *
     * We no longer require 40% unconditionally.
     *
     * A video can be perfectly playable with much less than
     * 40% buffered.
     */

    const checkInitialBuffer = useCallback(() => {

        const video = videoRef.current;

        if (
            !video ||
            initialBufferReadyRef.current
        ) {
            return;
        }

        const bufferPercent =
            getBufferPercentage(video);

        const bufferedAhead =
            getBufferedAhead(video);

        setBufferProgress(bufferPercent);

        console.log(
            '[VideoIntro] Buffer check:',
            {
                bufferPercent:
                    bufferPercent.toFixed(2) + '%',

                bufferedAhead:
                    bufferedAhead.toFixed(2) + 's',

                readyState:
                video.readyState,

                networkState:
                video.networkState,

                duration:
                video.duration
            }
        );

        /*
         * CONDITION 1:
         *
         * Preferred 40% preload.
         */
        if (
            bufferPercent >= MIN_BUFFER_PERCENT
        ) {

            console.log(
                '[VideoIntro] 40% buffer reached'
            );

            initialBufferReadyRef.current = true;

            setVideoReady(true);
            setBuffering(false);

            startPlayback();

            return;
        }

        /*
         * CONDITION 2:
         *
         * At least 10 seconds of playable video.
         *
         * This prevents short/oddly packaged videos from
         * getting stuck waiting for 40%.
         */
        if (
            video.readyState >=
            HTMLMediaElement.HAVE_FUTURE_DATA &&
            bufferedAhead >= MIN_BUFFER_SECONDS
        ) {

            console.log(
                '[VideoIntro] Enough playable data available'
            );

            initialBufferReadyRef.current = true;

            setVideoReady(true);
            setBuffering(false);

            startPlayback();

            return;
        }

        /*
         * CONDITION 3:
         *
         * Browser itself says it has enough data.
         */
        if (
            video.readyState >=
            HTMLMediaElement.HAVE_ENOUGH_DATA
        ) {

            console.log(
                '[VideoIntro] Browser reports enough data'
            );

            initialBufferReadyRef.current = true;

            setVideoReady(true);
            setBuffering(false);

            startPlayback();
        }

    }, [
        getBufferPercentage,
        getBufferedAhead,
        startPlayback
    ]);

    /*
     * ------------------------------------------------------------
     * BUFFER MONITOR
     * ------------------------------------------------------------
     */

    useEffect(() => {

        if (!videoUrl) {
            return;
        }

        const video = videoRef.current;

        if (!video) {
            return;
        }

        const check = () => {
            checkInitialBuffer();
        };

        video.addEventListener(
            "progress",
            check
        );

        video.addEventListener(
            "loadedmetadata",
            check
        );

        video.addEventListener(
            "durationchange",
            check
        );

        video.addEventListener(
            "canplay",
            check
        );

        video.addEventListener(
            "canplaythrough",
            check
        );

        bufferCheckTimerRef.current =
            window.setInterval(
                check,
                250
            );

        return () => {

            video.removeEventListener(
                "progress",
                check
            );

            video.removeEventListener(
                "loadedmetadata",
                check
            );

            video.removeEventListener(
                "durationchange",
                check
            );

            video.removeEventListener(
                "canplay",
                check
            );

            video.removeEventListener(
                "canplaythrough",
                check
            );

            if (
                bufferCheckTimerRef.current !== null
            ) {
                clearInterval(
                    bufferCheckTimerRef.current
                );

                bufferCheckTimerRef.current = null;
            }
        };

    }, [
        videoUrl,
        checkInitialBuffer
    ]);

    /*
     * ------------------------------------------------------------
     * METADATA
     * ------------------------------------------------------------
     */

    const handleLoadedMetadata = () => {

        const video = videoRef.current;

        if (!video) return;

        console.log(
            '[VideoIntro] Metadata loaded',
            {
                duration:
                video.duration,

                readyState:
                video.readyState,

                networkState:
                video.networkState,

                buffered:
                video.buffered.length
            }
        );

        updateBufferProgress();
        checkInitialBuffer();
    };

    /*
     * ------------------------------------------------------------
     * CAN PLAY
     * ------------------------------------------------------------
     */

    const handleCanPlay = () => {

        const video = videoRef.current;

        if (!video) return;

        console.log(
            '[VideoIntro] Can play',
            {
                readyState:
                video.readyState,

                bufferedAhead:
                    getBufferedAhead(video),

                bufferedPercent:
                    getBufferPercentage(video)
            }
        );

        checkInitialBuffer();
    };

    /*
     * ------------------------------------------------------------
     * CAN PLAY THROUGH
     * ------------------------------------------------------------
     */

    const handleCanPlayThrough = () => {

        const video = videoRef.current;

        if (!video) return;

        console.log(
            '[VideoIntro] Can play through'
        );

        checkInitialBuffer();
    };

    /*
     * ------------------------------------------------------------
     * PLAYING
     * ------------------------------------------------------------
     */

    const handlePlaying = () => {

        console.log(
            '[VideoIntro] Playing'
        );

        setVideoReady(true);
        setBuffering(false);

        updateBufferProgress();
        updatePlaybackProgress();
    };

    /*
     * ------------------------------------------------------------
     * WAITING
     * ------------------------------------------------------------
     */

    const handleWaiting = () => {

        console.log(
            '[VideoIntro] Buffering...'
        );

        setBuffering(true);

        updateBufferProgress();
    };

    /*
     * ------------------------------------------------------------
     * STALLED
     * ------------------------------------------------------------
     */

    const handleStalled = () => {

        console.warn(
            '[VideoIntro] Network stalled'
        );

        setBuffering(true);

        updateBufferProgress();
    };

    /*
     * ------------------------------------------------------------
     * PROGRESS
     * ------------------------------------------------------------
     */

    const handleProgress = () => {

        updateBufferProgress();
        checkInitialBuffer();
    };

    /*
     * ------------------------------------------------------------
     * TIME UPDATE
     * ------------------------------------------------------------
     */

    const handleTimeUpdate = () => {

        updatePlaybackProgress();
        updateBufferProgress();
    };

    /*
     * ------------------------------------------------------------
     * ENDED
     * ------------------------------------------------------------
     */

    const handleVideoEnded = () => {

        if (completedRef.current) {
            return;
        }

        completedRef.current = true;

        console.log(
            '[VideoIntro] Video ended'
        );

        setProgress(100);
        setBufferProgress(100);
        setBuffering(false);
        setShowContinue(true);

        onComplete();
    };

    /*
     * ------------------------------------------------------------
     * SKIP
     * ------------------------------------------------------------
     */

    const handleSkip = () => {

        if (completedRef.current) {
            return;
        }

        completedRef.current = true;

        const video = videoRef.current;

        if (video) {
            video.pause();
        }

        setShowContinue(true);
        setBuffering(false);

        onComplete();
    };

    /*
     * ------------------------------------------------------------
     * ERROR
     * ------------------------------------------------------------
     */

    const handleVideoError = () => {

        const video = videoRef.current;

        console.error(
            '[VideoIntro] VIDEO ERROR',
            video?.error
        );

        if (video?.error) {

            console.error(
                '[VideoIntro] Error details',
                {
                    code:
                    video.error.code,

                    message:
                    video.error.message
                }
            );
        }

        setVideoError(true);
        setBuffering(false);
    };

    /*
     * ------------------------------------------------------------
     * SMOOTH PROGRESS UPDATES
     * ------------------------------------------------------------
     */

    useEffect(() => {

        if (!videoReady) {
            return;
        }

        let animationFrame = 0;

        const update = () => {

            updatePlaybackProgress();
            updateBufferProgress();

            animationFrame =
                requestAnimationFrame(update);
        };

        animationFrame =
            requestAnimationFrame(update);

        return () => {

            cancelAnimationFrame(
                animationFrame
            );
        };

    }, [
        videoReady,
        updatePlaybackProgress,
        updateBufferProgress
    ]);

    /*
     * ------------------------------------------------------------
     * RESET WHEN URL CHANGES
     * ------------------------------------------------------------
     */

    useEffect(() => {

        completedRef.current = false;
        playRequestedRef.current = false;
        initialBufferReadyRef.current = false;

        setProgress(0);
        setBufferProgress(0);
        setVideoReady(false);
        setBuffering(false);
        setVideoError(false);
        setShowContinue(false);

    }, [videoUrl]);

    /*
     * ------------------------------------------------------------
     * CLEANUP
     * ------------------------------------------------------------
     */

    useEffect(() => {

        return () => {

            if (
                bufferCheckTimerRef.current !== null
            ) {
                clearInterval(
                    bufferCheckTimerRef.current
                );

                bufferCheckTimerRef.current = null;
            }

            const video =
                videoRef.current;

            if (video) {
                video.pause();
            }
        };

    }, []);

    /*
     * ------------------------------------------------------------
     * RENDER
     * ------------------------------------------------------------
     */

    return (
        <div className="min-h-screen relative overflow-hidden">

            {!videoReady && !videoError && (
                <Loading />
            )}

            {videoReady && (
                <GalacticBackground />
            )}

            {videoUrl &&
                !videoError &&
                !showContinue && (

                    <video
                        ref={videoRef}

                        src={videoUrl}

                        preload="auto"

                        autoPlay={false}

                        muted

                        playsInline

                        onLoadedMetadata={
                            handleLoadedMetadata
                        }

                        onCanPlay={
                            handleCanPlay
                        }

                        onCanPlayThrough={
                            handleCanPlayThrough
                        }

                        onPlaying={
                            handlePlaying
                        }

                        onWaiting={
                            handleWaiting
                        }

                        onStalled={
                            handleStalled
                        }

                        onProgress={
                            handleProgress
                        }

                        onTimeUpdate={
                            handleTimeUpdate
                        }

                        onEnded={
                            handleVideoEnded
                        }

                        onError={
                            handleVideoError
                        }

                        className={`
                            bg-black
                            absolute inset-0
                            w-full h-full
                            object-cover
                            z-0
                            transition-opacity
                            duration-1000
                            ${
                            videoReady
                                ? 'opacity-100'
                                : 'opacity-0'
                        }
                        `}
                    />
                )
            }

            <div
                className="
                    relative
                    z-10
                    min-h-screen
                    flex
                    flex-col
                    items-center
                    justify-center
                "
            >

                <div
                    className="
                        fixed
                        inset-0
                        overflow-hidden
                        pointer-events-none
                    "
                >

                    <AnimatePresence>

                        {!videoReady &&
                            !videoError && (

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    className="
                                        absolute
                                        bottom-30
                                        left-0
                                        right-0
                                        px-6
                                        md:px-12
                                    "
                                >

                                    <div
                                        className="
                                            max-w-2xl
                                            mx-auto
                                        "
                                    >

                                        <div
                                            className="
                                                mb-3
                                                text-center
                                            "
                                        >

                                            <p
                                                className={`
                                                    ${config.textLight}
                                                    text-sm
                                                    md:text-base
                                                `}
                                            >
                                                Loading media from server...
                                            </p>

                                        </div>

                                        <div
                                            className="
                                                h-1.5
                                                bg-black/50
                                                rounded-full
                                                overflow-hidden
                                                backdrop-blur-sm
                                                border
                                                border-white/10
                                            "
                                        >

                                            <motion.div
                                                className={`
                                                    h-full
                                                    bg-gradient-to-r
                                                    ${config.progress}
                                                    rounded-full
                                                `}
                                                style={{
                                                    width:
                                                        `${bufferProgress}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                </motion.div>
                            )
                        }

                        {!showContinue &&
                            videoReady && (

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    className="
                                        absolute
                                        bottom-30
                                        left-0
                                        right-0
                                        px-6
                                        md:px-12
                                    "
                                >

                                    <div
                                        className="
                                            max-w-2xl
                                            mx-auto
                                        "
                                    >

                                        <div
                                            className="
                                                mb-3
                                                text-center
                                            "
                                        >

                                            <p
                                                className={`
                                                    ${config.textLight}
                                                    text-sm
                                                    md:text-base
                                                `}
                                            >
                                                {buffering
                                                    ? 'Buffering...'
                                                    : `Formation of ${objectName}`
                                                }
                                            </p>

                                        </div>

                                        <div
                                            className="
                                                h-1.5
                                                bg-black/50
                                                rounded-full
                                                overflow-hidden
                                                backdrop-blur-sm
                                                border
                                                border-white/10
                                            "
                                        >

                                            <motion.div
                                                className={`
                                                    h-full
                                                    bg-gradient-to-r
                                                    ${config.progress}
                                                    rounded-full
                                                `}
                                                style={{
                                                    width: `${
                                                        buffering
                                                            ? bufferProgress
                                                            : progress
                                                    }%`
                                                }}
                                                transition={{
                                                    duration: 0.05,
                                                    ease: 'linear'
                                                }}
                                            />

                                        </div>

                                    </div>

                                </motion.div>
                            )
                        }

                    </AnimatePresence>

                </div>

                {!showContinue &&
                    !videoError && (

                        <motion.button
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: 1,
                                duration: 0.6
                            }}
                            onClick={handleSkip}
                            className={`
                                fixed
                                bottom-8
                                left-1/2
                                -translate-x-1/2
                                z-20
                                px-6
                                py-3
                                ${config.textLight}
                                hover:text-white
                                border
                                ${config.border1}
                                hover:bg-white/10
                                rounded-full
                                transition-all
                                duration-300
                                backdrop-blur-sm
                            `}
                            whileHover={{
                                scale: 1.05
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                        >
                            Skip Introduction
                        </motion.button>
                    )}

            </div>

            {videoError && (

                <div
                    className="
                        fixed
                        inset-0
                        z-30
                        flex
                        items-center
                        justify-center
                        bg-black
                    "
                >

                    <div
                        className="
                            text-center
                            px-6
                        "
                    >

                        <p
                            className={`
                                ${config.textLight}
                                text-lg
                                mb-4
                            `}
                        >
                            Unable to load introduction video.
                        </p>

                        <button
                            onClick={handleSkip}
                            className={`
                                px-6
                                py-3
                                ${config.textLight}
                                border
                                ${config.border1}
                                hover:bg-white/10
                                rounded-full
                                transition-all
                            `}
                        >
                            Continue
                        </button>

                    </div>

                </div>
            )}

            {showContinue && (

                <motion.div>

                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            pointer-events-none
                        "
                    >

                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className={`
                                w-96
                                h-96
                                md:w-[600px]
                                md:h-[600px]
                                rounded-full
                                ${config.glowPrimary}
                                blur-3xl
                            `}
                        />

                    </div>

                    <div
                        className={`
                            fixed
                            top-20
                            left-10
                            w-96
                            h-96
                            ${config.glowPrimary}
                            rounded-full
                            blur-3xl
                            pointer-events-none
                        `}
                    />

                    <div
                        className={`
                            fixed
                            bottom-20
                            right-10
                            w-96
                            h-96
                            ${config.glowSecondary}
                            rounded-full
                            blur-3xl
                            pointer-events-none
                        `}
                    />

                </motion.div>
            )}

        </div>
    );
}