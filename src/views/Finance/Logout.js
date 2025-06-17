// src/views/Finance/FinanceLogout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

const FinanceLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a short timer to show the message before clearing data and redirecting
    const logoutTimer = setTimeout(() => {
      // Clear all authentication data
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('authToken');
      localStorage.removeItem('staffName');

      // FIX: Redirect to the correct finance login page
      navigate('/finance/login');
    }, 1500);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(logoutTimer);

  }, [navigate]);

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-secondary">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5 text-center">
                <div className="mb-4">
                  <i className="fas fa-spinner fa-spin fa-3x text-success mb-3"></i>
                  <h2 className="text-muted">Logging out...</h2>
                  <p className="text-sm text-muted">
                    You are being securely logged out.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FinanceLogout;