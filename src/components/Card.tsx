import React from 'react';
import styled from 'styled-components';
import { Header1 } from './styled';

const CardContainer = styled.div`
  background: white;
  border-radius: 1rem;
`;

interface ICardProps {
  title: string;
}

export const Card = (props: React.PropsWithChildren<ICardProps>) => {
  return (
    <CardContainer>
      <Header1>{ props.title }</Header1>
      <div>
        { props.children }
      </div>
    </CardContainer>
  );
};