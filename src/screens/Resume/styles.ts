import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${RFValue(40)}px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;
