import React, { useState, useCallback } from 'react';

import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/core';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';

import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { Form, Fields, TransactionTypes } from './styles';
import { Header } from '../../components/Header';
import { Container } from '../../global/styles/styles';
import { useAuth } from '../../hooks/auth';

type FormData = {
  name: string;
  amount: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor é obrigatório'),
});

export const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const navigation = useNavigation();
  const { user } = useAuth();

  const dataKey = `@GoFinances:transactions_user:${user.id}`;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTransactionTypeSelect = useCallback(
    (type: 'income' | 'outcome') => {
      setTransactionType(type);
    },
    [],
  );

  const handleOpenSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const handleCloseSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleRegister = useCallback(
    async (form: FormData) => {
      if (!transactionType) return Alert.alert('Selecione o tipo da transação');

      if (category.key === 'category')
        return Alert.alert('Selecione a categoria');

      const newTransaction = {
        id: String(uuid.v4()),
        name: form.name,
        amount: form.amount,
        category: category.key,
        type: transactionType,
        date: new Date(),
      };

      try {
        const asyncData = await AsyncStorage.getItem(dataKey);
        const currentData = asyncData ? JSON.parse(asyncData) : [];

        const dataFormatted = [...currentData, newTransaction];
        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

        reset();
        setTransactionType('');
        setCategory({
          key: 'category',
          name: 'Categoria',
        });

        return navigation.navigate('Listagem');
      } catch (err) {
        console.log(err);
        return Alert.alert('Não foi possível salvar');
      }
    },
    [category.key, dataKey, navigation, reset, transactionType],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="income"
                title="Income"
                onPress={() => handleTransactionTypeSelect('income')}
                isActive={transactionType === 'income'}
              />
              <TransactionTypeButton
                type="outcome"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('outcome')}
                isActive={transactionType === 'outcome'}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
