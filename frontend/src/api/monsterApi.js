import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000";

export const getMonstersByName = (name = "") =>
  axios.get(`${API_BASE_URL}/Monster/`, { params: { name } });

export const getMonsterById = (id) =>
  axios.get(`${API_BASE_URL}/Monster/${id}/`);

export const createMonster = (data) =>
  axios.post(`${API_BASE_URL}/Monster/`, data);

export const updateMonster = (id, data) =>
  axios.put(`${API_BASE_URL}/Monster/${id}/`, data);

export const deleteMonster = (id) =>
  axios.delete(`${API_BASE_URL}/Monster/${id}/`);

export const createUser = (email, username, password) =>
  axios.post(`${API_BASE_URL}/User/`, { email, username, password });
