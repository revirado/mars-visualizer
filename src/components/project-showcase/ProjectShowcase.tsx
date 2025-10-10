// src/components/ProjectShowcase/ProjectShowcase.tsx
import React, { useState } from "react";
import FilterWizard from "@/components/FilterWizard/FilterWizard";

import { useMarsPhotos } from "@/context/MarsPhotosContext";
import styles from "./ProjectShowcase.module.css";
import PhotoViewer from "../photo-viewer/PhotoViewer";

interface ProjectShowcaseProps {
    mode: "demo" | "about" | "tech";
    onBack: () => void;
}

// Datos de demo simples con placeholders
const demoPhotos = [
    "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/00349/ids/edr/browse/zcam/ZR0_0349_0697924880_568EBY_N0092982ZCAM08380_1100LMJ01_1200.jpg",
    "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01461/ids/edr/browse/ncam/NLF_1461_0796646546_300ECM_N0710120NCAM02461_07_195J01_1200.jpg",
    "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/00349/ids/edr/browse/zcam/ZR0_0349_0697920032_239EBY_N0092982ZCAM03317_1100LMJ01_1200.jpg",
    
];

export default function ProjectShowcase({ mode, onBack }: ProjectShowcaseProps) {
    const { sol, camName, availableCameras, setSol, setCamName } = useMarsPhotos();
    const [activeDemo, setActiveDemo] = useState<string | null>(null);

    const renderDemo = () => {
        if (activeDemo) {
            return (
                <div className={styles.interactiveDemo}>
                    <button className={styles.backButton} onClick={() => setActiveDemo(null)}>
                        ← Back to Tours
                    </button>

                    <div className={styles.demoHeader}>
                        <h3>🎭 {activeDemo} - Interactive Demo</h3>
                        <p>This showcases the actual Photo Viewer component built for the project</p>
                    </div>

                    {/* REUTILIZAMOS PhotoViewer existente */}
                    <PhotoViewer
                        imageUrls={demoPhotos}
                        emptyMessage="Demo images would load here"
                    />
                </div>
            );
        }

        return (
            <div className={styles.demoContent}>
                <h2>🎭 Project Demo - Interactive Showcase</h2>

                <div className={styles.liveDemo}>
                    <h3>Live Component Demos</h3>

                    {/* REUTILIZAMOS FilterWizard existente */}
                    <div className={styles.componentDemo}>
                        <h4>Filter Wizard Component</h4>
                        <FilterWizard
                            sol={sol || 0}
                            maxSol={10}
                            camName={camName || ""}
                            availableCameras={availableCameras}
                            onSolChange={(value) => setSol?.(value)}
                            onCamChange={(value) => setCamName?.(value)}
                            onSearch={() => setActiveDemo("Photo Explorer")}
                        />
                    </div>

                    {/* Demos rápidos */}
                    <div className={styles.quickDemos}>
                        <h4>Feature Previews</h4>
                        <div className={styles.demoGrid}>
                            <button
                                className={styles.demoCard}
                                onClick={() => setActiveDemo("Photo Explorer")}
                            >
                                <div className={styles.demoIcon}>🖼️</div>
                                <h5>Photo Viewer</h5>
                                <p>Interactive image browser</p>
                            </button>

                            <button
                                className={styles.demoCard}
                                onClick={() => setActiveDemo("Sol Timeline")}
                            >
                                <div className={styles.demoIcon}>🗓️</div>
                                <h5>Sol Timeline</h5>
                                <p>Mission day navigation</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderAbout = () => (
        <div className={styles.aboutContent}>
            <h2>📚 Project Context</h2>

            <div className={styles.contextNote}>
                <p>
                    <strong>This project was built for NASA Space Apps Challenge 2025</strong>
                </p>
                <p>
                    While the original Mars Photo API is now retired, this prototype demonstrates
                    how modern web technologies can create engaging interfaces for space exploration data.
                </p>
            </div>

            {/* REUTILIZAMOS componentes existentes para mostrar capacidades */}
            <div className={styles.featureShowcase}>
                <h3>Built Components</h3>
                <div className={styles.featureList}>
                    <div className={styles.featureItem}>
                        <strong>FilterWizard</strong> - Multi-step mission day and camera selection
                    </div>
                    <div className={styles.featureItem}>
                        <strong>PhotoViewer</strong> - Interactive image browser with carousel
                    </div>
                    <div className={styles.featureItem}>
                        <strong>SolGrid</strong> - Heat map visualization of mission days
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTech = () => (
        <div className={styles.techContent}>
            <h2>🔧 Built With</h2>

            <div className={styles.techStack}>
                <div className={styles.techItem}>
                    <strong>Frontend</strong>
                    <span>React 18 + Next.js 14 + TypeScript</span>
                </div>
                <div className={styles.techItem}>
                    <strong>UI/UX</strong>
                    <span>Custom CSS Modules + Responsive Design</span>
                </div>
                <div className={styles.techItem}>
                    <strong>Architecture</strong>
                    <span>Context API + Component Composition</span>
                </div>
            </div>

            <div className={styles.componentShowcase}>
                <h3>Key Features Implemented</h3>
                {/* Mostramos componentes reales */}
                <div className={styles.liveComponent}>
                    <h4>Interactive Filter System</h4>
                    <FilterWizard
                        sol={100}
                        maxSol={500}
                        camName=""
                        availableCameras={["NAVCAM_LEFT", "NAVCAM_RIGHT", "HAZCAM_FRONT"]}
                        onSolChange={() => { }}
                        onCamChange={() => { }}
                        onSearch={() => setActiveDemo("Live Demo")}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.showcase}>
            <div className={styles.showcaseHeader}>
                <button className={styles.navBack} onClick={onBack}>
                    ← Back to Home
                </button>
                <h2>
                    {mode === "demo" && "🎭 Project Demo"}
                    {mode === "about" && "📚 Project Context"}
                    {mode === "tech" && "🔧 Technical Implementation"}
                </h2>
            </div>

            {mode === "demo" && renderDemo()}
            {mode === "about" && renderAbout()}
            {mode === "tech" && renderTech()}
        </div>
    );
}