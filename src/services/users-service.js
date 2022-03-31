import axios from "axios";
const BASE_URL = "https://anusha-node-a4.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";

const SECURITY_API = `${BASE_URL}/auth`;
const USERS_API = `${BASE_URL}/users`;

export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  axios.get(`${SECURITY_API}/login`, credentials)
    .then(response => response.data);


const service = {
  findAllUsers
}

export default service;