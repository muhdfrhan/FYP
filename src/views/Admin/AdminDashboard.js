// src/views/Admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Table, Spinner, Alert } from 'reactstrap';
import { Bar, Pie, Line } from 'react-chartjs-2'; // Import Line chart
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Import all necessary API calls
import { getAdminStatusFunnel, getAdminCategoryBreakdown, getAdminKpiSummary, getApplicationsOverTime, getRecentPending } from '../../apicall';
import KpiCard from 'components/Cards/kpiCards'; // Import our new KPI Card

// Register all Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // State for all our data points
  const [kpiData, setKpiData] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel for speed
        const [kpis, status, category, timeSeries, pending] = await Promise.all([
          getAdminKpiSummary(),
          getAdminStatusFunnel(),
          getAdminCategoryBreakdown(),
          getApplicationsOverTime(),
          getRecentPending(),
        ]);

        // Set all state variables
        setKpiData(kpis);
        setRecentApps(pending);

        // Format data for charts
        setStatusData({
          labels: status.map(item => item.application_status),
          datasets: [{ label: "# of Applications", data: status.map(item => item.total_applications), backgroundColor: "rgba(94, 114, 228, 0.8)" }]
        });
        setCategoryData({
          labels: category.map(item => item.category_name),
          datasets: [{ data: category.map(item => item.number_of_applications), backgroundColor: ['#5e72e4', '#f5365c', '#2dce89', '#11cdef', '#fb6340', '#ffd600'] }]
        });
        setTimeData({
            labels: timeSeries.map(item => item.submission_month),
            datasets: [{ label: "New Applications", data: timeSeries.map(item => item.application_count), fill: false, borderColor: '#2dce89', tension: 0.1 }]
        });

      } catch (err) {
        setError("Failed to load dashboard data. Please check the server and your connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Container fluid className="p-4 text-center"><Spinner /></Container>;
  if (error) return <Container fluid className="p-4"><Alert color="danger">{error}</Alert></Container>;

  return (
    <Container fluid className="p-6">
      {/* Row 1: KPI Cards */}
      {kpiData && (
        <Row className="mb-4">
          <Col lg="6" xl="3"><KpiCard title="Avg. Processing" value={`${kpiData.avgProcessingDays} Days`} icon="fas fa-clock" iconColor="info" /></Col>
          <Col lg="6" xl="3"><KpiCard title="Approved Aid (RM)" value={kpiData.totalApproved.toLocaleString()} icon="fas fa-check" iconColor="success" /></Col>
          <Col lg="6" xl="3"><KpiCard title="Disbursed Aid (RM)" value={kpiData.totalDisbursed.toLocaleString()} icon="fas fa-coins" iconColor="green" /></Col>
          <Col lg="6" xl="3"><KpiCard title="Awaiting Disbursement (RM)" value={kpiData.awaitingDisbursement.toLocaleString()} icon="fas fa-hourglass-half" iconColor="warning" /></Col>
        </Row>
      )}

      {/* Row 2: Charts */}
      <Row>
        <Col xl="8" className="mb-5 mb-xl-0">
          <Card className="shadow"><CardHeader><h3 className="mb-0">Applications Per Month</h3></CardHeader><CardBody>{timeData && <Line data={timeData} />}</CardBody></Card>
        </Col>
        <Col xl="4">
          <Card className="shadow"><CardHeader><h3 className="mb-0">Applications by Category</h3></CardHeader><CardBody>{categoryData && <Pie data={categoryData} />}</CardBody></Card>
        </Col>
      </Row>

      {/* Row 3: More Info */}
      <Row className="mt-5">
         <Col xl="7" className="mb-5 mb-xl-0">
            <Card className="shadow"><CardHeader><h3 className="mb-0">Application Status</h3></CardHeader><CardBody>{statusData && <Bar data={statusData} />}</CardBody></Card>
        </Col>
        <Col xl="5">
            <Card className="shadow">
                <CardHeader className="border-0"><h3 className="mb-0">Recent Pending Applications</h3></CardHeader>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light"><tr><th>Applicant</th><th>Days Pending</th><th>Status</th></tr></thead>
                    <tbody>
                        {recentApps.map(app => (
                            <tr key={app.application_id}>
                                <td>{app.full_name}</td>
                                <td>{app.days_pending}</td>
                                <td><span className="badge badge-dot mr-4"><i className="bg-warning"></i>{app.application_status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;