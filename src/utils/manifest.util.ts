// src/utils/manifestHelpers.ts
import { SolManifest } from "@/types/manifest";
import manifest from "@/assets/data/manifests-perseverance.json";

export const getSolTotalPhotos = (solDate: number): number => {
    const solMatch = manifest.photo_manifest.photos.find(
        (photo: SolManifest) => photo.sol === solDate
    );
    return solMatch ? solMatch.total_photos : 0;
};

export const getMaxPhotosCount = (): number => {
    if (!manifest.photo_manifest.photos.length) return 0;
    return Math.max(...manifest.photo_manifest.photos.map(photo => photo.total_photos));
};

export const getPhotosIntensity = (photosCount: number, maxPhotos: number): number => {
    if (maxPhotos === 0) return 0;
    return Math.min(photosCount / maxPhotos, 1); // Normalizado entre 0 y 1
};