import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
  type: 'up' | 'down' | 'total';
}

const iconCSS = {
  up: css`
    color: ${({ theme }) => theme.colors.success};
  `,
  down: css`
    color: ${({ theme }) => theme.colors.attention};
  `,
  total: css`
    color: ${({ theme }) => theme.colors.shape};
  `,
};

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 18px 24px;
  padding-bottom: ${RFValue(42)}px;

  margin-right: 16px;

  ${({ type }) =>
    type === 'total' &&
    css`
      background-color: ${({ theme }) => theme.colors.secondary};
      margin-right: 0;
    `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) => iconCSS[type]}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};

  margin-top: ${RFValue(38)}px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
`;
