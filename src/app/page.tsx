import Image from "next/image";
import styles from "./page.module.css";
import { getMarsPhotoUrls } from "@/handlers/marsDataHandler";

export default async function Home() {

  const photoUrls = await getMarsPhotoUrls();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-2xl font-bold mb-4">📸 Mars Rover Photos</h1>

        {photoUrls.length === 0 ? (
          <p>No se encontraron imágenes.</p>
        ) : (
          <ul className="space-y-2">
            {photoUrls.map((url, index) => (
              <li key={index} className="text-blue-500 break-words">
                {url}
              </li>
            ))}
          </ul>
        )}
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            https://api.nasa.gov/
          </a>
          <a
            href="https://github.com/corincerami/mars-photo-api"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            API Doc
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
