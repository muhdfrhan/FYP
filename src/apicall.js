// src/apicall.js
import axios from "axios";

// --- Ensure these are at the top of your file ---
const BASE_URL = "http://192.168.0.240:3000/api"; 

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("authToken");

// Helper to create the authorization header
const getAuthHeader = () => {
  const token = getToken();
  if (!token) {
    console.error("Auth token not found for API request.");
    return {};
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

// --- FINANCE MODULE API CALLS ---

/**
 * Logs in a finance staff member and stores their token and role.
 */
export const financeLogin = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/finance/login`, { username, password });
  if (response.data && response.data.token) {
    // Store token and role to manage session and access
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("role", "finance");
    localStorage.setItem("staffName", response.data.user.name); // Store name for UI
  }
  return response.data;
};

/**
 * Fetches the statistics for the finance dashboard (original simple version).
 */
export const getFinanceDashboardStats = async () => {
  // This endpoint was created in our backend `financeActions.js` file
  const response = await axios.get(`${BASE_URL}/finance/dashboard-stats`, getAuthHeader());
  return response.data;
};

/**
 * Fetches all applications that are 'Approved' and waiting for disbursement.
 */
export const getApprovedApplications = async () => {
  const response = await axios.get(`${BASE_URL}/finance/approved-applications`, getAuthHeader());
  return response.data;
};

/**
 * Marks an application as disbursed and records the transaction.
 */
export const disburseAid = async (applicationId, disbursementData) => {
  const response = await axios.post(
    `${BASE_URL}/finance/disburse/${applicationId}`,
    disbursementData,
    getAuthHeader()
  );
  return response.data;
};

// --- ADMIN MODULE API CALLS ---

/**
 * Logs in an admin staff member and stores their token and role.
 */
export const adminLogin = async (username, password) => {
  // Uses the backend route we created: /api/auth/admin/login
  const response = await axios.post(`${BASE_URL}/auth/admin/login`, { username, password });
  if (response.data && response.data.token) {
    // Store token and role to manage session and access
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("role", "admin"); // <-- Critical for PrivateRoute
    localStorage.setItem("staffName", response.data.user.name); // Store name for UI
  }
  return response.data;
};

/**
 * Fetches the application status funnel data for the admin dashboard.
 */
export const getAdminStatusFunnel = async () => {
  // Uses the protected backend route: /api/reports/status-funnel
  const response = await axios.get(`${BASE_URL}/reports/status-funnel`, getAuthHeader());
  return response.data;
};

/**
 * Fetches the application by category data for the admin dashboard.
 */
export const getAdminCategoryBreakdown = async () => {
  // Uses the protected backend route: /api/reports/category-breakdown
  const response = await axios.get(`${BASE_URL}/reports/category-breakdown`, getAuthHeader());
  return response.data;
};

export const getAdminKpiSummary = async () => {
  const response = await axios.get(`${BASE_URL}/reports/kpi-summary`, getAuthHeader());
  return response.data;
};

/**
 * Fetches the applications over time data for the line chart.
 */
export const getApplicationsOverTime = async () => {
  const response = await axios.get(`${BASE_URL}/reports/applications-over-time`, getAuthHeader());
  return response.data;
};

/**
 * Fetches the 5 most recent pending applications.
 */
export const getRecentPending = async () => {
  const response = await axios.get(`${BASE_URL}/reports/recent-pending`, getAuthHeader());
  return response.data;
};
