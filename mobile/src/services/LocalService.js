import api from "@utils/api";

export const getLocais = async () => {
  try {
    const response = await api.get("/locais");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar locais:", error);
    throw error;
  }
};

export const createLocal = async (data) => {
  try {
    const response = await api.post("/locais", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar local:", error);
    throw error;
  }
};

export const getLocalById = async (id) => {
  try {
    const response = await api.get(`/locais/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar local:", error);
    throw error;
  }
};

export const updateLocal = async (id, data) => {
  try {
    const response = await api.put(`/locais/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar local:", error);
    throw error;
  }
};

export const deleteLocal = async (id) => {
  try {
    console.log('ID recebido para exclusão:', id);
    const response = await api.delete(`/locais/${id}`);
    console.log('Resposta da exclusão:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.error.includes('IntegrityError')) {
      console.error('Erro de integridade referencial:', error.response.data.error);
      throw new Error('Não é possível excluir um local que foi utilizado em alguma atividade.');
    } else {
      console.error('Erro ao excluir local (outro):', error.message);
      throw error;
    }
  }
};
