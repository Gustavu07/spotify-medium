import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListaArtistas = () => {
  const [artistas, setArtistas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/artista')
      .then(response => {
        setArtistas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los artistas:', error);
        alert("No se pudieron cargar los artistas.");
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar-artista/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este artista?')) {
      axios.delete(`http://localhost:3000/artista/${id}`)
        .then(() => {
          setArtistas(prevArtistas => prevArtistas.filter(artista => artista.id !== id));
        })
        .catch(error => {
          console.error('Error al eliminar el artista:', error);
          alert('No se pudo eliminar el artista.');
        });
    }
  };

  const handleUploadImage = (id) => {
    navigate(`/subir-imagen-artista/${id}`);
  };

  const handleAdd = () => {
    navigate('/nuevo-artista');
  };

  return (
    <Container className="mt-4">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <a className="navbar-brand fw-bold text-white" href="/">Catálogo de Artistas</a>
        <Button variant="success" onClick={handleAdd}>
          + Crear Nuevo Artista
        </Button>
      </nav>

      <h2 className="mb-3">Lista de Artistas</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Género</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {artistas.map(artista => (
            <tr key={artista.id}>
              <td>{artista.id}</td>
              <td>{artista.nombre}</td>
              <td>{artista.genero ? artista.genero.nombre : 'N/A'}</td>
              <td>
                {/* <img src={`http://localhost:3000/uploads/${artista.id}.jpg`}  width="100" /> */}
                
              </td>
              <td>
                <Button variant="primary" className="me-2" onClick={() => handleEdit(artista.id)}>Editar</Button>
                <Button variant="danger" className="me-2" onClick={() => handleDelete(artista.id)}>Eliminar</Button>
                <Button variant="info" onClick={() => handleUploadImage(artista.id)}>Agregar Imagen</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaArtistas;
