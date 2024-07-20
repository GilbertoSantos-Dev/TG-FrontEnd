import api from "@utils/api";

export const getUsuarios = async () => {
  try {
    const response = await api.get("/usuarios");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};

export const createUsuario = async (usuario) => {
  try {
    const response = await api.post("/usuarios", usuario);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const updateUsuario = async (id, usuario) => {
  try {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    console.log(`Deleting user with ID: ${id}`);
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};

export const changePassword = async (username, currentPassword, newPassword) => {
  try {
    const response = await api.put(`/usuarios/${username}/change-password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao trocar a senha:", error.response.data);
    throw error;
  }
};
