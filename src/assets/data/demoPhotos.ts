export interface DemoPhoto {
  id: string;
  img_src: string;
  sol: number;
  earth_date: string;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
    status: string;
  };
}

export const demoPhotos: { [key: string]: DemoPhoto[] } = {
  bestOf: [
    {
      id: "demo-1",
      img_src: "/demo-images/perseverance-1.jpg",
      sol: 100,
      earth_date: "2021-05-30",
      camera: {
        name: "NAVCAM_LEFT",
        full_name: "Navigation Camera - Left"
      },
      rover: {
        name: "Perseverance",
        status: "active"
      }
    },
    // Agrega aquí tus 10 imágenes con metadata...
  ],
  timeLapse: [
    // Secuencia temporal de imágenes...
  ],
  cameraComparison: [
    // Mismo sol, diferentes cámaras...
  ]
};

// Placeholder images para desarrollo
export const getDemoImageUrl = (index: number) => {
  return `https://picsum.photos/800/600?random=${index}`;
};