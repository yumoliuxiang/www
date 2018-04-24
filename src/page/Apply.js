import React from 'react';
import {browserHistory} from 'react-router';
import {Button, Form, Input} from 'antd';
import {axios, apis, qs} from '../api';

class Apply extends React.Component {
  constructor() {
    super();
    this.state = {
      mail: '',
      mailError: false,
      mailErrorHelp: '',
      captcha: '',
      captchaError: false,
      captchaErrorHelp: '',
      applyFinished: false,
      isLoading: false
    };
  }

  getRegisterCode = data => {
    this.setState({isLoading: true});

    axios
      .post(apis.getRegisterCode, qs.stringify(data))
      .then(data => {
        if (data.code === 0) {
          this.setState({applyFinished: true});
        } else {
          if (data.code === 10004) {
            this.setState({mail: ''});
          }
          this.setState({applyFinished: false});
          alert(data.message);
        }
        this.changeCaptcha();
        this.setState({isLoading: false, captcha: ''});
      })
      .catch(err => {
        alert(err);
        this.changeCaptcha();
        this.setState({isLoading: false});
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    let {mail, captcha} = this.state;

    if (this.validatmail(mail) && this.validateCaptcha(captcha)) {
      this.getRegisterCode({mail, captcha});
    }
  };

  validatmail = mail => {
    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(mail)) {
      this.setState({mailError: false, mailErrorHelp: '', mail});
      return true;
    } else {
      let mailErrorHelp = mail ? '邮箱格式不正确' : '请输入邮箱';
      this.setState({mailError: true, mailErrorHelp});
      return false;
    }
  };

  validateCaptcha = captcha => {
    if (captcha.length === 4) {
      this.setState({
        captchaError: false,
        captchaErrorHelp: '',
        captcha
      });
      return true;
    } else {
      this.setState({
        captchaError: true,
        captchaErrorHelp: '验证码只能是4位字符'
      });
      return false;
    }
  };

  changeCaptcha = (dom = document.getElementById('captchaCode')) =>
    (dom.src = apis.getCaptcha + '?' + new Date().getTime());

  renderForm() {
    let {mail, mailError, mailErrorHelp, captchaError, captchaErrorHelp, isLoading, captcha} = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          <h2>申请帐号</h2>
          <span className="apply-title">登录并贡献小号即可一键手气最佳红包</span>
        </Form.Item>
        <Form.Item key={0} validateStatus={mailError ? 'error' : ''} help={mailErrorHelp}>
          <Input
            name="mail"
            value={mail}
            placeholder="请输入邮箱"
            onChange={e => this.setState({mail: e.target.value})}
          />
        </Form.Item>
        <Form.Item key={1} validateStatus={captchaError ? 'error' : ''} help={captchaErrorHelp}>
          <Input
            name="captcha"
            value={captcha}
            placeholder="请输入验证码"
            onChange={e => this.setState({captcha: e.target.value})}
            style={{width: '185px'}}
          />
          <img
            id="captchaCode"
            src={apis.getCaptcha}
            onClick={e => this.changeCaptcha(e.target)}
            style={{marginTop: '-1px', cursor: 'pointer'}}
            alt="验证码"
          />
        </Form.Item>
        <Form.Item key={2}>
          <Button type="primary" loading={isLoading} htmlType="submit" className="login-form-button">
            申请
          </Button>
          <a
            onClick={e => {
              e.preventDefault();
              browserHistory.push('/login');
            }}
            style={{marginLeft: '12px'}}
          >
            已有帐号？立即登录
          </a>
        </Form.Item>
        <a
          href="https://github.com/game-helper/hongbao2/issues"
          target="_blank"
          style={{display: 'inline-block', margin: '12px 0'}}
          rel="noopener noreferrer"
        >
          有问题要反馈？点这里
        </a>
        {this.state.applyFinished ? (
          <div style={{fontSize: '16px', color: '#dd2323'}}>
            邮件已发送，请点击链接完成注册！若长时间未收到邮件，请重新申请。
          </div>
        ) : (
          ''
        )}
      </Form>
    );
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default Form.create()(Apply);
