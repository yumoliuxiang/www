import React from 'react';
import ReactDOM from 'react-dom';
import {Button, message, Icon} from 'antd';
import Clipboard from 'clipboard';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  background: #fff;
  display: inline-block;
  z-index: 100;
`;

const Image = styled.div`
  position: absolute;
  left: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  display: none;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);

  div {
    text-align: center;
    padding: 10px 10px 0;
  }
`;

const RmbButton = styled(Button)`
  &:hover ${Image} {
    display: block;
  }
`;

export default class Alipay extends React.Component {
  componentDidMount() {
    const clipboard = new Clipboard(ReactDOM.findDOMNode(this.refs.alibutton), {text: () => 'aRhixt096d'});

    clipboard.on('success', e => {
      e.clearSelection();
      message.info('打开支付宝即可领取红包（每天可以领一次）红包码：aRhixt096d');
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
        <Button.Group>
          <RmbButton type="primary" onClick={() => message.info('如果本站对您有帮助，欢迎打赏支持我们')}>
            <Icon type="pay-circle" />打赏
            <Image>
              <table>
                <tr style={{color: '#222'}}>
                  <th>支付宝</th>
                  <th>微信</th>
                </tr>
                <tr>
                  <td>
                    <img src={require('../static/zfb.png')} width="190" alt="打赏 支付宝支付" />
                  </td>
                  <td>
                    <img src={require('../static/wx.png')} width="190" alt="打赏 微信支付" />
                  </td>
                </tr>
              </table>
            </Image>
          </RmbButton>
          <RmbButton type="primary" ref="alibutton">
            <Icon type="alipay-circle" />红包
            <Image>
              <img src={require('../static/hongbao1.jpg')} width="290" alt="支付宝 每天领红包" />
            </Image>
          </RmbButton>
        </Button.Group>
      </Container>
    );
  }
}
