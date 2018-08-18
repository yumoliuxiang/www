import React from 'react';
import ReactDOM from 'react-dom';
import {message} from 'antd';
import QRCode from 'qrcode.react';
import Clipboard from 'clipboard';

export default class MiniProgram extends React.Component {
  componentDidMount() {
    const clipboard = new Clipboard(ReactDOM.findDOMNode(this.refs.copyToken), {
      text: () => localStorage.getItem('token')
    });

    clipboard.on('success', e => {
      e.clearSelection();
      message.success('token 复制成功，请打开 “一键最佳” 小程序');
    });

    clipboard.on('error', e => {
      message.error('您的设备不支持复制，请使用扫码方式');
    });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <p>使用微信扫描小程序码，或搜索小程序“一键最佳”</p>
        <img width={200} src={require('../../static/miniprogram.jpg')} alt="小程序码" />
        <p />
        <p>
          进入之后，点击小程序内任意位置，会调起扫码功能<br />扫描以下二维码将自动登录您的账号
        </p>
        <p style={{color: '#dd2323'}}>请注意不要泄露你的二维码和 token</p>
        <QRCode size={200} value={localStorage.getItem('token')} />
        <p />
        <p ref="copyToken" style={{color: '#1890ff', cursor: 'pointer'}}>
          不方便扫码可以点击这里复制 token 再进入小程序
        </p>
        <p>只需要操作一次，下次可直接从微信中进入</p>
      </div>
    );
  }
}
