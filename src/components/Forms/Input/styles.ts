import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
  width: 100%;
  height: ${RFValue(56)}px;

  padding: 0 16px;
  margin-bottom: 8px;

  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
`;
