import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

type Category = {
  name: string;
  icon: string;
};

export type Transaction = {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  date: string;
  category: Category;
};

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => {
  return (
    <Container>
      <Title>{transaction.title}</Title>

      <Amount type={transaction.type}>
        {transaction.type === 'negative' && '-'} {transaction.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={transaction.category.icon} />
          <CategoryName>{transaction.category.name}</CategoryName>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
};
