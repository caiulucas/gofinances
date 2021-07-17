import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { Transaction, TransactionCard } from '../../components/TransactionCard';
import {
  Container,
  Header,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';

export interface DataListProps extends Transaction {
  id: number;
}

export const Dashboard: React.FC = () => {
  const data: DataListProps[] = [
    {
      id: 1,
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      date: '13/04/2021',
      category: { name: 'Vendas', icon: 'dollar-sign' },
    },
    {
      id: 2,
      type: 'negative',
      title: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      date: '13/04/2021',
      category: { name: 'Alimentação', icon: 'coffee' },
    },
    {
      id: 3,
      type: 'negative',
      title: 'Aluguél do apartamento',
      amount: 'R$ 1.200,00',
      date: '13/04/2021',
      category: { name: 'Casa', icon: 'shopping-bag' },
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/caiulucas.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 06 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />
      </Transactions>
    </Container>
  );
};
