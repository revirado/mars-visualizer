// src/components/FilterWizard/CameraGrid/CameraGrid.tsx
import React from "react";
import styles from "./CameraGrid.module.css";

interface CameraGridProps {
    selectedCamera: string;
    availableCameras: string[];
    onCameraSelect: (camera: string) => void;
}

export default function CameraGrid({
    selectedCamera,
    availableCameras,
    onCameraSelect,
}: CameraGridProps) {
    // Dividir las cámaras en 2 filas
    const midPoint = Math.ceil(availableCameras.length / 2);
    const firstRow = availableCameras.slice(0, midPoint);
    const secondRow = availableCameras.slice(midPoint);

    const getCameraDisplayName = (camera: string) => {
        const names: { [key: string]: string } = {
            "FRONT_HAZCAM_LEFT_A": "Front Hazcam Left",
            "FRONT_HAZCAM_RIGHT_A": "Front Hazcam Right",
            "REAR_HAZCAM_LEFT": "Rear Hazcam Left",
            "REAR_HAZCAM_RIGHT": "Rear Hazcam Right",
            "NAVCAM_LEFT": "Navcam Left",
            "NAVCAM_RIGHT": "Navcam Right",
            "MCZ_LEFT": "Mastcam-Z Left",
            "MCZ_RIGHT": "Mastcam-Z Right",
            "EDL_DDCAM": "EDL Downward Camera",
            "EDL_PUCAM2": "EDL Parachute Up Camera",
            "EDL_RDCAM": "EDL Rover Down Camera",
            "EDL_RUCAM": "EDL Rover Up Camera",
            "SKYCAM": "Skycam",
            "SUPERCAM_RMI": "Supercam RMI"
        };

        return names[camera] || camera;
    };

    const getCameraAbbreviation = (camera: string) => {
        const abbreviations: { [key: string]: string } = {
            "FRONT_HAZCAM_LEFT_A": "FHL",
            "FRONT_HAZCAM_RIGHT_A": "FHR",
            "REAR_HAZCAM_LEFT": "RHL",
            "REAR_HAZCAM_RIGHT": "RHR",
            "NAVCAM_LEFT": "NL",
            "NAVCAM_RIGHT": "NR",
            "MCZ_LEFT": "MZL",
            "MCZ_RIGHT": "MZR",
            "EDL_DDCAM": "EDC",
            "EDL_PUCAM2": "EPC",
            "EDL_RDCAM": "ERC",
            "EDL_RUCAM": "EUC",
            "SKYCAM": "SKY",
            "SUPERCAM_RMI": "SCR"
        };

        return abbreviations[camera] || camera.slice(0, 3);
    };

    return (
        <div className={styles.gridContainer}>
            <div className={styles.header}>
                <h3 className={styles.title}>Select a camera</h3>
                <p className={styles.subtitle}>
                    {selectedCamera
                        ? `${getCameraDisplayName(selectedCamera)} seleccionada`
                        : `${availableCameras.length} cameras available`
                    }
                </p>
            </div>

            <div className={styles.grid}>
                {/* Primera fila */}
                <div className={styles.row}>
                    {firstRow.map((camera) => (
                        <button
                            key={camera}
                            className={`${styles.cameraCard} ${camera === selectedCamera ? styles.selected : ""
                                }`}
                            onClick={() => onCameraSelect(camera)}
                        >
                            <div className={styles.cameraIcon}>
                                {getCameraAbbreviation(camera)}
                            </div>
                            <div className={styles.cameraName}>
                                {getCameraDisplayName(camera)}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Segunda fila (si hay suficientes cámaras) */}
                {secondRow.length > 0 && (
                    <div className={styles.row}>
                        {secondRow.map((camera) => (
                            <button
                                key={camera}
                                className={`${styles.cameraCard} ${camera === selectedCamera ? styles.selected : ""
                                    }`}
                                onClick={() => onCameraSelect(camera)}
                            >
                                <div className={styles.cameraIcon}>
                                    {getCameraAbbreviation(camera)}
                                </div>
                                <div className={styles.cameraName}>
                                    {getCameraDisplayName(camera)}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selectedCamera && (
                <div className={styles.selectedInfo}>
                    <div className={styles.selectedCamera}>
                        <strong>Selected Camera:</strong> {getCameraDisplayName(selectedCamera)}
                    </div>
                </div>
            )}
        </div>
    );
}