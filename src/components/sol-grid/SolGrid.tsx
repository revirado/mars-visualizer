// src/components/FilterWizard/SolGrid/SolGrid.tsx
import React, { useState, useMemo } from "react";
import styles from "./SolGrid.module.css";

interface SolGridProps {
    selectedSol: number;
    maxSol: number;
    onSolSelect: (sol: number) => void;
}

export default function SolGrid({ selectedSol, maxSol, onSolSelect }: SolGridProps) {
    const [hoveredSol, setHoveredSol] = useState<number | null>(null);

    // Generar array de sols desde 0 hasta maxSol
    const sols = useMemo(() => {
        return Array.from({ length: maxSol + 1 }, (_, i) => i);
    }, [maxSol]);

    // Agrupar sols en chunks para el grid
    const chunkSize = 50; // 50 columnas por fila
    const solChunks = useMemo(() => {
        const chunks = [];
        for (let i = 0; i < sols.length; i += chunkSize) {
            chunks.push(sols.slice(i, i + chunkSize));
        }
        return chunks;
    }, [sols]);

    const getSolStatus = (sol: number) => {
        if (sol === selectedSol) return "selected";
        if (sol === hoveredSol) return "hovered";
        return "default";
    };

    return (
        <div className={styles.gridContainer}>
            <div className={styles.header}>
                <h3 className={styles.title} >Select a Sol (Martian Day)</h3>
                <p className={styles.subtitle}>
                    {hoveredSol !== null
                        ? `Sol ${hoveredSol}`
                        : selectedSol !== undefined
                            ? `Sol ${selectedSol} selected`
                            : `Total: ${maxSol + 1} sols available`
                    }
                </p>
            </div>

            <div className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {solChunks.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className={styles.row}>
                            {chunk.map((sol) => (
                                <button
                                    key={sol}
                                    className={`${styles.solCell} ${styles[getSolStatus(sol)]}`}
                                    onClick={() => onSolSelect(sol)}
                                    onMouseEnter={() => setHoveredSol(sol)}
                                    onMouseLeave={() => setHoveredSol(null)}
                                    title={`Sol ${sol}`}
                                >
                                    <span className={styles.solNumber}>
                                        {sol === selectedSol ? sol : ""}
                                    </span>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.legend}>
                    <div className={styles.legendItem}>
                        <div className={`${styles.legendColor} ${styles.selected}`}></div>
                        <span>Selected</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={`${styles.legendColor} ${styles.hovered}`}></div>
                        <span>Hover</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={`${styles.legendColor} ${styles.default}`}></div>
                        <span>Available</span>
                    </div>
                </div>
            </div>
        </div>
    );
}