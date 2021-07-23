import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Button, Icon, Title } from './styled';

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: 'income' | 'outcome';
  isActive?: boolean;
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

export const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  title,
  type,
  isActive = false,
  ...rest
}) => {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
