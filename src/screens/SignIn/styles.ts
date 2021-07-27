import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Header = styled.View`
  height: 70%;
  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;

  text-align: center;
  color: ${({ theme }) => theme.colors.shape};

  margin-top: ${RFValue(44)}px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;

  text-align: center;
  color: ${({ theme }) => theme.colors.shape};

  margin-top: ${RFValue(80)}px;
  margin-bottom: ${RFValue(64)}px;
`;

export const Footer = styled.View`
  height: 30%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 ${RFValue(32)}px;
`;
