import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const SubirImagenGenero = () => {
  const { id } = useParams();
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) {
      alert('Por favor selecciona una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('image', imagen);

    try {
      const res = await axios.post(`http://localhost:3000/genero/${id}/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Imagen subida exitosamente.');
      navigate('/'); 
    } catch (err) {
      console.error('Error al subir la imagen:', err);
      alert('No se pudo subir la imagen.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Subir Imagen para Género {id}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleccionar imagen (solo JPG)</Form.Label>
          <Form.Control type="file" accept=".jpg" onChange={handleImageChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Subir Imagen</Button>
      </Form>
    </Container>
  );
};

export default SubirImagenGenero;
