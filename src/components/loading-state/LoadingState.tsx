// src/components/LoadingState/LoadingState.tsx
import React from "react";
import styles from "./LoadingState.module.css";

export default function LoadingState() {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando imágenes del rover Perseverance...</p>
        </div>
    );
}