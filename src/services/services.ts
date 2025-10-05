import { MarsApiResponse } from "../types/marsTypes";

const NASA_API = process.env.NEXT_PUBLIC_NASA_API;
const BASE_URL = NASA_API + "/api/v1/rovers/perseverance/photos";

export async function fetchMarsPhotos(
    sol: number = 1000,
    camera: string = "FRONT_HAZCAM_LEFT_A",
    page?: number
): Promise<MarsApiResponse> {
    const url = page !== undefined
        ? `${BASE_URL}?sol=${sol}&camera=${camera}&page=${page}`
        : `${BASE_URL}?sol=${sol}&camera=${camera}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Error al obtener datos de la API: ${res.statusText}`);
    }

    return res.json();
}