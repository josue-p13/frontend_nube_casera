import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import EncabezadoAcciones from './EncabezadoAcciones';
import ContenidoDirectorio from './ContenidoDirectorio';
import { Container } from 'react-bootstrap';
import './principal.css';

const Principal = () => {
    const location = useLocation();
    const usuario = location.state?.usuario || 'errore';
    const [directoryContent, setDirectoryContent] = useState({ items: [], currentPath: '', parentPath: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [selectedImageName, setSelectedImageName] = useState('');
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [actionError, setActionError] = useState(null);
    const [actionSuccess, setActionSuccess] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const fileInputRef = useRef(null);

    const baseUrl = "http://192.168.10.104:8000";

    const refreshDirectory = () => {
        setRefreshKey(prevKey => prevKey + 1);
        setActionError(null);
        setActionSuccess(null);
    };

    useEffect(() => {
        if (usuario !== 'errore') {
            setLoading(true);
            setError(null);
            setActionError(null);
            setActionSuccess(null);
            const pathForFetch = directoryContent.currentPath || '';
            const encodedPath = encodeURIComponent(pathForFetch);
            fetch(`${baseUrl}/browse?user=${usuario}&subpath=${encodedPath}`)
                .then(async (res) => {
                    if (!res.ok) {
                        const errorData = await res.text().catch(() => 'Error desconocido del servidor');
                        throw new Error(`Error ${res.status}: ${errorData}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    const itemsWithFullUrl = data.items.map(item => ({
                        ...item,
                        url: item.type !== 'directory' ? `${baseUrl}${item.url}` : null
                    }));
                    setDirectoryContent({
                        ...data,
                        items: itemsWithFullUrl,
                        currentPath: data.currentPath || '',
                        parentPath: data.parentPath !== null ? (data.parentPath || '') : null
                    });
                })
                .catch((err) => {
                    console.error("Error fetching directory content:", err);
                    setError(err.message || "Error al cargar el contenido.");
                    setDirectoryContent({ items: [], currentPath: '', parentPath: null });
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError("Error: No se pudo obtener el nombre de usuario.");
            setDirectoryContent({ items: [], currentPath: '', parentPath: null });
        }
    }, [usuario, refreshKey, baseUrl]);

    const handleItemClick = (item) => {
        if (item.type === 'directory') {
            setDirectoryContent(prev => ({ ...prev, currentPath: item.path }));
            refreshDirectory();
        } else if (item.url) {
            setSelectedImageUrl(item.url);
            setSelectedImageName(item.name);
            setShowImageModal(true);
        }
    };

    const handleGoBack = () => {
        if (directoryContent.parentPath !== null) {
            setDirectoryContent(prev => ({ ...prev, currentPath: prev.parentPath }));
            refreshDirectory();
        }
    };

    const handleCloseModal = () => setShowImageModal(false);
    const handleCloseCreateFolderModal = () => {
        setShowCreateFolderModal(false);
        setNewFolderName('');
        setActionError(null);
    };

    const handleCreateFolderClick = () => {
        setShowCreateFolderModal(true);
    };

    const handleCreateFolderSubmit = async (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) {
            setActionError("El nombre de la carpeta no puede estar vacío.");
            return;
        }
        setLoading(true);
        setActionError(null);
        setActionSuccess(null);

        try {
            const encodedPath = encodeURIComponent(directoryContent.currentPath);
            const response = await fetch(`${baseUrl}/create_folder/${usuario}?subpath=${encodedPath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ folder_name: newFolderName }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || `Error ${response.status}`);
            }
            setActionSuccess(data.message || 'Carpeta creada con éxito.');
            handleCloseCreateFolderModal();
            refreshDirectory();
        } catch (err) {
            console.error("Error creating folder:", err);
            setActionError(err.message || "Error al crear la carpeta.");
        } finally {
            setLoading(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        setLoading(true);
        setActionError(null);
        setActionSuccess(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('subpath', directoryContent.currentPath || '');

        try {
            const response = await fetch(`${baseUrl}/upload/${usuario}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || `Error ${response.status}`);
            }
            setActionSuccess(data.message || 'Archivo subido con éxito.');
            refreshDirectory();
        } catch (err) {
            console.error("Error uploading file:", err);
            setActionError(err.message || "Error al subir el archivo.");
        } finally {
            setLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <Container fluid className="mt-3">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif, image/webp"
            />

            <EncabezadoAcciones
                usuario={usuario}
                directoryContent={directoryContent}
                handleGoBack={handleGoBack}
                handleCreateFolderClick={handleCreateFolderClick}
                handleUploadClick={handleUploadClick}
                actionError={actionError}
                actionSuccess={actionSuccess}
                setActionError={setActionError}
                setActionSuccess={setActionSuccess}
            />

            <ContenidoDirectorio
                directoryContent={directoryContent}
                loading={loading}
                error={error}
                handleItemClick={handleItemClick}
            />

            <Modal show={showImageModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedImageName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img src={selectedImageUrl} alt={selectedImageName} style={{ maxWidth: '100%', maxHeight: '70vh' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreateFolderModal} onHide={handleCloseCreateFolderModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Carpeta</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreateFolderSubmit}>
                    <Modal.Body>
                        {actionError && <Alert variant="danger">{actionError}</Alert>}
                        <Form.Group controlId="newFolderName">
                            <Form.Label>Nombre de la carpeta:</Form.Label>
                            <Form.Control
                                type="text"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                required
                                autoFocus
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateFolderModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Crear'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default Principal;