import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { Container } from '../../global/styles/styles';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';
import {
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export const SignIn: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton title="Entrar com Apple" svg={AppleSVG} />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size="large"
            style={{ marginTop: 16 }}
          />
        )}
      </Footer>
    </Container>
  );
};
