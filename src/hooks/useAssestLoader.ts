import { useEffect, useState } from "react";

export interface AssetProgress {
    loadedAssets: number;
    totalAssets: number;
    loadedBytes: number;
    totalBytes: number;
    progress: number; // 0–100
}

export function useAssetLoader(assetList: string[]) {
    const [progress, setProgress] = useState<AssetProgress>({
        loadedAssets: 0,
        totalAssets: assetList.length,
        loadedBytes: 0,
        totalBytes: 0,
        progress: 0,
    });

    useEffect(() => {
        let loadedAssets = 0;
        let loadedBytes = 0;
        let totalBytes = 0;

        const loadAsset = async (url: string) => {
            const response = await fetch(url);
            const reader = response.body?.getReader();

            if (!reader) return;

            const contentLength = Number(response.headers.get("Content-Length")) || 0;
            totalBytes += contentLength;

            let received = 0;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                received += value.length;
                loadedBytes += value.length;

                setProgress({
                    loadedAssets,
                    totalAssets: assetList.length,
                    loadedBytes,
                    totalBytes,
                    progress: Math.floor((loadedBytes / totalBytes) * 100),
                });
            }

            loadedAssets++;
            setProgress(prev => ({
                ...prev,
                loadedAssets,
            }));
        };

        assetList.forEach(loadAsset);
    }, []);

    return progress;
}
