/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  return (
    <>
      <div className="header bg-gradient-default pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {/* Total Zakat Collected */}
                            <Col lg="6" xl="3">
                              <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                        tag="h5"
                                        className="text-uppercase text-muted mb-0"
                                      >
                                        Total Zakat Collected
                                      </CardTitle>
                                      <span className="h2 font-weight-bold mb-0">RM 350,897</span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                        <i className="fas fa-hand-holding-usd" />
                                      </div>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Col>
              {/* Pending Collections */}
                            <Col lg="6" xl="3">
                              <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                        tag="h5"
                                        className="text-uppercase text-muted mb-0"
                                      >
                                        Pending Collections
                                      </CardTitle>
                                      <span className="h2 font-weight-bold mb-0">2,356</span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                        <i className="fas fa-clock" />
                                      </div>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Col>
   
             {/* Disbursed This Month */}
                           <Col lg="6" xl="3">
                             <Card className="card-stats mb-4 mb-xl-0">
                               <CardBody>
                                 <Row>
                                   <div className="col">
                                     <CardTitle
                                       tag="h5"
                                       className="text-uppercase text-muted mb-0"
                                     >
                                       Zakat Disbursed
                                     </CardTitle>
                                     <span className="h2 font-weight-bold mb-0">RM 124,000</span>
                                   </div>
                                   <Col className="col-auto">
                                     <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                       <i className="fas fa-donate" />
                                     </div>
                                   </Col>
                                 </Row>
                               </CardBody>
                             </Card>
                           </Col>
             
                           {/* Registered Beneficiaries */}
                           <Col lg="6" xl="3">
                             <Card className="card-stats mb-4 mb-xl-0">
                               <CardBody>
                                 <Row>
                                   <div className="col">
                                     <CardTitle
                                       tag="h5"
                                       className="text-uppercase text-muted mb-0"
                                     >
                                       Beneficiaries
                                     </CardTitle>
                                     <span className="h2 font-weight-bold mb-0">4,925</span>
                                   </div>
                                   <Col className="col-auto">
                                     <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                       <i className="fas fa-users" />
                                     </div>
                                   </Col>
                                 </Row>
                               </CardBody>
                             </Card>
                           </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
