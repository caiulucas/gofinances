import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${RFValue(48)}px;

  padding: 0 ${RFValue(16)}px 0 ${RFValue(24)}px;
  margin-bottom: ${RFValue(8)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 4px;
  border-left-width: 4px;
  border-left-color: ${({ color }) => color};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Value = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;
