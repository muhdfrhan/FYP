// src/views/Finance/FinanceLogin.js
import React, { useState } from 'react';
// FIX: Import useNavigate instead of useHistory
import { useNavigate } from 'react-router-dom'; 
import { Container, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, Spinner } from 'reactstrap';
import zakaticon from 'assets/img/zakat-icon.png';
import { financeLogin } from '../../apicall';

const FinanceLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // FIX: Use the useNavigate hook
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await financeLogin(username, password);
      // FIX: Use navigate('/path') instead of history.push('/path')
      navigate('/finance/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ... the rest of your return statement (JSX) does not need to change
  return (
    <div className="container mt-7 d-flex justify-content-center">
      <div className="col-lg-5 col-md-7">
        <div className="card bg-secondary shadow" style={{ border: "2px solid #04d651" }}>
          <div className="card-header bg-white pb-5 text-center">
            <img
              src={zakaticon}
              alt="Zakat Logo"
              className="img-fluid d-block mx-auto my-3"
              style={{ maxWidth: "120px", height: "auto" }}
            />
            <h2 className="text-muted">Finance Staff Login</h2>
            <h4 className="text-muted">Welcome Back!</h4>
            <hr />
             <p className="text-muted">Please enter your finance staff credentials to access your account.</p>
          </div>
          <div className="card-body px-lg-5 py-lg-1">
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}
            <form role="form" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="form-control-label">Username</label>
                <input
                  type="text"
                  className="form-control form-control-alternative"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-control-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-alternative"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary my-4 w-100" style={{ backgroundColor: "#04d651", border: "none", color: "#fff" }}disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center text-muted mt-3">
          <small>© {new Date().getFullYear()} Zakat Aid System</small>
        </div>
      </div>
    </div>
  );
};

export default FinanceLogin;