import axios from 'axios';

export default async function getMoxiosItem(id) {
  const reponse = await axios.get(`/items/${id}/`);
  return reponse.data;
}
