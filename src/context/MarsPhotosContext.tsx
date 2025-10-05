"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { getMarsPhotoUrls } from "@/handlers/getMarsPhotoUrls.handler";

interface MarsPhotosContextValue {
    photoUrls: string[];
    camName?: string;
    loading: boolean;
    error: string | null;
    page?: number;
    sol?: number;
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
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // request params
    const [sol, setSol] = useState<number>(1000);
    const [camName, setCamName] = useState<string>("FRONT_HAZCAM_LEFT_A");
    const [page, setPage] = useState<number | undefined>(undefined);


    const fetchPhotos = async () => {
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
        } finally {
            setLoading(false);
        }
    };

    /* useEffect(() => {
        fetchPhotos();
    }, []); */

    return (
        <MarsPhotosContext.Provider value={{
            photoUrls,
            loading,
            camName,
            error,
            sol,
            page,
            setSol,
            setPage,
            setCamName,
            refresh: fetchPhotos,
        }}>
            {children}
        </MarsPhotosContext.Provider>
    );
};