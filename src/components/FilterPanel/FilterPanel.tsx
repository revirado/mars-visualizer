// src/components/FilterPanel/FilterPanel.tsx
import React from "react";
import styles from "./FilterPanel.module.css";

interface FilterPanelProps {
    sol: number;
    maxSol: number;
    earthDate?: string;
    camName: string;
    page: number;
    totalPhotos?: number;
    availableCameras: string[];
    onSolChange: (sol: number) => void;
    onCamChange: (camera: string) => void;
    onPageChange: (page: number) => void;
    onRefresh: () => void;
}

export default function FilterPanel({
    sol,
    maxSol,
    earthDate,
    camName,
    page,
    totalPhotos,
    availableCameras,
    onSolChange,
    onCamChange,
    onPageChange,
    onRefresh,
}: FilterPanelProps) {
    const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0 && value <= maxSol) {
            onSolChange(value);
        }
    };

    return (
        <section className={styles.panel}>
            <div className={styles.grid}>
                {/* Selector de Sol */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        Mission Day (Sol)
                        <span className={styles.maxSol}>Max: {maxSol}</span>
                    </label>
                    <div className={styles.inputGroup}>
                        <input
                            type="number"
                            min={0}
                            max={maxSol}
                            value={sol}
                            onChange={handleSolChange}
                            className={styles.input}
                        />
                        {earthDate && (
                            <span className={styles.earthDate}>
                                {earthDate}
                            </span>
                        )}
                    </div>
                </div>

                {/* Selector de Cámara */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        Camera
                    </label>
                    <select
                        value={camName}
                        onChange={(e) => onCamChange(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Select a camera</option>
                        {availableCameras.map((cam) => (
                            <option key={cam} value={cam}>
                                {cam}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selector de Página */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        Page
                    </label>
                    <input
                        type="number"
                        min={1}
                        value={page}
                        onChange={(e) => onPageChange(Number(e.target.value))}
                        className={styles.input}
                    />
                </div>

                {/* Botón de acción */}
                <div className={styles.field}>
                    <label className={styles.label}>&nbsp;</label>
                    <div className={styles.actionGroup}>
                        <button
                            onClick={onRefresh}
                            disabled={!camName}
                            className={styles.refreshButton}
                        >
                            <SearchIcon />
                            Search Photos
                        </button>
                        {totalPhotos !== undefined && (
                            <span className={styles.photosCount}>
                                {totalPhotos.toLocaleString()} fotos
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Icono simple de búsqueda
function SearchIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}