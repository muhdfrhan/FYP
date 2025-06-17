// src/views/Admin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, Form, Input, Container, Row, Col } from 'reactstrap';
import zakaticon from 'assets/img/zakat-icon.png';
import { adminLogin } from '../../apicall';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(username, password);
      navigate('/admin/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardHeader className="bg-transparent pb-4 text-center">
                 <img src={zakaticon} alt="Zakat Logo" style={{ maxWidth: "100px" }}/>
                 <h2 className="text-muted mt-3">Administrator Portal</h2>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <Form role="form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <Input className="mb-3" placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label>Password</label>
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="text-center">
                        <Button className="my-4 w-100" color="primary" type="submit" disabled={loading}>
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;