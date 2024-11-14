import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ListaAlbumes = () => {
  const [albumes, setAlbumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/album')
      .then(response => {
        setAlbumes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los álbumes:', error);
        alert("No se pudieron cargar los álbumes.");
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar-album/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este álbum?')) {
      axios.delete(`http://localhost:3000/album/${id}`)
        .then(() => {
          setAlbumes(prevAlbumes => prevAlbumes.filter(album => album.id !== id));
        })
        .catch(err => {
          console.error('Error al eliminar el álbum:', err);
          alert('No se pudo eliminar el álbum.');
        });
    }
  };

  const handleUploadImage = (id) => {
    navigate(`/subir-imagen-album/${id}`);
  };

  return (
    <Container className="mt-4">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <a className="navbar-brand fw-bold text-white" href="/">Catálogo de Álbumes</a>
        <Link to="/nuevo-album">
          <Button variant="success">+ Crear Nuevo Álbum</Button>
        </Link>
      </nav>

      <h2 className="mb-3">Lista de Álbumes</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Artista</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {albumes.map(album => (
            <tr key={album.id}>
              <td>{album.id}</td>
              <td>{album.titulo}</td>
              <td>{album.artista ? album.artista.nombre : 'N/A'}</td>
              <td>
                {album.imagen && <img src={`http://localhost:3000/uploads/${album.imagen}`} alt={`Imagen de ${album.titulo}`} width="100" />}
              </td>
              <td>
                <Button variant="primary" className="me-2" onClick={() => handleEdit(album.id)}>Editar</Button>
                <Button variant="danger" className="me-2" onClick={() => handleDelete(album.id)}>Eliminar</Button>
                <Button variant="info" onClick={() => handleUploadImage(album.id)}>Agregar Imagen</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaAlbumes;
