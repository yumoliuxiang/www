import React from 'react';

export default class JoinGroup extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div>
          <p>QQ1群：246080018（2000人空）&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>QQ2群：583997433（500人满）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>QQ3群：617166836（2000人满）&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>QQ群：452599197（软件开发交流）</p>
        </div>
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
