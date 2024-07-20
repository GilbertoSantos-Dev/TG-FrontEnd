import api from '@utils/api';

export const getCarros = async () => {
  try {
    const response = await api.get('/carros');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    throw error;
  }
};

export const getCarroById = async (id) => {
  try {
    const response = await api.get(`/carros/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar carro:', error);
    throw error;
  }
};

export const createCarro = async (carro) => {
  try {
    const response = await api.post('/carros', carro);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    throw error;
  }
};

export const updateCarro = async (id, carro) => {
  try {
    const response = await api.put(`/carros/${id}`, carro);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar carro:', error);
    throw error;
  }
};

export const deleteCarro = async (id) => {
  try {
    console.log('ID recebido para exclusão:', id);
    const response = await api.delete(`/carros/${id}`);
    console.log('Resposta da exclusão:', response);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir carro:', error);
    throw error;
  }
};
