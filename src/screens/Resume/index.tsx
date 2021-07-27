/* eslint-disable import/no-duplicates */
import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useTheme } from 'styled-components';

import { VictoryPie } from 'victory-native';
import { subMonths } from 'date-fns/esm';
import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';
import { Container } from '../../global/styles/styles';
import { categories as categoryList } from '../../utils/categories';

import {
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  ChartContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';

type Transaction = {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  category: string;
  date: string;
};

type Category = {
  key: string;
  name: string;
  color: string;
  total: number;
  floorTotal: number;
  percentage: string;
};

export const Resume: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState<Category[]>([]);

  const { user } = useAuth();
  const theme = useTheme();

  function handleDataChange(action: 'next' | 'prev') {
    const newDate =
      action === 'next'
        ? addMonths(selectedDate, 1)
        : subMonths(selectedDate, 1);

    setSelectedDate(newDate);
  }

  const loadData = useCallback(async () => {
    const dataKey = `@GoFinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);

    const loadedData: Transaction[] = response ? JSON.parse(response) : [];

    const outcomes = loadedData.filter(transaction => {
      const transactionDate = new Date(transaction.date);

      return (
        transaction.type === 'outcome' &&
        transactionDate.getMonth() === selectedDate.getMonth() &&
        transactionDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    const outcomesTotal = outcomes.reduce(
      (acc, transaction) => acc + Number(transaction.amount),
      0,
    );

    const filteredCategories: Category[] = [];

    categoryList.forEach(category => {
      const categorySum = outcomes.reduce(
        (acc, transaction) =>
          transaction.category === category.key
            ? acc + Number(transaction.amount)
            : acc,
        0,
      );

      const percentage = ((categorySum / outcomesTotal) * 100).toFixed(0);

      if (categorySum) {
        filteredCategories.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          floorTotal: Math.floor(categorySum),
          percentage: `${percentage}%`,
        });
      }
    });

    setCategories(filteredCategories);
  }, [selectedDate, user.id]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  return (
    <Container>
      <Header title="Resumo por categoria" />

      <Content>
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDataChange('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleDataChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={categories}
            x="percentage"
            y="total"
            colorScale={categories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={80}
          />
        </ChartContainer>
        {categories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.floorTotal}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
};
