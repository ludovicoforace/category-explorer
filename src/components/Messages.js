import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as lib from '../styles/library';

const Wrapper = styled.div`
height: 100vh;
padding: 100px;
`;

const Messages = (props) => {
  const renderMessages = () => {
    switch (props.type) {
      case 'error':
        return <h2>There was an error loading the widjet!</h2>;
      case 'loading':
        return <lib.Loading />;
      default:
        throw new Error('Unknown Type');
    }
  };
  return (
    <Wrapper>
      <lib.Container>
        {renderMessages()}
      </lib.Container>
    </Wrapper>
  );
};

Messages.propTypes = {
  type: PropTypes.string.isRequired
};

export default Messages;
