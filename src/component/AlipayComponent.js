import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd';
import ClipboardJS from 'clipboard';
import styled from 'styled-components';

const Image = styled.div`
  position: absolute;
  margin-top: 5px;
  z-index: 50;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  width: 262px;
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

export default class AlipayComponent extends React.Component {
  componentDidMount() {
    this.aliHongbao();
  }

  render() {
    return (
      <Container>
        <Button type="primary" ref="button">
          支付宝天天领红包
        </Button>
        <Image>
          <img src={require('../static/alipayhongbao.png')} width="240" alt="支付宝天天领红包" />
          <div>
            支付宝天天领红包<br />c7XYed92oO
          </div>
        </Image>
      </Container>
    );
  }

  aliHongbao() {
    const clipboard = new ClipboardJS(ReactDOM.findDOMNode(this.refs.button), {
      text: () => 'c7XYed92oO'
    });

    clipboard.on('success', e => {
      e.clearSelection();
      alert('打开支付宝即可领取红包（每天仅一次）');
    });

    clipboard.on('error', e => {
      if (window.confirm('您的设备不支持复制红包码，是否跳转到支付宝领取？')) {
        window.location.href =
          'https://render.alipay.com/p/f/fd-j6lzqrgm/guiderofmklvtvw.html?shareId=2088312106287923&campStr=p1j%2BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL&sign=CKWXOrsHM0zT9nWHWNo76TOAPo5xqhAzOvXHgBrflIc%3D&scene=offlinePaymentNewSns';
      }
    });
  }
}
