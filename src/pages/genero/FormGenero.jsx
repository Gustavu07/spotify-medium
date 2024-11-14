import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormGenero = () => {
    const navigate = useNavigate();
    const { generoId } = useParams();  
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (generoId) {
            axios.get(`http://localhost:3000/genero/${generoId}`)
                .then(res => setNombre(res.data.nombre))
                .catch(err => {
                    console.error('Error al cargar los datos del género:', err);
                    alert('Error al cargar los datos del género. ' + (err.response ? err.response.data.message : err.message));
                });
        }
    }, [generoId]);

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const genero = { nombre };

        if (generoId) {
            
            axios.put(`http://localhost:3000/genero/${generoId}`, genero)
                .then(res => {
                    console.log("Género actualizado:", res.data);
                    navigate('/lista-generos');
                })
                .catch(error => {
                    console.error("Error al actualizar el género:", error);
                    alert("Error al actualizar el género. " + (error.response ? error.response.data.message : error.message));
                });
        } else {
            axios.post('http://localhost:3000/genero', genero)
                .then(res => {
                    console.log("Género creado:", res.data);
                    navigate('/lista-generos');
                })
                .catch(error => {
                    console.error("Error al insertar género:", error);
                    alert("Error al insertar el género. " + (error.response ? error.response.data.message : error.message));
                });
        }
    };

    return (
        <Container>
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>
                        <h2>{generoId ? 'Editar Género' : 'Crear Género'}</h2>
                    </Card.Title>
                    <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre del género:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre del género"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, ingrese un nombre válido.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4">
                            {generoId ? 'Actualizar Género' : 'Crear Género'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FormGenero;
