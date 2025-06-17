import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Button, Spinner, Alert, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { getApprovedApplications, disburseAid } from '../../apicall';

const DisburseAid = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [formData, setFormData] = useState({ aid_type: 'Bank Transfer', notes: '' });
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [disburseError, setDisburseError] = useState('');

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getApprovedApplications();
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleDisburseClick = (app) => {
    setSelectedApp(app);
    setDisburseError('');
    setFormData({ aid_type: 'Bank Transfer', notes: '' });
    toggleModal();
  };

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmitDisbursement = async (e) => {
    e.preventDefault();
    setIsDisbursing(true);
    setDisburseError('');
    try {
      await disburseAid(selectedApp.application_id, formData);
      toggleModal();
      fetchApps(); // Refresh the list
    } catch (err) {
      setDisburseError(err.response?.data?.error || 'Failed to disburse aid.');
    } finally {
      setIsDisbursing(false);
    }
  };
  
  const formatCurrency = (val) => `RM ${parseFloat(val).toFixed(2)}`;

  if (loading) return <Container className="text-center mt-5"><Spinner /></Container>;
  if (error) return <Container className="mt-5"><Alert color="danger">{error}</Alert></Container>;

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Applications Awaiting Disbursement</h1>
      {applications.length === 0 ? (
        <Alert color="info">There are no applications currently awaiting disbursement.</Alert>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>NRIC</th>
              <th>Bank / Account No.</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.application_id}>
                <td>{app.full_name}</td>
                <td>{app.nric}</td>
                <td>{app.bank_name || 'N/A'} / {app.account_number || 'N/A'}</td>
                <td><strong>{formatCurrency(app.approved_amount)}</strong></td>
                <td>
                  <Button color="success" onClick={() => handleDisburseClick(app)}>Disburse</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedApp && (
        <Modal isOpen={modalOpen} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>Disburse Aid for {selectedApp.full_name}</ModalHeader>
          <ModalBody>
            <Alert color="success">Amount: <strong>{formatCurrency(selectedApp.approved_amount)}</strong></Alert>
            <Form onSubmit={handleSubmitDisbursement}>
              {disburseError && <Alert color="danger">{disburseError}</Alert>}
              <FormGroup>
                <Label for="aid_type">Disbursement Method</Label>
                <Input type="text" name="aid_type" id="aid_type" value={formData.aid_type} onChange={handleFormChange} required />
              </FormGroup>
              <FormGroup>
                <Label for="notes">Transaction Reference / Notes</Label>
                <Input type="textarea" name="notes" id="notes" value={formData.notes} onChange={handleFormChange} />
              </FormGroup>
              <Button color="primary" type="submit" disabled={isDisbursing} block>
                {isDisbursing ? <Spinner size="sm" /> : 'Confirm Disbursement'}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      )}
    </Container>
  );
};

export default DisburseAid;