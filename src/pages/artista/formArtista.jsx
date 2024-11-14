import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormArtista() {
  const { artistaId } = useParams(); 
  const navigate = useNavigate();
  
  const [generos, setGeneros] = useState([]);
  const [nombreArtista, setNombreArtista] = useState('');
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/genero')
      .then(response => response.json())
      .then(data => setGeneros(data))
      .catch(error => console.error('Error al cargar los géneros:', error));
  }, []);

  useEffect(() => {
    if (artistaId) {
      fetch(`http://localhost:3000/artista/${artistaId}`)
        .then(response => response.json())
        .then(data => {
          setNombreArtista(data.nombre);
          if (data.genero) {
            setGeneroSeleccionado(data.genero.id); 
          }
        })
        .catch(error => console.error('Error al cargar el artista:', error));
    }
  }, [artistaId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const artista = {
      nombre: nombreArtista,
      generoId: generoSeleccionado,
    };

    const method = artistaId ? 'PUT' : 'POST';
    const url = artistaId
      ? `http://localhost:3000/artista/${artistaId}`
      : 'http://localhost:3000/artista';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artista),
    })
      .then(response => response.json())
      .then(() => {
        alert(artistaId ? 'Artista actualizado exitosamente' : 'Artista creado exitosamente');
        navigate('/lista-artistas'); 
      })
      .catch(error => console.error('Error al guardar el artista:', error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{artistaId ? 'Editar Artista' : 'Agregar Nuevo Artista'}</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="nombreArtista">Nombre del Artista:</label>
          <input
            type="text"
            className="form-control"
            id="nombreArtista"
            value={nombreArtista}
            onChange={(e) => setNombreArtista(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="generoSeleccionado">Género:</label>
          <select
            className="form-control"
            id="generoSeleccionado"
            value={generoSeleccionado}
            onChange={(e) => setGeneroSeleccionado(e.target.value)}
            required
          >
            <option value="">Seleccione un género</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {artistaId ? 'Actualizar Artista' : 'Agregar Artista'}
        </button>
      </form>
    </div>
  );
}

export default FormArtista;
