// src/components/Footer/Footer.tsx
import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.links}>
                    <a
                        href="https://api.nasa.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.primaryLink}
                    >
                        <Image
                            src="/nasa-logo.svg" // Necesitarás agregar este logo
                            alt="NASA API"
                            width={20}
                            height={20}
                            className={styles.logo}
                        />
                        NASA Open APIs
                    </a>
                    <a
                        href="https://github.com/corincerami/mars-photo-api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryLink}
                    >
                        <Image
                            src="/github.svg" // Necesitarás agregar este logo
                            alt="GitHub"
                            width={20}
                            height={20}
                            className={styles.logo}
                        />
                        API Documentation
                    </a>
                </div>
                <div className={styles.info}>
                    <p>Datos proporcionados por la NASA Mars Rover Photos API</p>
                    <p className={styles.disclaimer}>
                        Este es un proyecto de visualización no oficial
                    </p>
                </div>
            </div>
        </footer>
    );
}