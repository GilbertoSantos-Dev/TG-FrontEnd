import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/screens/auth/LoginScreen";
import AdminMenuScreen from "./src/screens/menus/AdminMenuScreen";
import UserMenuScreen from "./src/screens/menus/UserMenuScreen";

import AdminAtividadeScreen from "./src/screens/atividades/AdminAtividadeScreen";
import AtividadeScreen from "./src/screens/atividades/AtividadeScreen";

import AdminCarroScreen from "./src/screens/carros/AdminCarroScreen";
import CarroScreen from "./src/screens/carros/CarroScreen";

import AdminLocalScreen from "./src/screens/locais/AdminLocalScreen";
import LocalScreen from "./src/screens/locais/LocalScreen";

import AdminRotaScreen from "./src/screens/rotas/AdminRotaScreen";
import RotaScreen from "./src/screens/rotas/RotaScreen";

import AdminUsuarioScreen from "./src/screens/usuarios/AdminUsuarioScreen";
import UsuarioScreen from "./src/screens/usuarios/UsuarioScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminMenu"
          component={AdminMenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenuScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Atividade" component={AtividadeScreen} />
        <Stack.Screen name="AdminAtividade" component={AdminAtividadeScreen} />

        <Stack.Screen name="Carro" component={CarroScreen} />
        <Stack.Screen name="AdminCarro" component={AdminCarroScreen} />

        <Stack.Screen name="Local" component={LocalScreen} />
        <Stack.Screen name="AdminLocal" component={AdminLocalScreen} />

        <Stack.Screen name="Rota" component={RotaScreen} />
        <Stack.Screen name="AdminRota" component={AdminRotaScreen} />

        <Stack.Screen name="Usuario" component={UsuarioScreen} />
        <Stack.Screen name="AdminUsuario" component={AdminUsuarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
