// src/components/header/header.tsx
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
    title: string;
    subtitle: string;
    bannerImage: string;
    challengeText?: string; // Nuevo parámetro opcional
}

export default function Header({
    title,
    subtitle,
    bannerImage,
    challengeText
}: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.banner}>
                <Image
                    src={bannerImage}
                    alt="Mars Perseverance Rover"
                    fill
                    className={styles.bannerImage}
                    priority
                />
                <div className={styles.bannerOverlay} />

                {/* Texto del challenge en esquina superior derecha */}
                <div className={styles.challengeBadge}>
                    {challengeText}
                </div>
            </div>

            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </header>
    );
}