"use client"
import React from "react";
import { useMarsPhotos } from "@/context/MarsPhotosContext";
import styles from "../app/page.module.css";
import Image from "next/image";

export default function MarsVisualizerView() {
  const { photoUrls, loading, error, refresh } = useMarsPhotos();

  return (
    <>
      <main className={styles.main}>
        <h1 className="text-2xl font-bold mb-4">📸 Mars Rover Photos</h1>
        <button
          onClick={refresh}
          className="mb-4 px-2 py-1 bg-blue-500 text-white rounded"
        >
          Refrescar
        </button>
        {loading && <p>Cargando imágenes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && photoUrls.length === 0 && <p>No se encontraron imágenes.</p>}
        <ul className="space-y-2">
          {photoUrls.map((url, index) => (
            <li key={index} className="text-blue-500 break-words">
              {url}
            </li>
          ))}
        </ul>

      </main>
      <footer className={styles.footer}>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            https://api.nasa.gov/
          </a>
          <a
            href="https://github.com/corincerami/mars-photo-api"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            API Doc
          </a>
        </div>
      </footer>
    </>
  );
}