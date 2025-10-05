import { fetchMarsPhotos } from "@/services/servies";
import { MarsPhoto } from "../types/marsTypes";

export async function getMarsPhotoUrls(): Promise<string[]> {
    try {
        const data = await fetchMarsPhotos(1000, "FRONT_HAZCAM_LEFT_A", 1);
        // Extraemos solo las URLs de imagen
        const urls = data.photos.map((photo: MarsPhoto) => photo.img_src);
        return urls;
    } catch (error) {
        console.error("Error en getMarsPhotoUrls:", error);
        return [];
    }
}
