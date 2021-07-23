import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Category, Icon } from './styles';

interface CategorySelectButtonProps extends RectButtonProps {
  title: string;
}

export const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
