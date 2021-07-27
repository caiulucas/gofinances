import React from 'react';

import { Container, Title, Value, Amount } from './styles';

interface HistoryCardProps {
  title: string;
  amount: number;
  color: string;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  title,
  amount,
  color,
}) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>
        R$
        <Value>{amount}</Value>
      </Amount>
    </Container>
  );
};
