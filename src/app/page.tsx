import { MarsPhotosProvider } from "@/context/MarsPhotosContext";
import MarsVisualizerView from "@/views/marsVisualizerView";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <MarsPhotosProvider>
        <MarsVisualizerView />
      </MarsPhotosProvider>
    </div>
  );
}