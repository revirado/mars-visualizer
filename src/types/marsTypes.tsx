export interface Camera {
    name: string;
    full_name: string;
}

export interface Rover {
    name: string;
    status: string;
}

export interface MarsPhoto {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: string;
    rover: Rover;
}

export interface MarsApiResponse {
    photos: MarsPhoto[];
}