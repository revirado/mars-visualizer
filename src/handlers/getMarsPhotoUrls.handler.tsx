import { fetchMarsPhotos } from "@/services/services";
import { MarsPhoto } from "@/types/marsTypes";

interface MarsPhotoParams {
    sol: number;
    camName: string;
    pagination?: number;
}

export async function getMarsPhotoUrls({
    sol,
    camName,
    pagination,
}: MarsPhotoParams): Promise<string[]> {
    try {
        const data = await fetchMarsPhotos(sol, camName, pagination);
        // Extraemos solo las URLs de imagen
        const urls = data.photos.map((photo: MarsPhoto) => photo.img_src);
        return urls;
    } catch (error) {
        console.error("Error en getMarsPhotoUrls:", error);
        return [];
    }
}
