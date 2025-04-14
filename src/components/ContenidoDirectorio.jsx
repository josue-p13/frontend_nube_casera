import React from 'react';
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const FolderIcon = () => <span role="img" aria-label="folder" style={{ fontSize: '3rem' }}>📁</span>;

const ContenidoDirectorio = ({ directoryContent, loading, error, handleItemClick }) => {
    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p>Cargando...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">Error General: {error}</Alert>;
    }

    return (
        <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-1 g-md-2">
            {directoryContent.items.map((item, index) => (
                <Col key={index}>
                    <div className="card-container">
                        <Card
                            onClick={() => handleItemClick(item)}
                            className="custom-card shadow-sm border-0"
                            style={{ cursor: item.type === 'directory' || item.url ? 'pointer' : 'default' }}
                            title={item.name}
                        >
                            {item.type === 'directory' ? (
                                <Card.Body className="d-flex flex-column justify-content-center align-items-center p-1 h-100">
                                    <FolderIcon />
                                    <Card.Title as="div" className="mt-1 fs-6 text-truncate w-100 text-center">
                                        {item.name}
                                    </Card.Title>
                                </Card.Body>
                            ) : (
                                <Card.Img
                                    variant="top"
                                    src={item.url}
                                    alt={item.name}
                                    className="custom-card-img"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}
                        </Card>
                    </div>
                </Col>
            ))}
            {directoryContent.items.length === 0 && !loading && (
                <Col xs={12}><p className="text-muted">Esta carpeta está vacía.</p></Col>
            )}
        </Row>
    );
};

export default ContenidoDirectorio;