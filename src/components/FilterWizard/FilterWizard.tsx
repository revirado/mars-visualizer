// src/components/FilterWizard/FilterWizard.tsx
import React, { useState } from "react";

import styles from "./FilterWizard.module.css";
import CameraGrid from "../cameraGrid/CameraGrid";
import SolGrid from "../sol-grid/SolGrid";
import { useMarsPhotos } from "@/context/MarsPhotosContext";

interface FilterWizardProps {
    sol: number;
    maxSol: number;
    camName: string;
    availableCameras: string[];
    onSolChange: (sol: number) => void;
    onCamChange: (camera: string) => void;
    onSearch: () => void;
    initialStep?: WizardStep;
}

type WizardStep = "sol" | "camera";

export default function FilterWizard({
    sol,
    maxSol,
    camName,
    availableCameras,
    onSolChange,
    onCamChange,
    onSearch,
    initialStep,
}: FilterWizardProps) {

    const {earthDate} = useMarsPhotos();
    const [currentStep, setCurrentStep] = useState<WizardStep>(initialStep || "sol");
    const [selectedSol, setSelectedSol] = useState<number>(sol);

    const handleSolSelect = (newSol: number) => {
        setSelectedSol(newSol);
        onSolChange(newSol);
    };

    const handleCameraSelect = (camera: string) => {
        onCamChange(camera);
    };

    const handleNext = () => {
        if (currentStep === "sol" && selectedSol !== undefined) {
            setCurrentStep("camera");
        } else if (currentStep === "camera" && camName) {
            onSearch();
        }
    };

    const handleBack = () => {
        if (currentStep === "camera") {
            setCurrentStep("sol");
        }
    };

    const canProceed =
        (currentStep === "sol" && selectedSol !== undefined) ||
        (currentStep === "camera" && camName);

    return (
        <div className={styles.wizard}>
            {/* Navegacion */}
            <div className={styles.navigation}>
                <button
                    onClick={handleBack}
                    disabled={currentStep === "sol"}
                    className={styles.navButton}
                >
                    <ArrowIcon direction="left" />
                </button>

                <div className={styles.stepIndicator}>
                    <span className={currentStep === "sol" ? styles.activeStep : ""}>
                        Select Sol
                    </span>
                    <span className={currentStep === "camera" ? styles.activeStep : ""}>
                        Select Camera
                    </span>
                    <span>
                        SOL: {selectedSol} / {maxSol}
                    </span>
                    <span>  {earthDate ? ` ${earthDate}` : ""}</span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={styles.navButton}
                >
                    {currentStep === "camera" ? <SearchIcon /> : <ArrowIcon direction="right" />}
                </button>
            </div>

            {/* Contenido del paso actual */}
            <div className={styles.content}>
                {currentStep === "sol" && (
                    <SolGrid
                        selectedSol={selectedSol}
                        maxSol={maxSol}
                        onSolSelect={handleSolSelect}
                        onDoubleClick={() => setCurrentStep("camera")}
                    />
                )}

                {currentStep === "camera" && (
                    <CameraGrid
                        selectedCamera={camName}
                        availableCameras={availableCameras}
                        onCameraSelect={handleCameraSelect}
                        onDoubleClick={() => onSearch()}
                    />
                )}
            </div>
        </div>
    );
}

// Iconos
function ArrowIcon({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            style={direction === "left" ? {} : { transform: "rotate(180deg)" }}
        >
            <path d="m15 18-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}