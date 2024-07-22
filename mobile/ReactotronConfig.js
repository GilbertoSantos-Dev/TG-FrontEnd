// ReactotronConfig.js
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron
  .setAsyncStorageHandler(AsyncStorage) // Adicione esta linha para usar AsyncStorage com Reactotron
  .configure()
  .useReactNative()
  .connect(); // Conectar Reactotron

// Adicione um console.tron para facilitar o uso do Reactotron
console.tron = Reactotron;
