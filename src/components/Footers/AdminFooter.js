// reactstrap components
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer bg-primary text-white py-4">
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          <Col md="6">
            <div>
              © {new Date().getFullYear()} MyDashboard. All rights reserved.
            </div>
          </Col>
          <Col md="6" className="text-right">
            <a href="/about" className="text-white mx-2">
              About
            </a>
            <a href="/contact" className="text-white mx-2">
              Contact
            </a>
            <a href="/privacy" className="text-white mx-2">
              Privacy Policy
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
