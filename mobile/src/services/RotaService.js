import api from "@utils/api";

export const getRotas = async () => {
  try {
    const response = await api.get("/rotas");
    console.log("Resposta de /rotas:", response.data);  // Adicione este log
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar rotas:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getRotaById = async (id) => {
  try {
    const response = await api.get(`/rotas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRota = async (rota) => {
  try {
    const response = await api.post("/rotas", rota);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRota = async (id, rota) => {
  try {
    const response = await api.put(`/rotas/${id}`, rota);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRota = async (id) => {
  try {
    const response = await api.delete(`/rotas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
