// src/services/SyncService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@utils/api";

const saveDataToAsyncStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao salvar ${key} no AsyncStorage:`, error);
  }
};

export const syncData = async () => {
  try {
    const [carrosResponse, rotasResponse, locaisResponse, usuariosResponse] =
      await Promise.all([
        api.get("/carros"),
        api.get("/rotas"),
        api.get("/locais"),
        api.get("/usuarios"),
      ]);

    const carros = carrosResponse.data.map((carro) => ({
      id: carro.id,
      modelo: carro.modelo,
      ano: carro.ano,
      placa: carro.placa,
      km: carro.km,
    }));

    const rotas = rotasResponse.data.map((rota) => ({
      id: rota.id,
      descricao: rota.descricao,
    }));

    const locais = locaisResponse.data.map((local) => ({
      id: local.id,
      descricao: local.descricao,
      endereco: local.endereco,
      rota_id: local.rota_id,
    }));

    const usuarios = usuariosResponse.data.map((usuario) => ({
      id: usuario.id,
      nome: usuario.nome,
      user_name: usuario.user_name,
      papel: usuario.papel,
    }));

    await saveDataToAsyncStorage("carros", carros);
    await saveDataToAsyncStorage("rotas", rotas);
    await saveDataToAsyncStorage("locais", locais);
    await saveDataToAsyncStorage("usuarios", usuarios);
  } catch (error) {
    console.error("Erro ao sincronizar dados:", error);
  }
};
