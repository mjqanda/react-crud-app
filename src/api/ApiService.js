import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Function to retrieve the JWT token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Axios instance default configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the Authorization header with the Bearer token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    // const token = "48509klfasd;lfkjasdf"; //invalid token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getEmployeeById = (id) => {
  return axiosInstance.get(`/employee/${id}`);
};

const getAllEmployees = () => {
  return axiosInstance.get('/employee/employees');
};

const createEmployee = (employee) => {
  return axiosInstance.post('/employee/create', employee);
};

const updateEmployee = (id, employee) => {
  return axiosInstance.put(`/employee/update/${id}`, employee);
};

const deleteEmployee = (id) => {
  return axiosInstance.delete(`/employee/delete/${id}`);
};

const signIn = (username, password) => {
  return axiosInstance.post('/signin', { username, password });
};

export { getEmployeeById, getAllEmployees, createEmployee, updateEmployee, deleteEmployee, signIn };