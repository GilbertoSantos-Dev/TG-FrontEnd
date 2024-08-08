import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import api from '@utils/api';

export const syncPendingActivities = async () => {
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      const pendingActivities = await AsyncStorage.getItem('pendingActivities');
      const pendingActivitiesArray = pendingActivities ? JSON.parse(pendingActivities) : [];

      for (const activity of pendingActivitiesArray) {
        try {
          await api.post('/atividades', activity);
          // Remova a atividade do array após o sucesso
          pendingActivitiesArray.splice(pendingActivitiesArray.indexOf(activity), 1);
        } catch (error) {
          console.error('Erro ao sincronizar atividade pendente:', error);
        }
      }

      // Atualize o AsyncStorage após a tentativa de sincronização
      if (pendingActivitiesArray.length > 0) {
        await AsyncStorage.setItem('pendingActivities', JSON.stringify(pendingActivitiesArray));
      } else {
        await AsyncStorage.removeItem('pendingActivities');
      }
    }
  } catch (error) {
    console.error('Erro ao sincronizar atividades pendentes:', error);
  }
};

// Monitore a conectividade e sincronize quando estiver online
NetInfo.addEventListener(state => {
  if (state.isConnected) {
    syncPendingActivities();
  }
});
