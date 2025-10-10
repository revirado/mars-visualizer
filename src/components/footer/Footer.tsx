// src/components/Footer/Footer.tsx
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {

    const [isHovered, setIsHovered] = useState(false);

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
                            src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg"
                            alt="NASA - Mars Photo API (Archived 2014-2025)"
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
                            src="https://img.icons8.com/?size=64&id=3tC9EQumUAuq&format=png" 
                            alt="GitHub"
                            width={20}
                            height={20}
                            className={styles.logo}
                        />
                        API Documentation
                    </a>
                </div>
                <div className={styles.info}>
                    <p className={styles.disclaimer}>
                        Developing by Ariel Lamas ∇ Nabla Team - 2025
                    </p>
                </div>
                <div
                    className={styles.info}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <p>
                        {isHovered
                            ? "Datos proporcionados por la NASA Mars Rover Photos API"
                            : "Data provided by NASA Mars Rover Photos API"
                        }
                    </p>
                    <p className={styles.disclaimer}>
                        {isHovered
                            ? "Este es un proyecto de visualización no oficial"
                            : "This is an unofficial visualization project"
                        }
                    </p>
                </div>
            </div>
        </footer>
    );
}