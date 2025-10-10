"use client";
import React, { useState } from "react";
import styles from "./MarsVisualizerView.module.css";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ProjectShowcase from "@/components/project-showcase/ProjectShowcase";


type ViewMode = "home" | "demo" | "about" | "tech";

export default function MarsVisualizerView() {
  const [viewMode, setViewMode] = useState<ViewMode>("home");

  const bannerImageUrl = 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/25045_Perseverance_Mars_Rover_Instrument_Labels-web_TJS8tKe.jpg';

  const renderContent = () => {
    switch (viewMode) {
      case "demo":
        return <ProjectShowcase mode="demo" onBack={() => setViewMode("home")} />;
      case "about":
        return <ProjectShowcase mode="about" onBack={() => setViewMode("home")} />;
      case "tech":
        return <ProjectShowcase mode="tech" onBack={() => setViewMode("home")} />;
      default:
        return (
          <div className={styles.landingContent}>
            {/* Banner de notificación importante */}
            <div className={styles.notificationBanner}>
              <div className={styles.notificationIcon}>⚠️</div>
              <div className={styles.notificationContent}>
                <h3>Educational Demo - API Service Retired</h3>
                <p>
                  The original Mars Photo API is no longer maintained. 
                  This prototype showcases the projects potential for Mars exploration.
                </p>
              </div>
            </div>

            {/* Call-to-action buttons */}
            <div className={styles.ctaSection}>
              <button 
                className={styles.primaryCta}
                onClick={() => setViewMode("demo")}
              >
                🎭 View Project Demo
              </button>
              <button 
                className={styles.secondaryCta}
                onClick={() => setViewMode("about")}
              >
                📚 Learn More
              </button>
            </div>

            {/* Feature cards */}
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📷</div>
                <h4>Photo Explorer</h4>
                <p>Browse Mars rover images with advanced filtering</p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🗓️</div>
                <h4>Sol Timeline</h4>
                <p>Navigate mission days with interactive heat map</p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎥</div>
                <h4>Time-Lapse Viewer</h4>
                <p>Visualize Martian landscape changes over time</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <Header
        title="Mars Perseverance: Through the Rover's Eyes"
        subtitle="Browse Martian surface photos by mission day and camera - Nabla Team - v0.1.3 prototype"
        bannerImage={bannerImageUrl}
        challengeText="NASA Space App Challenge 2025" // Opcional, ya tiene valor por defecto
      />
      <main className={styles.main}>
        {/* Navigation */}
        {viewMode !== "home" && (
          <nav className={styles.navBar}>
            <button 
              className={styles.navButton}
              onClick={() => setViewMode("home")}
            >
              🏠 Home
            </button>
            <button 
              className={styles.navButton}
              onClick={() => setViewMode("demo")}
            >
              🎭 Demo
            </button>
            <button 
              className={styles.navButton}
              onClick={() => setViewMode("tech")}
            >
              🔧 Tech
            </button>
            <button 
              className={styles.navButton}
              onClick={() => setViewMode("about")}
            >
              📚 About
            </button>
          </nav>
        )}

        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}