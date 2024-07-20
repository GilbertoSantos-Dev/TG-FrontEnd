import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@utils/api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const { token, papel } = response.data;

    if (!token || !papel) {
      throw new Error('Token ou papel não definidos na resposta do login');
    }

    const expirationTime = new Date().getTime() + 4 * 60 * 60 * 1000;

    await AsyncStorage.setItem('sessionToken', token);
    await AsyncStorage.setItem('sessionExpiration', expirationTime.toString());
    await AsyncStorage.setItem('userRole', papel.toLowerCase());

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const token = await AsyncStorage.getItem('sessionToken');
    const expirationTime = await AsyncStorage.getItem('sessionExpiration');

    if (!token || !expirationTime) {
      return { isValid: false };
    }

    const currentTime = new Date().getTime();
    if (currentTime > parseInt(expirationTime, 10)) {
      await AsyncStorage.removeItem('sessionToken');
      await AsyncStorage.removeItem('sessionExpiration');
      await AsyncStorage.removeItem('userRole');
      return { isValid: false };
    }

    const userRole = await AsyncStorage.getItem('userRole');
    return { isValid: true, userRole };
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return { isValid: false };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('sessionToken');
    await AsyncStorage.removeItem('sessionExpiration');
    await AsyncStorage.removeItem('userRole');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error; // Adicione essa linha para garantir que o erro seja lançado
  }
};
