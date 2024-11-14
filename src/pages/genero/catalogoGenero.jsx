import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Navbar, Form, FormControl, Dropdown } from "react-bootstrap";
import { FaSearch, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CatalogoGeneros = () => {
    const [listaGeneros, setListaGeneros] = useState([]);
    const [listaArtistas, setListaArtistas] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedGenero, setSelectedGenero] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        getListaGeneros();
        getListaArtistas();
        document.title = "Catálogo de Géneros y Artistas";
    }, []);

    const getListaGeneros = () => {
        axios.get("http://localhost:3000/genero")
            .then(res => setListaGeneros(res.data))
            .catch(error => console.error("Error al obtener la lista de géneros:", error));
    };

    const getListaArtistas = () => {
        axios.get("http://localhost:3000/artista")
            .then(res => setListaArtistas(res.data))
            .catch(error => console.error("Error al obtener la lista de artistas:", error));
    };

    const handleVerArtistas = (generoId) => {
        navigate(`/genero/${generoId}/artistas`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); 
    };

    const handleGeneroSelect = (generoId) => {
        setSelectedGenero(generoId); 
    };

    const generosFiltrados = listaGeneros.filter(genero =>
        genero.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const artistasFiltrados = listaArtistas.filter(artista => {
        const matchesGenero = selectedGenero ? artista.generoId === selectedGenero : true; 
        const matchesNombre = artista.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesGenero && matchesNombre; 
    });

    const handleMenuSelect = (eventKey) => {
        navigate(`/${eventKey}`);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow p-3">
                <Navbar.Brand href="#" className="fw-bold text-white d-flex align-items-center">
                    <img
                        src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2021/03/Spotify-Logo-Green-Black.jpg?fit=2000%2C1333&quality=50&strip=all&ssl=1"
                        alt="Spotify Logo"
                        style={{ width: '30px', height: '30px', marginRight: '10px' }}
                    />
                    Spotify
                </Navbar.Brand>
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

            <Container className="mt-4 mb-4">
                {/* Filtro por Género */}
                <Row>
                    <Col md={12} className="mb-4">
                        <h4>Filtrar por Género</h4>
                        <Dropdown onSelect={handleGeneroSelect}>
                            <Dropdown.Toggle variant="secondary">Seleccionar Género</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={null}>Todos los géneros</Dropdown.Item>
                                {listaGeneros.map(genero => (
                                    <Dropdown.Item key={genero.id} eventKey={genero.id}>
                                        {genero.nombre}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    {generosFiltrados.length > 0 && (
                        <Col md={12}>
                            <h4>Géneros</h4>
                            <Row>
                                {generosFiltrados.map(genero => (
                                    <Col key={genero.id} md={4} className="mb-4">
                                        <Card
                                            className="shadow-sm h-100 text-white"
                                            style={{
                                                borderRadius: "10px",
                                                backgroundColor: genero.color || getRandomColor(),
                                                position: "relative",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <Card.Body className="d-flex flex-column justify-content-end">
                                                <div style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    overflow: "hidden",
                                                    borderRadius: "5px",
                                                    marginBottom: "15px"
                                                }}>
                                                    <img
                                                        src={`http://localhost:3000/uploads/${genero.id}.jpg`}
                                                        alt={genero.nombre}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                </div>
                                                <Card.Title className="fw-bold">{genero.nombre}</Card.Title>
                                                <Button
                                                    variant="light"
                                                    className="mt-2"
                                                    onClick={() => handleVerArtistas(genero.id)}
                                                >
                                                    Explorar {genero.nombre}
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    )}

                    {artistasFiltrados.length > 0 && (
                        <Col md={12}>
                            <h4>Artistas</h4>
                            <Row>
                                {artistasFiltrados.map(artista => (
                                    <Col key={artista.id} md={4} className="mb-4">
                                        <Card className="shadow-sm h-100 text-white">
                                            <Card.Body className="d-flex flex-column justify-content-end">
                                                <Card.Title className="fw-bold">{artista.nombre}</Card.Title>
                                                <Button
                                                    variant="light"
                                                    className="mt-2"
                                                    onClick={() => navigate(`/artista/${artista.id}`)}
                                                >
                                                    Ver {artista.nombre}
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
};

const getRandomColor = () => {
    const colors = ["#E91E63", "#9C27B0", "#2196F3", "#4CAF50", "#FF9800", "#FFC107", "#3F51B5", "#FF5722"];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default CatalogoGeneros;
