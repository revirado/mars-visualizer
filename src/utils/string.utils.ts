export const getCameraDisplayName = (camera: string) => {
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