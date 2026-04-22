export interface LoadingScreenProps 
{
    progress?: any;
}

export default function LoadingScreen({progress}: LoadingScreenProps): JSX.Element
{
    return (
        <div className="fixed inset-0 bg-black flex flex-col
        items-center justify-center text-cyan-300 font-mono">

            <div className="text-4xl tracking-widest mb-6 animate-pulse">
                SPACE ATLAS
            </div>

            <div className="w-[60%] h-3 bg-cyan-900/30 rounded-full
             overflow-hidden border border-cyan-400/40">
                <div
                    className="h-full bg-gradient-to-r from-cyan-400
                    to-purple-500 transition-all duration-200"
                    style={{ width: `${progress.progress}%` }}
                />
            </div>

            <div className="mt-4 text-lg">
                {progress.progress}% — {progress.loadedAssets}/{progress.totalAssets} assets
            </div>

            <div className="mt-2 text-sm opacity-70">
                {Math.floor(progress.loadedBytes / 1024)} KB /{" "}
                {Math.floor(progress.totalBytes / 1024)} KB
            </div>

            <div className="absolute bottom-10 text-xs opacity-50 tracking-widest">
                LOADING SPACE ATLAS ASSETS…
            </div>
        </div>
    );
}