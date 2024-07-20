import api from "@utils/api";

export const getAtividades = async () => {
  try {
    const response = await api.get("/atividades");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    throw error;
  }
};

export const getAtividadeById = async (id) => {
  try {
    const response = await api.get(`/atividades/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar atividade por ID:", error);
    throw error;
  }
};

export const createAtividade = async (atividade) => {
  try {
    const response = await api.post("/atividades", atividade);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar atividade:", error);
    throw error;
  }
};

export const updateAtividade = async (id, atividade) => {
  try {
    const response = await api.put(`/atividades/${id}`, atividade);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar atividade:", error);
    throw error;
  }
};

export const deleteAtividade = async (id) => {
  try {
    await api.delete(`/atividades/${id}`);
  } catch (error) {
    console.error("Erro ao excluir atividade:", error);
    throw error;
  }
};
