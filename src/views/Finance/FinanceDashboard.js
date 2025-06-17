import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Spinner, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getFinanceDashboardStats } from '../../apicall';

const FinanceDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const staffName = localStorage.getItem("staffName") || "Finance Staff";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getFinanceDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Container className="text-center mt-5"><Spinner /></Container>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-2">Finance Dashboard</h1>
      <p className="text-center text-muted mb-5">Welcome, {staffName}.</p>
      {error && <Alert color="danger">{error}</Alert>}
      <Row>
        <Col md="6" className="mb-4">
          <Card className="text-center h-100 shadow border-warning">
            <CardBody>
              <CardTitle tag="h4">Waiting for Disbursement</CardTitle>
              <h1 className="display-3 text-warning">{stats?.waitingDisbursement ?? 0}</h1>
              <Link to="/finance/disburse" className="btn btn-warning mt-3">
                View Disbursement List
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" className="mb-4">
          <Card className="text-center h-100 shadow border-success">
            <CardBody>
              <CardTitle tag="h4">Total Aid Disbursed</CardTitle>
              <h1 className="display-3 text-success">{stats?.alreadyDisbursed ?? 0}</h1>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FinanceDashboard;