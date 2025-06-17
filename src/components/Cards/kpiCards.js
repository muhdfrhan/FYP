// src/components/Cards/KpiCard.js
import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';

const KpiCard = ({ title, value, icon, iconColor }) => {
  return (
    <Card className="card-stats mb-4 mb-xl-0 shadow">
      <CardBody>
        <Row>
          <div className="col">
            <h5 className="card-title text-uppercase text-muted mb-0">{title}</h5>
            <span className="h2 font-weight-bold mb-0">{value}</span>
          </div>
          <Col className="col-auto">
            <div className={`icon icon-shape bg-${iconColor} text-white rounded-circle shadow`}>
              <i className={icon} />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default KpiCard;