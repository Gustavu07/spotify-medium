import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListaGeneros = () => {
  const [generos, setGeneros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/genero')
      .then(res => setGeneros(res.data))
      .catch(err => {
        console.error('Error al obtener los géneros:', err);
        alert("No se pudieron cargar los géneros.");
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar-genero/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este género?')) {
      axios.delete(`http://localhost:3000/genero/${id}`)
        .then(() => {
          setGeneros(prevGeneros => prevGeneros.filter(genero => genero.id !== id));
        })
        .catch(err => {
          console.error('Error al eliminar el género:', err);
          alert('No se pudo eliminar el género.');
        });
    }
  };

  const handleUploadImage = (id) => {
    navigate(`/subir-imagen-genero/${id}`);
  };

  const handleAdd = () => {
    navigate('/nuevo-genero');
  };

  return (
    <Container className="mt-4">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <a className="navbar-brand fw-bold text-white" href="/">Catálogo de Géneros</a>
        <Button variant="success" onClick={handleAdd}>
          + Crear Nuevo Género
        </Button>
      </nav>

      <h2 className="mb-3">Lista de Géneros</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map(genero => (
            <tr key={genero.id}>
              <td>{genero.id}</td>
              <td>{genero.nombre}</td>
              <td>
                <img src={`http://localhost:3000/uploads/${genero.id}.jpg`}  width="100" />
              </td>
              <td>
                <Button variant="primary" className="me-2" onClick={() => handleEdit(genero.id)}>Editar</Button>
                <Button variant="danger" className="me-2" onClick={() => handleDelete(genero.id)}>Eliminar</Button>
                <Button variant="info" onClick={() => handleUploadImage(genero.id)}>Agregar Imagen</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaGeneros;
