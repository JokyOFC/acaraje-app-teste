
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './src/routes';

import EmpProvider from './src/contexts/emp';
import { Provider } from 'react-native-paper';



export default function App() {
  return (
    <NavigationContainer>
      <EmpProvider>
        <Provider>
          <StatusBar  backgroundColor='#d2691e'/>
          <Routes />
        </Provider>
      </EmpProvider>
    </NavigationContainer>
  );
}