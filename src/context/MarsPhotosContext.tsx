"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getMarsPhotoUrls } from "@/handlers/getMarsPhotoUrls.handler";

interface MarsPhotosContextValue {
    photoUrls: string[];
    loading: boolean;
    error: string | null;
    refresh: () => void;
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPhotos = async () => {
        setLoading(true);
        setError(null);
        try {
            const urls = await getMarsPhotoUrls();
            setPhotoUrls(urls);
        } catch (err) {
            setError("Error al obtener las fotos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <MarsPhotosContext.Provider value={{ photoUrls, loading, error, refresh: fetchPhotos }}>
            {children}
        </MarsPhotosContext.Provider>
    );
};