import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TransactionProps {
  type: 'income' | 'outcome';
  isActive?: boolean;
}

const containerCSS = {
  income: css`
    background-color: ${({ theme }) => theme.colors.success_light};
    border-color: ${({ theme }) => theme.colors.success_light};
  `,
  outcome: css`
    background-color: ${({ theme }) => theme.colors.attention_light};
    border-color: ${({ theme }) => theme.colors.attention_light};
  `,
};

export const Container = styled.View<TransactionProps>`
  width: 48%;

  border: 1.5px solid ${({ theme }) => theme.colors.text_light};
  border-radius: 5px;

  ${({ isActive, type }) => isActive && containerCSS[type]}
`;

export const Button = styled(RectButton)`
  width: 100%;
  height: ${RFValue(56)}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)<TransactionProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};

  margin-right: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.title};
`;
