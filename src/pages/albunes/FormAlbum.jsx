import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const FormAlbum = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [artistaId, setArtistaId] = useState("");
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/artista")
            .then(res => setArtistas(res.data))
            .catch(error => console.error("Error fetching artists:", error));
    }, []);

    useEffect(() => {
        if (albumId) {
            axios.get(`http://localhost:3000/album/${albumId}`)
                .then(res => {
                    setTitulo(res.data.titulo);
                    setArtistaId(res.data.artista.id);
                })
                .catch(error => console.error("Error loading album details:", error));
        }
    }, [albumId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const albumDto = {
            titulo,
            artistaId: parseInt(artistaId)
        };

        const request = albumId
            ? axios.put(`http://localhost:3000/album/${albumId}`, albumDto)
            : axios.post("http://localhost:3000/album", albumDto);

        request
            .then(() => {
                alert(`Álbum ${albumId ? 'actualizado' : 'creado'} exitosamente`);
                navigate('/lista-albumes');
            })
            .catch(error => {
                console.error(`Error ${albumId ? 'updating' : 'creating'} album:`, error);
                alert(`Error al ${albumId ? 'actualizar' : 'crear'} el álbum`);
            });
    };

    return (
        <Container className="mt-4">
            <h2>{albumId ? "Editar Álbum" : "Crear Nuevo Álbum"}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Título del Álbum</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa el título del álbum"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Artista</Form.Label>
                    <Form.Select
                        value={artistaId}
                        onChange={(e) => setArtistaId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un artista</option>
                        {artistas.map(artista => (
                            <option key={artista.id} value={artista.id}>
                                {artista.nombre}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {albumId ? "Actualizar Álbum" : "Crear Álbum"}
                </Button>
            </Form>
        </Container>
    );
};

export default FormAlbum;
