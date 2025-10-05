// src/views/marsVisualizerView.tsx
"use client";
import React from "react";
import { useMarsPhotos } from "@/context/MarsPhotosContext";
import styles from "./MarsVisualizerView.module.css";

import FilterPanel from "@/components/FilterPanel/FilterPanel";
import LoadingState from "@/components/loading-state/LoadingState";
import ErrorState from "@/components/error-state/ErrorState";
import ImageGrid from "@/components/image-grid/ImageGrid";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";


export default function MarsVisualizerView() {
  const {
    photoUrls,
    loading,
    maxSol,
    error,
    sol,
    page,
    setSol,
    refresh,
    setPage,
    camName,
    setCamName,
    earthDate,
    totalPhotos,
    availableCameras,
  } = useMarsPhotos();

  const bannerImageUrl = 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/25045_Perseverance_Mars_Rover_Instrument_Labels-web_TJS8tKe.jpg';

  return (
    <div className={styles.container}>
      <Header 
        title="Mars Perseverance Rover Photos"
        subtitle="Nabla Team - v0.1.0 prototype"
        bannerImage={bannerImageUrl}
      />
      
      <main >
        {/* Panel de Filtros */}
        <FilterPanel
          sol={sol}
          maxSol={maxSol}
          earthDate={earthDate}
          camName={camName}
          page={page}
          totalPhotos={totalPhotos}
          availableCameras={availableCameras}
          onSolChange={(value) => setSol?.(value)}
          onCamChange={(value) => setCamName?.(value)}
          onPageChange={(value) => setPage?.(value)}
          onRefresh={refresh}
        />

        {/* estados de carga y error */}
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        
        {/* Resultados */}
        {!loading && !error && (
          <div className={styles.resultsSection}>
            <div className={styles.resultsHeader}>
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

            {/* Grid de imagenes */}
            <ImageGrid 
              imageUrls={photoUrls}
              emptyMessage="Select a camera and click 'Search' to see the images"
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}