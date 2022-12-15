
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './src/routes';

import EmpProvider from './src/contexts/emp';

export default function App() {
  return (
    <NavigationContainer>
      <EmpProvider>
        <StatusBar  backgroundColor='#d2691e'/>
        <Routes />
      </EmpProvider>
    </NavigationContainer>
  );
}