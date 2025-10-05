// src/views/marsVisualizerView.tsx
"use client";
import React, { useState } from "react";
import { useMarsPhotos } from "@/context/MarsPhotosContext";
import styles from "./MarsVisualizerView.module.css";

import LoadingState from "@/components/loading-state/LoadingState";
import ErrorState from "@/components/error-state/ErrorState";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import FilterWizard from "@/components/FilterWizard/FilterWizard";
import PhotoViewer from "@/components/photo-viewer/PhotoViewer";

type ViewMode = "filters" | "results";

export default function MarsVisualizerView() {
  const {
    photoUrls,
    loading,
    maxSol,
    error,
    sol,
    setSol,
    refresh,
    camName,
    setCamName,
    totalPhotos,
    availableCameras,
  } = useMarsPhotos();

  const [viewMode, setViewMode] = useState<ViewMode>("filters");
  const bannerImageUrl = 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/25045_Perseverance_Mars_Rover_Instrument_Labels-web_TJS8tKe.jpg';

  // Función para manejar la búsqueda que cambia a la vista de resultados
  const handleSearch = () => {
    refresh();
    setViewMode("results");
  };

  // Función para volver a los filtros
  const handleBackToFilters = () => {
    setViewMode("filters");
  };

return (
    <div className={styles.container}>
      <Header
        title="Mars Perseverance: Through the Rover's Eyes"
        subtitle="Browse Martian surface photos by mission day and camera - Nabla Team - v0.1.2 prototype"
        bannerImage={bannerImageUrl}
      />

      <main className={styles.main}>
        {/* Botón para cambiar entre vistas (solo visible cuando hay resultados) */}
        {photoUrls.length > 0 && (
          <div className={styles.viewToggle}>
            <button
              onClick={() => setViewMode(viewMode === "filters" ? "results" : "filters")}
              className={styles.toggleButton}
            >
              {viewMode === "filters" ? "📷 Check results" : "⚙️ Back to Filters"}
            </button>
          </div>
        )}

        {/* Mostrar FilterWizard o resultados según el viewMode */}
        {viewMode === "filters" ? (
          <FilterWizard
            sol={sol || 0}
            maxSol={maxSol}
            camName={camName || ""}
            availableCameras={availableCameras}
            onSolChange={(value) => setSol?.(value)}
            onCamChange={(value) => setCamName?.(value)}
            onSearch={handleSearch}
          />
        ) : (
          /* Vista de resultados */
          <div className={styles.resultsView}>
            {/* Botón para volver a filtros */}
            <div className={styles.resultsHeader}>
              <button
                onClick={handleBackToFilters}
                className={styles.backButton}
              >
                ← Back to Filters
              </button>
              
              <div className={styles.resultsInfo}>
                <h2 className={styles.resultsTitle}>
                  {photoUrls.length > 0
                    ? `${photoUrls.length} picture(s) found`
                    : "No pictures found"
                  }
                </h2>
                {totalPhotos !== undefined && photoUrls.length > 0 && (
                  <span className={styles.totalPhotos}>
                    {totalPhotos.toLocaleString()} photos available in total
                  </span>
                )}
              </div>
            </div>

            {/* Estados de carga y error */}
            {loading && <LoadingState />}
            {error && <ErrorState message={error} />}

            {/* Nuevo PhotoViewer */}
            {!loading && !error && (
              <PhotoViewer
                imageUrls={photoUrls}
                emptyMessage="Select a camera and click 'Search' to see the images"
              />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}