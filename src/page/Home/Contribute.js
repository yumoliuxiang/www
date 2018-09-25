import React from 'react';
import {Button, Form, Input, Radio, Table, Popconfirm, message, Icon} from 'antd';
import {axios, apis, qs} from '../../api';

class Contribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({isLoading: true});
        try {
          const params = {
            value: values.value,
            application: this.props.application
          };
          const data = await axios.post(apis.cookie, qs.stringify(params));
          if (data.code === 0) {
            message.success('贡献成功！');
            this.props.contributeCallback();
          } else {
            message.error(data.message);
          }
        } catch (e) {
          console.error(e);
        }
        this.setState({isLoading: false});
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    let {isLoading} = this.state;
    let {application, onApplicationChange} = this.props;

    return (
      <div>
        <div style={{marginBottom: '15px'}}>
          贡献每一个微信需要完全退出 PC 微信进程再登录小号<br />贡献每一个 QQ 需要清除浏览器 cookie
          或打开隐身（无痕）模式再登录小号
        </div>
        <div style={{color: '#dd2323', marginBottom: '15px'}}>
          仅有老用户持有美团绝版 cookie，新号无法贡献美团了<br />饿了么 cookie 需要验证手机号之后再贡献，否则无效
        </div>
        <Radio.Group onChange={onApplicationChange} value={application} style={{marginBottom: '12px'}}>
          <Radio value={0} disabled>
            美团
          </Radio>
          <Radio value={1}>饿了么</Radio>
        </Radio.Group>

        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('value', {
              rules: [{required: true, message: '请输入要贡献的 cookie'}]
            })(
              <Input.TextArea
                placeholder={application ? '请输入微信或 QQ 小号的 cookie' : '请输入微信小号的 cookie'}
                autosize={{minRows: 8, maxRows: 8}}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={isLoading} htmlType="submit" className="login-form-button">
              贡献饿了么小号 cookie
            </Button>
          </Form.Item>
          <ul>
            <li>
              <a
                href="https://note.youdao.com/noteshare?id=2761e33a66c4b51a8226dd22a89e87c1"
                target="_blank"
                rel="noopener noreferrer"
              >
                [贡献 QQ] 如何贡献饿了么 QQ cookie
              </a>
            </li>
            <li>
              <a
                href="http://note.youdao.com/noteshare?id=0290812f8131bed392ed5f037f0c3b5c"
                target="_blank"
                rel="noopener noreferrer"
                style={{textDecoration: 'line-through'}}
              >
                [贡献微信] 如何贡献美团微信 cookie（饿了么也可以）
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mtdhb/cookie"
                target="_blank"
                rel="noopener noreferrer"
                style={{textDecoration: 'line-through'}}
              >
                [一键提取] 美团、饿了么 cookie 一键提取工具
              </a>
            </li>
          </ul>
        </Form>

        {application === 1 && (
          <Button.Group style={{marginBottom: 15}}>
            <Button onClick={() => this.downloadCookies()}>
              <Icon type="download" theme="outlined" />下载所有失效 cookie
            </Button>
            <Popconfirm
              title="删除后将无法恢复，确定要删除吗？"
              onConfirm={() => this.deleteCookies()}
              okText="确定"
              cancelText="取消"
            >
              <Button type="danger">
                <Icon type="delete" theme="outlined" />删除所有失效 cookie
              </Button>
            </Popconfirm>
          </Button.Group>
        )}

        {this.renderTable()}
      </div>
    );
  }

  downloadCookies() {
    const content = this.props.cookies
      .filter(o => o.application === this.props.application && !o.valid)
      .map(o =>
        String(o.value || '')
          .trim()
          .replace(/\n/g, '')
      )
      .filter(o => o);

    // 创建隐藏的可下载链接
    const link = document.createElement('a');
    link.download = 'cookies.json';
    link.style.display = 'none';
    // 字符内容转变成blob地址
    const blob = new Blob([JSON.stringify(content)]);
    link.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(link);
    link.click();
    // 然后移除
    document.body.removeChild(link);
  }

  deleteCookies() {
    axios.delete(apis.deleteCookie).then(data => {
      if (data.code === 0) {
        // message.success('删除成功');
        window.location.reload();
      } else {
        message.error(data.message);
      }
    });
  }

  renderTable() {
    let cookies = this.props.cookies
      .filter(o => o.application === this.props.application)
      .sort((a, b) => b.gmtCreate - a.gmtCreate);

    let onConfirm = record => this.deleteCookie(record.id);

    let renderHeadImg = (url, record) => (url ? <img src={url} width="50" height="50" alt="头像" /> : '--');

    let renderTime = (time, record) => (
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        <p>{time}</p>
        <p>
          {!record.valid && <span style={{color: '#dd2323'}}>[已失效]&nbsp;</span>}
          {record.nickname}
        </p>
      </div>
    );

    let renderDeleteBtn = (text, record) => (
      <Popconfirm
        title="删除将扣除 5 次消耗，确定要删除吗？"
        onConfirm={e => onConfirm(record)}
        onCancel={e => e}
        okText="确定"
        cancelText="取消"
      >
        <Button size="small">删除</Button>
      </Popconfirm>
    );

    const columns = [
      {
        title: '头像',
        dataIndex: 'headImgUrl',
        key: 'headImgUrl',
        width: 60,
        render: renderHeadImg
      },
      {
        title: '贡献时间、昵称',
        dataIndex: 'time',
        key: 'time',
        render: renderTime
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: 60,
        render: renderDeleteBtn
      }
    ];

    return (
      <Table
        dataSource={cookies}
        columns={columns}
        pagination={{
          pageSize: 5,
          size: 'small',
          total: cookies.length
        }}
      />
    );
  }

  deleteCookie = id => {
    axios.delete(`${apis.deleteCookie}/${id}`).then(data => {
      if (data.code === 0) {
        this.props.deleteCookieCallback(id);
        message.success('删除成功');
      } else {
        message.error(data.message);
      }
    });
  };
}

export default Form.create()(Contribute);
