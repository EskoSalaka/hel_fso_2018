import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then(response => {
    return response.data;
  });
};

const addNewPerson = newPerson => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => {
    return response.data;
  });
};

const updatePerson = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then(response => {
    return response.data;
  });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => {
    return response.data;
  });
};

export default { getAllPersons, addNewPerson, updatePerson, deletePerson };
