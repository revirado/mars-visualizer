// src/components/ImageGrid/ImageGrid.tsx
import React from "react";
import Image from "next/image";
import styles from "./ImageGrid.module.css";

interface ImageGridProps {
    imageUrls: string[];
    emptyMessage?: string;
}

export default function ImageGrid({ imageUrls, emptyMessage }: ImageGridProps) {
    if (imageUrls.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📷</div>
                <p className={styles.emptyMessage}>
                    {emptyMessage || "No se encontraron imágenes"}
                </p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {imageUrls.map((url, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.imageContainer}>
                        <div className={styles.imageNumber}>{url} </div>
                        {false&&(<Image
                            src={url}
                            alt={`Mars photo ${index + 1}`}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />)}
                    </div>
                    <div className={styles.imageInfo}>
                        <span className={styles.imageNumber}>#{index + 1}</span>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.viewOriginal}
                        >
                            Ver original
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}