import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById("root")!;

// Las páginas vienen pre-renderizadas desde el build (scripts/prerender.mjs): se hidratan.
// En desarrollo el root llega vacío y se renderiza de cero.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
