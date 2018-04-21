import React from 'react';

export default class JoinGroup extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="//shang.qq.com/wpa/qunwpa?idkey=716520d506845906eb56c91c53e3213ceaddbd99f704c4afa6c1761b388311db"
        >
          点击加入 QQ 3 群：617166836
        </a>
        <div style={{margin: '12px 0 6px 0'}}>扫描下面二维码，邀请你进入微信群</div>
        <img
          style={{
            width: '250px',
            padding: '10px'
          }}
          src={require('../../static/wechat.png')}
          alt=""
        />
      </div>
    );
  }
}
