import React from 'react';
import {Form, Input, Button, Breadcrumb} from 'antd';
import {browserHistory} from 'react-router';
import {axios, apis, qs} from '../api';
import Ad from '../component/Ad';
import Notice from '../component/Notice';
import Domain from '../component/Domain';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      noticeList: []
    };
    document.body.classList.remove('is-home');
  }

  login = data => {
    axios
      .post(apis.login, qs.stringify(data))
      .then(data => {
        if (data.code === 0) {
          localStorage.setItem('token', data.data.token);
          browserHistory.push('/');
        } else {
          alert(data.message);
        }
      })
      .catch(err => alert(err));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.login(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          <h2>
            登录<Domain />
          </h2>
          <span style={{color: '#aaa'}}>每天大红包 · 一键领取手气最佳红包</span>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('account', {
            rules: [{required: true, message: '请输入帐号'}]
          })(<Input placeholder="请输入帐号" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入密码'}]
          })(<Input type="password" placeholder="请输入密码" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a
            onClick={e => {
              e.preventDefault();
              browserHistory.push('/apply');
            }}
            style={{marginLeft: '12px'}}
          >
            还没有帐号，马上注册
          </a>
        </Form.Item>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a
              onClick={e => {
                e.preventDefault();
                browserHistory.push('/applyResetPassword');
              }}
              style={{
                display: 'inline-block',
                margin: '12px 0'
              }}
            >
              重置密码
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              href="https://github.com/mtdhb/mtdhb/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                margin: '12px 0'
              }}
            >
              反馈问题
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Ad />
        <Notice />
      </Form>
    );
  }
}

export default Form.create()(Login);
