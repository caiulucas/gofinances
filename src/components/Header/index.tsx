import React from 'react';

import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <Container>
    <Title>{title}</Title>
  </Container>
);
