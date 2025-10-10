import React from "react";
import styles from "./ProjectShowcase.module.css";

interface ProjectShowcaseProps {
    mode: "demo" | "about" | "tech";
    onBack: () => void;
}

export default function ProjectShowcase({ mode, onBack }: ProjectShowcaseProps) {
    const renderDemo = () => (
        <div className={styles.demoContent}>
            <h2>🎭 Project Demo - Interactive Showcase</h2>

            <div className={styles.tourSelector}>
                <h3>Select a Demo Tour</h3>
                <div className={styles.tourGrid}>
                    <button className={styles.tourCard}>
                        <div className={styles.tourIcon}>🌟</div>
                        <h4>Best of Perseverance</h4>
                        <p>Curated selection of remarkable Martian images</p>
                    </button>

                    <button className={styles.tourCard}>
                        <div className={styles.tourIcon}>⏱️</div>
                        <h4>Martian Time-Lapse</h4>
                        <p>See landscape changes over mission days</p>
                    </button>

                    <button className={styles.tourCard}>
                        <div className={styles.tourIcon}>📸</div>
                        <h4>Camera Comparison</h4>
                        <p>Different camera perspectives same location</p>
                    </button>

                    <button className={styles.tourCard}>
                        <div className={styles.tourIcon}>🔧</div>
                        <h4>Technical Features</h4>
                        <p>Explore the UI/UX innovations</p>
                    </button>
                </div>
            </div>

            <div className={styles.demoNote}>
                <p>
                    <strong>Note:</strong> This demo uses sample data to showcase the application s capabilities.
                    The original Mars Photo API was retired in Oct 8th 2025 after 10 years of service.
                </p>
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className={styles.aboutContent}>
            <h2>📚 Project Context & Mission</h2>

            <div className={styles.infoSection}>
                <h3>The Original Mars Photo API</h3>
                <div className={styles.quoteCard}>
                    <blockquote>
                        I built this API as a student project back in 2014 and then rebuilt it in 2015.
                        It then became a part of NASAs Open Data Portal in the fall of 2015.
                        Ive maintained this API for the last 10 years by myself, but I no longer have
                        the time to properly maintain it.
                    </blockquote>
                    <cite>— Chris Cerami, Maintainer (2014-2025)</cite>
                </div>

                <div className={styles.factsGrid}>
                    <div className={styles.factItem}>
                        <strong>10 Years</strong>
                        <span>Of Service</span>
                    </div>
                    <div className={styles.factItem}>
                        <strong>NASA Open Data</strong>
                        <span>Portal Integration</span>
                    </div>
                    <div className={styles.factItem}>
                        <strong>Student Project</strong>
                        <span>Origins</span>
                    </div>
                </div>
            </div>

            <div className={styles.infoSection}>
                <h3>Our Educational Mission</h3>
                <p>
                    This demonstration preserves the vision of Mars exploration through rover imagery.
                    While the original API is retired, we showcase how such tools can empower scientific
                    discovery and public engagement with space exploration.
                </p>

                <a
                    href="https://github.com/corincerami/mars-photo-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoLink}
                >
                    🔗 View Archived Repository
                </a>
            </div>
        </div>
    );

    const renderTech = () => (
        <div className={styles.techContent}>
            <h2>🔧 Technical Architecture</h2>

            <div className={styles.architecture}>
                <h3>System Design</h3>
                <div className={styles.archDiagram}>
                    <div className={styles.archRow}>
                        <div className={styles.archNode}>
                            <div className={styles.nodeIcon}>🚀</div>
                            <span>NASA APIs</span>
                        </div>
                        <div className={styles.archArrow}>→</div>
                        <div className={styles.archNode}>
                            <div className={styles.nodeIcon}>🔧</div>
                            <span>Mars Photo Service</span>
                        </div>
                        <div className={styles.archArrow}>→</div>
                        <div className={styles.archNode}>
                            <div className={styles.nodeIcon}>⚛️</div>
                            <span>React App</span>
                        </div>
                    </div>

                    <div className={styles.archFlow}>
                        <div className={styles.flowColumn}>
                            <div className={styles.flowNode}>
                                <div className={styles.flowIcon}>📊</div>
                                <span>Manifest Data</span>
                            </div>
                        </div>
                        <div className={styles.flowColumn}>
                            <div className={styles.flowNode}>
                                <div className={styles.flowIcon}>🔄</div>
                                <span>Context State</span>
                            </div>
                        </div>
                        <div className={styles.flowColumn}>
                            <div className={styles.flowNode}>
                                <div className={styles.flowIcon}>🎨</div>
                                <span>Component Views</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.techGrid}>
                <div className={styles.techColumn}>
                    <h4>Key Features</h4>
                    <ul className={styles.featureList}>
                        <li>• Sol Timeline Explorer</li>
                        <li>• Photo Activity Heat Map</li>
                        <li>• Multi-Camera Filtering</li>
                        <li>• Interactive Photo Viewer</li>
                        <li>• Responsive Design</li>
                    </ul>
                </div>

                <div className={styles.techColumn}>
                    <h4>Tech Stack</h4>
                    <ul className={styles.techList}>
                        <li>• React 18 + Next.js 14</li>
                        <li>• TypeScript</li>
                        <li>• NASA Mars APIs</li>
                        <li>• CSS Modules</li>
                        <li>• Responsive UI</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.showcase}>
            {mode === "demo" && renderDemo()}
            {mode === "about" && renderAbout()}
            {mode === "tech" && renderTech()}
        </div>
    );
}