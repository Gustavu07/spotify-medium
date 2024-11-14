import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormCancion() {
  const { cancionId } = useParams(); 
  const navigate = useNavigate();
  
  const [albums, setAlbums] = useState([]);
  const [tituloCancion, setTituloCancion] = useState('');
  const [albumSeleccionado, setAlbumSeleccionado] = useState('');

  // Cargar álbumes al cargar el componente
  useEffect(() => {
    fetch('http://localhost:3000/album')
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.error('Error al cargar los álbumes:', error));
  }, []);

  useEffect(() => {
    if (cancionId) {
      fetch(`http://localhost:3000/cancion/${cancionId}`)
        .then(response => response.json())
        .then(data => {
          setTituloCancion(data.titulo);
          if (data.album) {
            setAlbumSeleccionado(data.album.id); 
          }
        })
        .catch(error => console.error('Error al cargar la canción:', error));
    }
  }, [cancionId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cancion = {
      titulo: tituloCancion,
      albumId: albumSeleccionado,
    };

    const method = cancionId ? 'PUT' : 'POST';
    const url = cancionId
      ? `http://localhost:3000/cancion/${cancionId}`
      : 'http://localhost:3000/cancion';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cancion),
    })
      .then(response => response.json())
      .then(() => {
        alert(cancionId ? 'Canción actualizada exitosamente' : 'Canción creada exitosamente');
        navigate('/lista-canciones'); 
      })
      .catch(error => console.error('Error al guardar la canción:', error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{cancionId ? 'Editar Canción' : 'Agregar Nueva Canción'}</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="tituloCancion">Título de la Canción:</label>
          <input
            type="text"
            className="form-control"
            id="tituloCancion"
            value={tituloCancion}
            onChange={(e) => setTituloCancion(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="albumSeleccionado">Álbum:</label>
          <select
            className="form-control"
            id="albumSeleccionado"
            value={albumSeleccionado}
            onChange={(e) => setAlbumSeleccionado(e.target.value)}
            required
          >
            <option value="">Seleccione un álbum</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.titulo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {cancionId ? 'Actualizar Canción' : 'Agregar Canción'}
        </button>
      </form>
    </div>
  );
}

export default FormCancion;
