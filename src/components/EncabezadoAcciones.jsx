import React from 'react';
import { Button, Row, Col, Alert } from 'react-bootstrap';

const BackIcon = () => <span role="img" aria-label="back arrow">⬅️</span>;
const UploadIcon = () => <span role="img" aria-label="upload">⬆️</span>;
const CreateFolderIcon = () => <span role="img" aria-label="create folder">➕</span>;

const EncabezadoAcciones = ({
    usuario,
    directoryContent,
    handleGoBack,
    handleCreateFolderClick,
    handleUploadClick,
    actionError,
    actionSuccess,
    setActionError,
    setActionSuccess
}) => {
    return (
        <>
            <Row className="mb-3 align-items-center">
                <Col xs="auto">
                    <h1>Explorador de {usuario}</h1>
                </Col>
                {usuario === 'errore' && (
                    <Col>
                        <Alert variant="danger">Error al obtener el nombre de usuario.</Alert>
                    </Col>
                )}
            </Row>

            <Row className="mb-3 align-items-center gx-2">
                <Col xs="auto">
                    {directoryContent.parentPath !== null && (
                        <Button variant="secondary" onClick={handleGoBack} title="Volver atrás">
                            <BackIcon /> Atrás
                        </Button>
                    )}
                </Col>
                <Col xs="auto">
                    <Button variant="success" onClick={handleCreateFolderClick} title="Crear nueva carpeta">
                        <CreateFolderIcon /> Crear Carpeta
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" onClick={handleUploadClick} title="Subir archivo">
                        <UploadIcon /> Subir Foto
                    </Button>
                </Col>
                <Col>
                    <span className="text-muted align-middle">Ruta: / {directoryContent.currentPath || 'Raíz'}</span>
                </Col>
            </Row>

            {actionError && <Alert variant="danger" onClose={() => setActionError(null)} dismissible>{actionError}</Alert>}
            {actionSuccess && <Alert variant="success" onClose={() => setActionSuccess(null)} dismissible>{actionSuccess}</Alert>}
        </>
    );
};

export default EncabezadoAcciones;