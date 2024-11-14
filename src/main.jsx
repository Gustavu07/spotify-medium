import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import FormGenero from './pages/generos/FormGenero.jsx';
import CatalogoGeneros from './pages/genero/catalogoGenero.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormGenero from './pages/genero/FormGenero.jsx';
import AgregarArtistaForm from './pages/artista/formArtista.jsx';
import ArtistasPorGenero from './pages/artista/ArtistasPorGenero.jsx';
import FormAlbum from './pages/albunes/FormAlbum.jsx';
import ListaGeneros from './pages/genero/ListaGeneros.jsx';
import ListaArtistas from './pages/artista/ListaArtistas.jsx';
import ListaAlbumes from './pages/albunes/ListaAlbumes.jsx';
import SubirImagenGenero from './pages/genero/fotoGenero.jsx';
import FormArtista from './pages/artista/formArtista.jsx';
import ListaCanciones from './pages/canciones/ListaCanciones.jsx';
import FormCancion from './pages/canciones/formCanciones.jsx';
import SubirImagenArtista from './pages/artista/fotoArtista.jsx';
import AlbumesPorArtista from './pages/albunes/AlbumesPorArtista.jsx';
import CancionesPorAlbum from './pages/canciones/CancionesPorAlbum.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CatalogoGeneros />, 
  },
  {
    path: "/genero/:generoId/artistas",
    element: <ArtistasPorGenero />,
  },
  {
    path: "/artista/:artistaId/albumes",
    element: <AlbumesPorArtista />,
  },
  {
    path: "/album/:albumId/canciones",
    element: <CancionesPorAlbum />,
  },
  {
    path: "/editar-genero/:generoId",
    element: <FormGenero />,
  },
  {
    path: "/editar-album/:albumId",
    element: <FormAlbum />,
  },
  {
    path: "/editar-artista/:artistaId",
    element: <FormArtista />,
  },
  {
    path: "/editar-cancion/:cancionId",
    element: <FormCancion />,
  },
  {
    path: "/subir-imagen-genero/:id",
    element: <SubirImagenGenero />,
  },
  {
    path: "/subir-imagen-artista/:id",
    element: <SubirImagenArtista />,
  },
  {
    path: "/nuevo-genero",
    element: <FormGenero />,
  },
  {
    path: "/nuevo-artista",
    element: <AgregarArtistaForm />,
  },
  {
    path: "/nuevo-album",
    element: <FormAlbum />,
  },
  {
    path: "/nueva-cancion",
    element: <FormCancion />,
  },
  {
    path: "/lista-generos",
    element: <ListaGeneros />,
  },
  {
    path: "/lista-artista",
    element: < ListaArtistas/>,
  },
  {
    path: "/lista-albumes",
    element: <ListaAlbumes />,
  },
  {
    path: "/lista-canciones",
    element: <ListaCanciones />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
