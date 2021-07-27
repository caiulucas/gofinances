import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Container, ImageContainer, Title } from './styles';

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  title,
  svg: Svg,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Title>{title}</Title>
    </Container>
  );
};
