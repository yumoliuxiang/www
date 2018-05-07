import React from 'react';
import {Button as AntdButton} from 'antd';
import ClipboardJS from 'clipboard';

class Image extends React.Component {
  render() {
    return (
      <div className="alipay-pc">
        <img src={require('../static/alipayhongbao.png')} width="240" alt="支付宝天天领红包" />
        <div>
          支付宝天天领红包<br />c7XYed92oO
        </div>
      </div>
    );
  }
}

class Button extends React.Component {
  componentDidMount() {
    this.aliHongbao();
  }

  render() {
    return (
      <div className="alipay">
        <AntdButton className="alipay-m" type="primary">
          支付宝天天领红包
        </AntdButton>
        <Image />
      </div>
    );
  }

  aliHongbao() {
    const clipboard = new ClipboardJS('.alipay-m', {
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

export default {
  Button,
  Image
};
