import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import theme from './src/global/styles/theme';
import { SignIn } from './src/screens/SignIn';
import { AuthProvider, useAuth } from './src/hooks/auth';

const App: React.FC = () => {
  const { userStorageLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
