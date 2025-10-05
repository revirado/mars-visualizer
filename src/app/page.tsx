import { MarsPhotosProvider } from "@/context/MarsPhotosContext";
import MarsVisualizerView from "@/views/marsVisualizerView";

export default function Home() {
  return (
      <MarsPhotosProvider>
        <MarsVisualizerView />
      </MarsPhotosProvider>
  );
}