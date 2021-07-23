import React, { useCallback } from 'react';

import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

type Category = {
  key: string;
  name: string;
};

interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  const handleCategorySelect = useCallback(
    (item: Category) => {
      setCategory(item);
    },
    [setCategory],
  );

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={({ key }) => key}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
};
