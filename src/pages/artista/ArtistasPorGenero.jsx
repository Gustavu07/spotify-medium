import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Navbar, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { FaSearch, FaCog } from "react-icons/fa";

const ArtistasPorGenero = () => {
    const { generoId } = useParams();
    const [artistas, setArtistas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/genero/${generoId}/artistas`)
            .then(res => setArtistas(res.data))
            .catch(error => console.error("Error al obtener los artistas:", error));
    }, [generoId]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow p-3">
                <Navbar.Brand href="#" className="fw-bold text-white">Artistas</Navbar.Brand>
                <Form className="d-flex mx-auto" style={{ maxWidth: "400px", width: "100%" }}>
                    <FormControl
                        type="search"
                        placeholder="¿Qué quieres reproducir?"
                        className="me-2"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button variant="light"><FaSearch /></Button>
                </Form>
                <div className="ms-auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className="text-white">
                            <FaCog size={24} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item href="/lista-generos">Ver Géneros</Dropdown.Item>
                            <Dropdown.Item href="/lista-albumes">Ver Álbumes</Dropdown.Item>
                            <Dropdown.Item href="/lista-artista">Ver Artistas</Dropdown.Item>
                            <Dropdown.Item href="/lista-canciones">Ver Canciones</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Navbar>

            <Container className="mt-4">
                <h2>Artistas del Género</h2>
                <Row>
                    {artistas
                        .filter(artista => artista.nombre.toLowerCase().includes(searchTerm.toLowerCase())) // Filtrar por búsqueda
                        .map(artista => (
                            <Col key={artista.id} md={4} className="mb-4">
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <Card.Title>
                                            <Link to={`/artista/${artista.id}/albumes`} className="text-decoration-none text-dark">
                                                {artista.nombre}
                                            </Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    );
};

export default ArtistasPorGenero;
