import React from 'react';
import {Button, Form, Input} from 'antd';
import {axios, apis, qs} from '../api';

const FormItem = Form.Item;

class ApplyResetPassword extends React.Component {
	constructor() {
		super();
		this.state = {
			mail: '',
			mailError: false,
			mailErrorHelp: '',
			captcha: '',
			captchaError: false,
			captchaErrorHelp: '',
			finished: false,
			isLoading: false
		};
	}

	resetPasswordMail = data => {
		this.setState({isLoading: true});

		axios
			.post(apis.resetPasswordMail, qs.stringify(data))
			.then(data => {
				if (data.code === 0) {
					this.setState({finished: true});
				} else {
					if (data.code === 10004) {
						this.setState({mail: ''});
					}
					this.setState({finished: false});
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
			this.resetPasswordMail({mail, captcha});
		}
	};

	validatmail = mail => {
		if (
			/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
				mail
			)
		) {
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
		(dom.src = apis.resetPasswordCaptcha + '?' + new Date().getTime());

	renderForm() {
		let {
			mail,
			mailError,
			mailErrorHelp,
			captchaError,
			captchaErrorHelp,
			isLoading,
			captcha
		} = this.state;

		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem>
					<h2>申请重置密码</h2>
				</FormItem>
				<FormItem
					key={0}
					validateStatus={mailError ? 'error' : ''}
					help={mailErrorHelp}
				>
					<Input
						name="mail"
						value={mail}
						placeholder="请输入邮箱"
						onChange={e => this.setState({mail: e.target.value})}
					/>
				</FormItem>
				<FormItem
					key={1}
					validateStatus={captchaError ? 'error' : ''}
					help={captchaErrorHelp}
				>
					<Input
						name="captcha"
						value={captcha}
						placeholder="请输入验证码"
						onChange={e => this.setState({captcha: e.target.value})}
						style={{width: '225px'}}
					/>
					<img
						id="captchaCode"
						src={apis.resetPasswordCaptcha}
						onClick={e => this.changeCaptcha(e.target)}
						style={{marginTop: '-1px', cursor: 'pointer'}}
						alt="验证码"
					/>
				</FormItem>
				<FormItem key={2}>
					<Button
						type="primary"
						loading={isLoading}
						htmlType="submit"
						className="login-form-button"
					>
						申请重置密码
					</Button>
				</FormItem>
				{this.state.finished ? (
					<div style={{fontSize: '16px', color: '#dd2323'}}>
						邮件已发送，请点击链接重新设置密码！若长时间未收到邮件，请重新申请。
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

export default Form.create()(ApplyResetPassword);
