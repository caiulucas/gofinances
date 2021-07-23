import React from 'react';
import { categories } from '../../utils/categories';

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
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  date: string;
  category: string;
};

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => {
  const category = categories.find(item => item.key === transaction.category);

  return (
    <Container>
      <Title>{transaction.name}</Title>

      <Amount type={transaction.type}>
        {transaction.type === 'outcome' && '- '}
        {transaction.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
};
