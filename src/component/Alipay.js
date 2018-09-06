import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  background: #fff;
  display: inline-block;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  display: block;

  div {
    text-align: center;
    padding: 10px 10px 0;
  }
`;

export default class Alipay extends React.Component {
  render() {
    return (
      <Container>
        <Image style={{border: 0}}>
          <a href="https://qr.alipay.com/c1x06611gnoczzqiklpka04" target="_blank" rel="noopener noreferrer">
            <img src={require('../static/hongbao1.jpg')} width="250" alt="支付宝 每天领红包" />
          </a>
        </Image>
      </Container>
    );
  }
}
