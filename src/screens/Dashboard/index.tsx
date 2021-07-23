import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { formatCurrency } from '../../utils/formatCurrency';

import { HighlightCard } from '../../components/HighlightCard';
import { Transaction, TransactionCard } from '../../components/TransactionCard';
import {
  Header,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';
import { Container } from '../../global/styles/styles';

export interface DataListProps extends Transaction {
  id: number;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

type HighlightData = {
  income: HighlightProps;
  outcome: HighlightProps;
  total: HighlightProps;
};

function getLastTransactionDate(
  collection: DataListProps[],
  type: 'income' | 'outcome',
) {
  const lastTransactionsDate = Math.max(
    ...collection
      .filter(item => item.type === type)
      .map(item => new Date(item.date).getTime()),
  );

  return Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
  }).format(lastTransactionsDate);
}

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({
    income: { amount: formatCurrency(0), lastTransaction: '' },
    outcome: { amount: formatCurrency(0), lastTransaction: '' },
    total: { amount: formatCurrency(0), lastTransaction: '' },
  });

  const loadTransactions = useCallback(async () => {
    const dataKey = '@GoFinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const loadedTransactions: DataListProps[] = response
      ? JSON.parse(response)
      : [];

    let incomeValue = 0;
    let outcomeValue = 0;

    const formattedTransactions = loadedTransactions.map(item => {
      if (item.type === 'income') {
        incomeValue += Number(item.amount);
      } else {
        outcomeValue += Number(item.amount);
      }

      return {
        ...item,
        amount: formatCurrency(Number(item.amount)),
        date: Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date)),
      };
    });

    const lastIncomeDate = getLastTransactionDate(loadedTransactions, 'income');
    const lastOutcomeDate = getLastTransactionDate(
      loadedTransactions,
      'outcome',
    );

    setHighlightData({
      income: {
        amount: formatCurrency(incomeValue),
        lastTransaction: `Última entrada dia ${lastIncomeDate}`,
      },
      outcome: {
        amount: formatCurrency(outcomeValue),
        lastTransaction: `Última saída dia ${lastOutcomeDate}`,
      },
      total: {
        amount: formatCurrency(incomeValue - outcomeValue),
        lastTransaction: `01 à ${lastOutcomeDate}`,
      },
    });

    setTransactions(formattedTransactions);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions]),
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/caiulucas.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Caio Lucas</UserName>
            </User>
          </UserInfo>

          <LogoutButton>
            <Icon name="power" onPress={() => console.log('pressed')} />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction}
        />
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData.income.amount}
          lastTransaction={highlightData.income.lastTransaction}
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.outcome.amount}
          lastTransaction={highlightData.outcome.lastTransaction}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transactions}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />
      </Transactions>
    </Container>
  );
};
