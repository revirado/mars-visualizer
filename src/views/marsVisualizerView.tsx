"use client";
import React from "react";
import { useMarsPhotos } from "@/context/MarsPhotosContext";
import styles from "../app/page.module.css";
import Image from "next/image";

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
    camName: camera,
  } = useMarsPhotos();

  const photosLength = photoUrls.length

  return (
    <>
      <main className={styles.main}>
        <h1 className="text-2xl font-bold mb-4">📸 Mars Rover Photos</h1>

        <section className="mb-4 flex gap-4 items-center">
          <label>
            Sol: (Max: {maxSol})
            <input
              type="number"
              min={0}
              max={maxSol}
              value={sol}
              onChange={e => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= maxSol) {
                  setSol?.(value);
                }
              }}
              className="ml-2 px-2 py-1 border rounded"
            />
            
          </label>
          <label>
            Cámara:
            <select value={camera} disabled className="ml-2 px-2 py-1 border rounded">
              <option value="FRONT_HAZCAM_LEFT_A">FRONT_HAZCAM_LEFT_A</option>
            </select>
          </label>
          <label>
            Página:
            <input
              type="number"
              min={1}
              value={page}
              onChange={e => setPage?.(Number(e.target.value))}
              className="ml-2 px-2 py-1 border rounded"
            />
          </label>
          <button
            onClick={refresh}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Refrescar
          </button>
        </section>

        {loading && <p>Cargando imágenes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && photosLength === 0 && <p>No se encontraron imágenes.</p>}

        Result: {photosLength}
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
            API Doc (Github Repo)
          </a>
        </div>
      </footer>
    </>
  );
}