import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Navbar, Form, FormControl, Dropdown, Button } from 'react-bootstrap';
import { FaCog, FaSearch } from 'react-icons/fa';

const CancionesPorAlbum = () => {
    const { albumId } = useParams();
    const [canciones, setCanciones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/cancion')
            .then(response => {
                const cancionesFiltradas = response.data.filter(cancion => cancion.album.id === parseInt(albumId));
                setCanciones(cancionesFiltradas);
            })
            .catch(error => console.error('Error al obtener las canciones:', error));
    }, [albumId]);

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
                <h2>Canciones del Álbum</h2>
                {canciones.length > 0 ? (
                    <ListGroup>
                        {canciones.map(cancion => (
                            <ListGroup.Item key={cancion.id}>
                                {cancion.titulo}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No se encontraron canciones para este álbum.</p>
                )}
            </Container>
        </>
    );
};

export default CancionesPorAlbum;
