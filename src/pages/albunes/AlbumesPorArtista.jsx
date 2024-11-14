import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, ListGroup, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import { FaCog, FaSearch } from 'react-icons/fa';

const AlbumesPorArtista = () => {
    const { artistaId } = useParams();
    const navigate = useNavigate();
    const [albumesFiltrados, setAlbumesFiltrados] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/album')
            .then(response => {
                const filtrados = response.data.filter(album => album.artista.id === parseInt(artistaId));
                setAlbumesFiltrados(filtrados);
            })
            .catch(error => console.error('Error al obtener los álbumes:', error));
    }, [artistaId]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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
            <Container className="mt-4">
                <h2>Álbumes del Artista</h2>
                {albumesFiltrados.length > 0 ? (
                    <ListGroup>
                        {albumesFiltrados.map(album => (
                            <ListGroup.Item key={album.id} className="d-flex justify-content-between">
                                <span>{album.titulo}</span>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/album/${album.id}/canciones`)}
                                >
                                    Ver Detalles
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No se encontraron álbumes para este artista.</p>
                )}
            </Container>
        </>
    );
};

export default AlbumesPorArtista;
