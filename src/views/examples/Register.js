//Fronend for applicant Registration
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Label,
} from "reactstrap";
import { register } from "../../apicall"; // adjust the path as needed
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nric: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    maritalStatus: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
  if (!validate()) return;

  try {
    const data = await register(formData); // call API
    alert(data.message || "Registered successfully!");
    
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      nric: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      maritalStatus: "",
      salary: "",
    });

    // Redirect to login page
    navigate("/auth/loginApplicants");
  } catch (err) {
    console.error("Registration error:", err);
    alert("Registration failed. Please try again.");
  }
};


  return (
    <Col lg="6" md="8" className="mt-0">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small style={{ fontWeight: "bold", fontSize: "1rem", color: "#5e72e4" }}>
              Please Sign Up Here
            </small>
          </div>
          <Form role="form">
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
            </FormGroup>

            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="ni ni-email-83" /></InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </FormGroup>

            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="ni ni-badge" /></InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="NRIC (e.g. 900101-14-5678)"
                  type="text"
                  name="nric"
                  value={formData.nric}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              {errors.nric && <small className="text-danger">{errors.nric}</small>}
            </FormGroup>

            <FormGroup>
              <Label className="form-control-label">Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              {errors.dateOfBirth && <small className="text-danger">{errors.dateOfBirth}</small>}
            </FormGroup>

            <FormGroup>
              <Label className="form-control-label">Address</Label>
              <Input
                type="textarea"
                rows="2"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </FormGroup>

            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="ni ni-mobile-button" /></InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Phone Number"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </FormGroup>

            <FormGroup>
              <Label className="form-control-label">Marital Status</Label>
              <Input
                type="select"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
              </Input>
              {errors.maritalStatus && <small className="text-danger">{errors.maritalStatus}</small>}
            </FormGroup>

            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="ni ni-money-coins" /></InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Salary (e.g. 4500.00)"
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              {errors.salary && <small className="text-danger">{errors.salary}</small>}
            </FormGroup>

            <div className="text-center">
              <Button className="mt-4" color="primary" type="button" onClick={handleSubmit}>
                Create account
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
