// src/components/FilterWizard/SolGrid/SolGrid.tsx
import React, { useState, useMemo } from "react";
import styles from "./SolGrid.module.css";
import { getMaxPhotosCount, getPhotosIntensity, getSolTotalPhotos } from "@/utils/manifest.util";

interface SolGridProps {
    selectedSol: number;
    maxSol: number;
    onSolSelect: (sol: number) => void;
    onDoubleClick: () => void;
}

export default function SolGrid({
    maxSol,
    selectedSol,
    onSolSelect,
    onDoubleClick
}: SolGridProps) {
    const [hoveredSol, setHoveredSol] = useState<number | null>(null);

    // Calcular máximo de fotos una sola vez
    const maxPhotos = useMemo(() => {
        return getMaxPhotosCount() || 0;
    }, []);

    // Generar array de sols
    const sols = useMemo(() => {
        return Array.from({ length: maxSol + 1 }, (_, i) => i);
    }, [maxSol]);

    // Pre-calcular intensidades para mejor performance
    const solIntensities = useMemo(() => {
        const intensities: { [key: number]: number } = {};
        if (sols.length && maxPhotos) {
            sols.forEach(sol => {
                const photosCount = getSolTotalPhotos(sol);
                intensities[sol] = getPhotosIntensity(photosCount, maxPhotos);
            });
        }
        return intensities;
    }, [sols, maxPhotos]);

    const getSolStatus = (sol: number) => {
        if (sol === selectedSol) return "selected";
        if (sol === hoveredSol) return "hovered";
        return "default";
    };

    const getSolColorIntensity = (sol: number): number => {
        return solIntensities[sol] || 0;
    };

    // Agrupar sols en chunks
    const chunkSize = 50;
    const solChunks = useMemo(() => {
        const chunks = [];
        for (let i = 0; i < sols.length; i += chunkSize) {
            chunks.push(sols.slice(i, i + chunkSize));
        }
        return chunks;
    }, [sols]);

    // Handler de click más eficiente
    const handleSolClick = (sol: number) => {
        onSolSelect(sol);
    };

    return (
        <div className={styles.gridContainer}>
            {/* Header del componente */}
            <div className={styles.header}>
                <h3 className={styles.title}>Select a Mission Day (Sol)</h3>
                <p className={styles.subtitle}>
                    {hoveredSol !== null
                        ? `Sol ${hoveredSol} - ${getSolTotalPhotos(hoveredSol)} photos`
                        : selectedSol !== undefined
                            ? `Sol ${selectedSol} selected - ${getSolTotalPhotos(selectedSol)} photos`
                            : `Total: ${maxSol + 1} mission days - Heatmap shows photo activity`
                    }
                </p>
            </div>

            {/* Sol Tiles Mapping , Grid de selecci'on de Sol */}
            <div className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {solChunks.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className={styles.row}>
                            {chunk.map((sol) => {
                                const status = getSolStatus(sol);
                                const intensity = getSolColorIntensity(sol);

                                return (
                                    // sol square component
                                    <div
                                        key={sol}
                                        className={`${styles.solCell} ${styles[status]}`}
                                        style={{
                                            // Mapa de calor basado en intensidad
                                            backgroundColor: status === "default"
                                                ? (intensity ? (
                                                    `hsl(217, 71%, ${70 - (intensity * 40)}%)`

                                                ) : (
                                                    `hsl(217, 71%, 80%)`
                                                )
                                                ) // Azul: más oscuro = más fotos
                                                : undefined,
                                        }}
                                        onDoubleClick={onDoubleClick}
                                        onClick={() => handleSolClick(sol)}
                                        onMouseEnter={() => setHoveredSol(sol)}
                                        onMouseLeave={() => setHoveredSol(null)}
                                        title={`Sol ${sol} - ${getSolTotalPhotos(sol)} photos`}
                                    >
                                        <span className={styles.solNumber}>
                                            {sol === selectedSol ? sol : ""}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* info footer del componente */}
            <div className={styles.footer}>
                <div className={styles.legend}>
                    <div className={styles.legendItem}>
                        <div className={styles.legendGradient}></div>
                        <span>Few photos → Many photos</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={`${styles.legendColor} ${styles.selected}`}></div>
                        <span>Selected</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={`${styles.legendColor} ${styles.hovered}`}></div>
                        <span>Hover</span>
                    </div>
                </div>
            </div>
        </div>
    );
}