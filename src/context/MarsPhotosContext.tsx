"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getMarsPhotoUrls } from "@/handlers/getMarsPhotoUrls.handler";
import manifest from "@/assets/data/manifests-perseverance.json";
import { PhotoManifest, SolManifest } from "@/types/manifest";

interface MarsPhotosContextValue {
    photoUrls: string[];
    camName?: string;
    loading: boolean;
    error: string | null;
    page?: number;
    maxSol: number;
    sol?: number;
    earthDate?: string;
    totalPhotos?: number;
    availableCameras: string[];
    refresh: () => void;
    setSol?: (sol: number) => void;
    setPage?: (page: number | undefined) => void;
    setCamName?: (camName: string) => void;
}

const MarsPhotosContext = createContext<MarsPhotosContextValue | undefined>(undefined);

export const useMarsPhotos = () => {
    const context = useContext(MarsPhotosContext);
    if (!context) {
        throw new Error("useMarsPhotos must be used within a MarsPhotosProvider");
    }
    return context;
};

export const MarsPhotosProvider = ({ children }: { children: ReactNode }) => {
    const maxSol = manifest.photo_manifest.max_sol;
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [availableCameras, setAvailableCameras] = useState<string[]>([]);
    const [earthDate, setEarthDate] = useState<string>("");
    const [totalPhotos, setTotalPhotos] = useState<number>(0);

    // request params
    const [sol, setSol] = useState<number>(maxSol);
    const [camName, setCamName] = useState<string>("");
    const [page, setPage] = useState<number | undefined>(undefined);

    // Actualizar cámaras disponibles cuando cambia el sol
    useEffect(() => {
        const solManifest = (manifest as PhotoManifest).photo_manifest.photos.find(
            (photo: SolManifest) => photo.sol === sol
        );

        if (solManifest) {
            setAvailableCameras(solManifest.cameras);
            setEarthDate(solManifest.earth_date);
            setTotalPhotos(solManifest.total_photos);

            // Si la cámara actual no está disponible, resetearla
            if (!solManifest.cameras.includes(camName)) {
                setCamName("");
            }
        }else{
            setAvailableCameras([]);
            setEarthDate("");
            setTotalPhotos(0);
            setCamName("");
        }
    }, [sol, camName]);

    const fetchPhotos = async () => {
        if (!camName) {
            setError("Por favor, selecciona una cámara.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const urls = await getMarsPhotoUrls({
                sol: sol,
                camName: camName,
                pagination: page,
            });
            setPhotoUrls(urls);
        } catch (err) {
            setError("Error al obtener las fotos.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MarsPhotosContext.Provider value={{
            photoUrls,
            loading,
            camName,
            error,
            maxSol,
            sol,
            page,
            earthDate,
            totalPhotos,
            availableCameras,
            refresh: fetchPhotos,
            setCamName,
            setPage,
            setSol,
        }}>
            {children}
        </MarsPhotosContext.Provider>
    );
};