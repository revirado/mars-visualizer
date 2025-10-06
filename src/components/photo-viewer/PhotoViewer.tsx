// src/components/PhotoViewer/PhotoViewer.tsx
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./PhotoViewer.module.css";
import { useMarsPhotos } from "@/context/MarsPhotosContext";
import { getCameraDisplayName } from "@/utils/string.utils";

interface PhotoViewerProps {
    imageUrls: string[];
    emptyMessage?: string;
}

export default function PhotoViewer({ imageUrls, emptyMessage }: PhotoViewerProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [visibleRange, setVisibleRange] = useState<{ start: number; end: number }>({ start: 0, end: 9 });
    const carouselRef = useRef<HTMLDivElement>(null);
    const { earthDate, camName, sol } = useMarsPhotos();

    const VISIBLE_THUMBNAILS = 7; // maximo de thumbnails visibles a la vez

    // reset selected index cuando cambian las imagenes
    useEffect(() => {
        setSelectedIndex(0);
        setVisibleRange({ start: 0, end: Math.min(VISIBLE_THUMBNAILS - 1, imageUrls.length - 1) });
    }, [imageUrls]);

    // Manejar seleccion de imagen
    const handleSelectImage = (index: number) => {
        setSelectedIndex(index);

        // ajustar rango visible si la imagen seleccionada esta fuera del rango actual
        if (index < visibleRange.start || index > visibleRange.end) {
            const newStart = Math.max(0, index - Math.floor(VISIBLE_THUMBNAILS / 2));
            const newEnd = Math.min(imageUrls.length - 1, newStart + VISIBLE_THUMBNAILS - 1);
            setVisibleRange({ start: newStart, end: newEnd });
        }
    };

    // Navegación con teclado
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handleSelectImage(Math.max(0, selectedIndex - 1));
            } else if (e.key === "ArrowRight") {
                handleSelectImage(Math.min(imageUrls.length - 1, selectedIndex + 1));
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [selectedIndex, imageUrls.length]);

    // Scroll del carousel
    const scrollCarousel = (direction: "left" | "right") => {
        if (direction === "left") {
            const newStart = Math.max(0, visibleRange.start - VISIBLE_THUMBNAILS);
            setVisibleRange({
                start: newStart,
                end: newStart + VISIBLE_THUMBNAILS - 1
            });
        } else {
            const newStart = Math.min(
                imageUrls.length - VISIBLE_THUMBNAILS,
                visibleRange.start + VISIBLE_THUMBNAILS
            );
            setVisibleRange({
                start: newStart,
                end: Math.min(imageUrls.length - 1, newStart + VISIBLE_THUMBNAILS - 1)
            });
        }
    };

    if (imageUrls.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>No Images available</div>
                <p className={styles.emptyMessage}>
                    {emptyMessage || "No images available"}
                </p>
            </div>
        );
    }

    const selectedImage = imageUrls[selectedIndex];

    return (
        <div className={styles.viewer}>
            {/* Imagen principal */}
            <div className={styles.mainImageContainer}>
                <Image
                    src={selectedImage}
                    alt={`Mars photo ${selectedIndex + 1}`}
                    fill
                    className={styles.mainImage}
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                {/* Información de metadatos en esquina superior izquierda */}
                <div className={styles.metadata}>
                    <div className={styles.metadataItem}>
                        <strong>Sol:</strong> {sol || "N/A"}
                    </div>
                    {earthDate && (
                        <div className={styles.metadataItem}>
                            <strong>Earth Date:</strong> {earthDate}
                        </div>
                    )}
                    {camName && (
                        <>
                            <div className={styles.metadataItem}>
                                <strong>Camera:</strong> {camName}
                            </div>
                            <div className={styles.metadataItem}>
                                <strong>Cam Name:</strong> {getCameraDisplayName(camName)}
                            </div>
                        </>
                    )}
                </div>

                {/* Información de la imagen en esquina superior derecha (existente) */}
                <div className={styles.imageInfo}>
                    <span className={styles.imageCounter}>
                        {selectedIndex + 1} / {imageUrls.length}
                    </span>
                    <a
                        href={selectedImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewOriginal}
                    >
                        View Original
                    </a>
                </div>
            </div>

            {/* Carousel de thumbnails */}
            <div className={styles.carouselContainer}>
                {/* Botón de scroll izquierdo */}
                {visibleRange.start > 0 && (
                    <button
                        className={`${styles.scrollButton} ${styles.scrollLeft}`}
                        onClick={() => scrollCarousel("left")}
                    >
                        ‹
                    </button>
                )}

                <div className={styles.carousel} ref={carouselRef}>
                    {imageUrls.slice(visibleRange.start, visibleRange.end + 1).map((url, localIndex) => {
                        const globalIndex = visibleRange.start + localIndex;
                        const isSelected = globalIndex === selectedIndex;

                        return (
                            <button
                                key={globalIndex}
                                className={`${styles.thumbnail} ${isSelected ? styles.selected : ""}`}
                                onClick={() => handleSelectImage(globalIndex)}
                            >
                                <Image
                                    src={url}
                                    alt={`Thumbnail ${globalIndex + 1}`}
                                    fill
                                    className={styles.thumbnailImage}
                                    sizes="80px"
                                />
                                <div className={styles.thumbnailOverlay}>
                                    <span className={styles.thumbnailNumber}>{globalIndex + 1}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Botón de scroll derecho */}
                {visibleRange.end < imageUrls.length - 1 && (
                    <button
                        className={`${styles.scrollButton} ${styles.scrollRight}`}
                        onClick={() => scrollCarousel("right")}
                    >
                        ›
                    </button>
                )}
            </div>

            {/* Controles de navegación */}
            <div className={styles.navigationControls}>
                <button
                    onClick={() => handleSelectImage(Math.max(0, selectedIndex - 1))}
                    disabled={selectedIndex === 0}
                    className={styles.navButton}
                >
                    ← Previous
                </button>

                <span className={styles.navInfo}>
                    Image {selectedIndex + 1} of {imageUrls.length}
                </span>

                <button
                    onClick={() => handleSelectImage(Math.min(imageUrls.length - 1, selectedIndex + 1))}
                    disabled={selectedIndex === imageUrls.length - 1}
                    className={styles.navButton}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}