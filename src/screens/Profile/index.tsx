import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Caio Lucas"
      />

      <TextInput testID="input-surname" placeholder="Sobrenome" value="Silva" />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};
