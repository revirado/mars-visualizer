// src/components/ErrorState/ErrorState.tsx
import React from "react";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className={styles.error}>
      <div className={styles.errorIcon}>⚠️</div>
      <h3 className={styles.errorTitle}>Error al cargar las imágenes</h3>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
}