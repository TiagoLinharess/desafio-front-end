import axios from 'axios';

export const locationsApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export const mockApi = axios.create({
  baseURL: 'https://606bb9fbf8678400172e680f.mockapi.io/api',
})