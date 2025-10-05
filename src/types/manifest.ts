// src/types/marsTypes.ts
export interface SolManifest {
    sol: number;
    earth_date: string;
    total_photos: number;
    cameras: string[];
}

export interface PhotoManifest {
    photo_manifest: {
        name: string;
        landing_date: string;
        launch_date: string;
        status: string;
        max_sol: number;
        max_date: string;
        total_photos: number;
        photos: SolManifest[];
    }
}