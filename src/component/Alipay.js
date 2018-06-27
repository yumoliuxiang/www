import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd';
import Clipboard from 'clipboard';
import styled from 'styled-components';

const Image = styled.div`
  position: absolute;
  margin-top: 5px;
  z-index: 50;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  display: none;

  div {
    text-align: center;
    padding: 10px 10px 0;
  }
`;

const Container = styled.div`
  position: relative;
  background: #fff;
  display: inline-block;

  &:hover ${Image} {
    display: block;
  }
`;

export default class Alipay extends React.Component {
  componentDidMount() {
    const clipboard = new Clipboard(ReactDOM.findDOMNode(this.refs.button), {text: () => 'aRhixt096d'});

    clipboard.on('success', e => {
      e.clearSelection();
      alert('打开支付宝即可领取红包（每天可以领一次）aRhixt096d');
    });

    clipboard.on('error', e => {
      if (window.confirm('您的设备不支持复制红包码，是否跳转到支付宝领取？')) {
        window.location.href = 'https://qr.alipay.com/c1x06611gnoczzqiklpka04';
      }
    });
  }

  render() {
    return (
      <Container>
        <Button type="primary" ref="button">
          支付宝天天领红包
        </Button>
        <Image>
          <img src={require('../static/alipayhongbao.jpg')} width="290" alt="支付宝天天领红包" />
          <div>
            支付宝天天领红包<br />aRhixt096d
          </div>
        </Image>
      </Container>
    );
  }
}
