import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

interface TransactionProps {
  type: 'up' | 'down';
  isActive?: boolean;
}

const containerCSS = {
  up: css`
    background-color: ${({ theme }) => theme.colors.success_light};
  `,
  down: css`
    background-color: ${({ theme }) => theme.colors.attention_light};
  `,
};

export const Container = styled(TouchableOpacity)<TransactionProps>`
  width: 48%;
  height: ${RFValue(56)}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text_light};
  border-radius: 5px;

  ${({ isActive, type }) => isActive && containerCSS[type]}
`;

export const Icon = styled(Feather)<TransactionProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};

  margin-right: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.title};
`;
