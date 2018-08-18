import React from 'react';
import {Button, Collapse, Form, Input, Table, Checkbox, Tooltip, message} from 'antd';
import {axios, apis, qs} from '../../api';
import moment from 'moment';

class GetHongbao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: localStorage.getItem('mobile') || '',
      // 正在领取中
      isGetting: false
    };
  }

  getHongbao = async params => {
    try {
      params.force = params.force ? 1 : 0;
      const data = await axios.post(apis.getHongbao, qs.stringify(params));
      if (data.code === 0) {
        this.props.callback(data.data);
      } else {
        message.error(data.message);
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({isGetting: false});
    this.props.form.resetFields();
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isGetting) return;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getHongbao(values);
        this.setState({mobile: values.phone, isGetting: true});
        localStorage.setItem('mobile', values.phone);
      }
    });
  };

  renderHistoryTable = e => {
    let renderGmtCreate = text => {
      let temp = text.split(' ');
      return (
        <div style={{textAlign: 'center', whiteSpace: 'nowrap'}}>
          {temp[0]}
          <br />
          {temp[1]}
        </div>
      );
    };

    let renderStatus = (text, r) => {
      let color = {0: '', 1: '#5bab60', 2: '#dd2323'}[
        !r.phone && /已领取到最佳前一个红包/.test(r.message) ? 1 : r.status
      ];
      let elemeType = '';
      if (r.application === 1 && r.type !== null) {
        elemeType = ['拼手气', '品质联盟'][r.type] || '';
      }
      elemeType = elemeType ? `-${elemeType}` : '';
      return (
        <div>
          <div style={{whiteSpace: 'nowrap'}}>
            <a href={r.url} target="_blank">
              [{r.application === 0 ? '美' : `饿${elemeType}`}]
            </a>{' '}
            <span>{r.phone || '未填手机号'}</span>
          </div>
          <div style={{color}}>{text}</div>
        </div>
      );
    };

    let renderPrice = (price, r) => {
      return <div style={{textAlign: 'center'}}>{price}</div>;
    };

    const columns = [
      {
        title: '领取时间',
        dataIndex: 'time',
        key: 'time',
        width: 60,
        render: renderGmtCreate
      },
      {
        title: '金额(元)',
        dataIndex: 'price',
        key: 'price',
        width: 60,
        render: renderPrice
      },
      {
        title: '状态',
        dataIndex: 'message',
        key: 'message',
        render: renderStatus
      }
    ];

    let {historyList} = this.props;

    historyList.forEach((o, i) => {
      o.time = moment(new Date(o.gmtModified || o.gmtCreate)).format('YYYY-MM-DD HH:mm:ss');
      if (o.status === 1) {
        o.message = `领取成功（${o.price >= 10 ? '卧槽！今天可以加餐了' : '请以实际到账金额为准'}）`;
        o.price = o.price <= 0 ? '未知' : o.price;
      } else if (o.status === 0) {
        o.message = `正在领取...`;
      } else if (o.status === 2) {
        o.price = 0;
      }
      o.key = i;
    });

    return <Table dataSource={this.props.historyList} columns={columns} pagination={false} />;
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    let {isGetting} = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div style={{color: '#dd2323', paddingBottom: '10px'}}>请先仔细阅读规则再来领取，以免浪费次数</div>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: false,
                message: '领红包的手机号码（留空可领到最大前一个）'
              }
            ],
            initialValue: this.state.mobile
          })(<Input placeholder="领红包的手机号码（留空可领到最大前一个）" maxLength={11} />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: '请输入美团、饿了么拼手气红包链接'
              }
            ]
          })(
            <Input.TextArea
              placeholder="请输入美团、饿了么拼手气红包链接（不知道怎么复制链接？请到页面底部查看方法）"
              autosize={{minRows: 8, maxRows: 8}}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Tooltip
            placement="top"
            title="如果你确定你填写的链接是新红包，而本站又提示该红包被领过时，你可以尝试勾选此项再点领取。"
          >
            {getFieldDecorator('force', {
              rules: [
                {
                  required: false
                }
              ]
            })(<Checkbox>强制领取（勾选将不检查该链接是否被领过）</Checkbox>)}
          </Tooltip>
        </Form.Item>
        <Form.Item>
          <Button type="primary" disabled={isGetting} htmlType="submit" className="login-form-button">
            领取手气最佳红包
          </Button>
          {isGetting && <span style={{color: '#dd2323', marginLeft: '12px'}}>请等待上一个红包领取完成</span>}
        </Form.Item>
        <p>领到大红包的小伙伴，扫一扫网页上的支付宝红包码，支持一下我们吧！</p>
        <p style={{color: '#dd2323'}}>最近 10 次领取记录：</p>
        {this.renderHistoryTable()}
        {this.renderDescription()}
      </Form>
    );
  }

  renderDescription = e => {
    return (
      <div>
        <Collapse defaultActiveKey={['1', '2', '3']} bordered={false}>
          <Collapse.Panel header="红包链接说明" key="1" style={{border: 0}}>
            1. 饿了么红包：https://h5.ele.me/hongbao/ 开头的链接。<br />
            链接不带 lucky_number 的不是拼手气，不能用。<br />
            2. 美团红包：https://activity.waimai.meituan.com/coupon/ 开头的链接。<br />
            3. 短链接：https://url.cn/ 开头的链接。
          </Collapse.Panel>
          <Collapse.Panel header="如何获取拼手气红包？" key="2">
            1. 好友下单后，分享到群里的红包。<br />
            2. 饿了么 APP 买过的订单点进去，分享红包。
          </Collapse.Panel>
          <Collapse.Panel header="如何复制红包链接？" key="3">
            1. 分享到 QQ，选择 “我的电脑”，PC 版 QQ 复制链接。<br />
            2. 分享到微信，PC 版微信右键用浏览器打开，复制链接。<br />
            3. 长按微信分享的卡片 - 点击更多 - 发送邮件 - 复制链接。（如果看不到链接，在微信的设置 - 通用 - 功能 -
            开启邮箱提醒）
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  };
}

export default Form.create()(GetHongbao);
