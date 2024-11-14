import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListaCanciones = () => {
  const [canciones, setCanciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/cancion') 
      .then(response => {
        setCanciones(response.data); 
      })
      .catch(error => {
        console.error('Error al obtener las canciones:', error);
        alert("No se pudieron cargar las canciones.");
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar-cancion/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta canción?')) {
      axios.delete(`http://localhost:3000/cancion/${id}`)
        .then(() => {
          setCanciones(prevCanciones => prevCanciones.filter(cancion => cancion.id !== id));
        })
        .catch(error => {
          console.error('Error al eliminar la canción:', error);
          alert('No se pudo eliminar la canción.');
        });
    }
  };

  const handleAdd = () => {
    navigate('/nueva-cancion');
  };

  return (
    <Container className="mt-4">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <a className="navbar-brand fw-bold text-white" href="/">Catálogo de Canciones</a>
        <Button variant="success" onClick={handleAdd}>
          + Crear Nueva Canción
        </Button>
      </nav>

      <h2 className="mb-3">Lista de Canciones</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {canciones.map(cancion => (
            <tr key={cancion.id}>
              <td>{cancion.id}</td>
              <td>{cancion.titulo}</td>
              <td>
                <Button variant="primary" className="me-2" onClick={() => handleEdit(cancion.id)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(cancion.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaCanciones;
