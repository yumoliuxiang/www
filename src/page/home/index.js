import React from 'react';
import {browserHistory} from 'react-router';
import {Alert, Breadcrumb, Button, Popconfirm, Radio, Table, Tabs} from 'antd';
import {axios, apis, qs} from '../../api';
import ClipboardJS from 'clipboard';
import dateFormat from '../../util/dateFormat';
import GetHongbaoForm from './getHongbaoForm';
import ContributeForm from './contributeForm';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {},
			cookies: [],
			noticeList: [],
			available: {
				meituan: 0,
				ele: 0
			},
			historyList: [],
			createTime: 15,
			tab: localStorage.getItem('tab') || '1',
			application: parseInt(localStorage.getItem('application') || 0, 10),
			carouselRecords: []
		};
	}

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.aliHongbao();
			this.getUserInfo();
			this.getCookieList();
			this.getAvailableCount();
			this.getHongbaoHistory();
			this.zhuangbi();
			this.getNotice();
		} else {
			browserHistory.push('/login');
		}
	}

	getNotice = e => {
		axios.get(apis.getNotice).then(data => this.setState({noticeList: data.data}));
	}

	getUserInfo = e => {
		axios.get(apis.getUser).then(data => {
			if (data.code === 0) {
				this.setState({user: data.data});
			} else if (data.code === 10000) {
				localStorage.clear();
				browserHistory.push('/login');
			} else {
				alert(data.message);
			}
		});
	};

	getCookieList = e => {
		axios.get(apis.cookie).then(data => {
			if (data.code === 0) {
				let cookies = data.data;
				cookies.forEach((c, i) => {
					c.time = dateFormat(new Date(c.gmtCreate));
					c.key = i;
					c.nickname = c.nickname || '--';
				});
				this.setState({cookies});
			} else {
				alert(data.message);
			}
		});
	};

	getAvailableCount = e => {
		axios.get(apis.getAvailableCount).then(data => this.setState({available: data.data}));
	};

	getHongbaoHistory = e => {
		axios.get(apis.getHongbaoHistory).then(data => this.setState({historyList: data.data}));
	};

	refresh = id => {
		axios.post(apis.refresh, qs.stringify({receivingId: id})).then(res => {
			let {data} = res;
			if (data.status === 0) {
				setTimeout(e => this.refresh(id), 10000);
			} else {
				const {historyList} = this.state;
				historyList[0] = data;
				this.setState({historyList});
				this.getAvailableCount();
			}
		});
	};

	logout = e => {
		axios.get(apis.logout).then(data => {
			localStorage.clear();
			browserHistory.push('/login');
		});
	};

	zhuangbi = e => {
		axios.get(apis.zhuangbi).then(res => this.setState({carouselRecords: res.data}));
	};

	deleteCookie = id => {
		axios.post(apis.deleteCookie, qs.stringify({cookieId: id})).then(data => {
			if (data.code === 0) {
				//前端删除
				let cookies = this.state.cookies.filter(o => o.id !== id);
				this.setState({cookies});
				//刷新
				this.getAvailableCount();
				alert('删除成功');
			} else {
				alert(data.message);
			}
		});
	};

	renderTable() {
		//根据当前application过滤
		let cookies = this.state.cookies
			.filter(o => o.application === this.state.application)
			.sort((a, b) => b.gmtCreate - a.gmtCreate);

		let onConfirm = record => {
			this.deleteCookie(record.id);
		};

		let renderHeadImg = (url, record)=>(
			url ? <img src={url} width='50' height='50' alt="头像" /> : '--'
		);

		let renderTime = (time, record)=> (
			<div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
				<p>{time}</p>
				<p>{record.nickname}</p>
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
			{title: '头像', dataIndex: 'headImgUrl', key: 'headImgUrl', width: 60, render: renderHeadImg},
			{title: '贡献时间、昵称', dataIndex: 'time', key: 'time', render: renderTime},
			{title: '操作', dataIndex: 'operate', key: 'operate', width: 60, render: renderDeleteBtn}
		];

		return <Table dataSource={cookies} columns={columns} pagination={{pageSize: 5, size: 'small', total: cookies.length}} />;
	}

	onTabChange = tab => {
		localStorage.setItem('tab', tab);
	};

	getHongbaoCallback = data => {
		let {historyList} = this.state;
		historyList = [data].concat(historyList);
		this.setState({historyList});
		this.refresh(data.id);
	};

	contributeCallback = e => {
		this.getCookieList();
		this.getAvailableCount();
	};

	onApplicationChange = e => {
		this.setState({application: e.target.value});
		localStorage.setItem('application', e.target.value);
	};

	renderCarousel = e => {
		let {carouselRecords = []} = this.state;
		let renderBox = carouselRecords.map((o, i) => (
			<li key={i}>
				{o.mail} 在 {dateFormat(new Date(o.gmtModified), 'HH:mm:ss')} 领到
				<span style={{color: '#dd2323'}}>&nbsp;{o.price}&nbsp;</span>
				元{o.application ? '饿了么' : '美团'}大红包
			</li>
		));

		return (
			<div className="scrollWrap">
				<ul className="box">{renderBox}</ul>
				<ul className="box">{renderBox}</ul>
			</div>
		);
	};

	render() {
		let {application, available, historyList} = this.state;

		return <div style={{ position: 'relative' }}>
				{this.renderCarousel()}
				{this.state.user.mail ? <h3>
						您好 {this.state.user.mail} (uid: {this.state.user.id})
					</h3> : <h3>您好</h3>}
				<Breadcrumb>
					<Breadcrumb.Item>
						<a href="https://github.com/game-helper/hongbao2/issues/new" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', margin: '12px 0' }}>
							反馈问题
						</a>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<a href="https://github.com/game-helper/donate" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', margin: '12px 0' }}>
							捐赠我们
						</a>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<a onClick={e => {
							e.preventDefault();
							this.logout();
						}}>
							退出登录
						</a>
					</Breadcrumb.Item>
				</Breadcrumb>
				<Button className="alihongbao-m" type="primary">
					支付宝天天领红包
				</Button>
				{
					this.state.user.mail
					? <Alert style={{margin: '15px 0'}} message={'今日剩余可消耗：美团 ' + available.meituan + '/' + this.state.cookies
						.filter(o => o.application === 0).length * 5 + ' 次，饿了么 ' + available.ele + '/' + this.state.cookies
						.filter(o => o.application === 1).length * 5 + ' 次'} type="info" />
					: <Alert style={{margin: '15px 0'}} message="数据加载中，长时间没有响应请刷新页面" type="info" />
				}
				{
					this.state.noticeList.map((notice, index) =>
						<Alert style={{margin: '15px 0'}} message={
							<div dangerouslySetInnerHTML={(__html => ({__html}))(notice)} />
						} key={index} type="warning" />
					)
				}
				<Tabs defaultActiveKey={this.state.tab} onChange={this.onTabChange}>
					<TabPane tab="规则" key="1">
						<div>
							<p>
								1. 领取一个 “第七个领取的人红包最大” 拼手气红包，最多需要 7 次可消耗次数。以此类推：第 N 个最大，最多需要消耗 N 次。如果该红包之前已被他人领取了 M 次，则消耗 N - M 次。
							</p>
							<p>
								2. 每天可消耗的次数为：你贡献的 cookie 数量乘以 5，第二天会自动回满次数，美团和饿了么不通用。
							</p>
							<p>
								3. 贡献之后的小号 cookie，不允许自己再拿去点红包，被我们检测之后将被限制领取，要解除限制请联系管理员。
							</p>
							<p>
								4. 次数不足以领取大红包，胡乱提交链接者，不仅领不到大红包还可能会产生不必要的次数消耗。
							</p>
							<p>
								5. 提交 “最大红包已被领取” 的链接，也可能产生不必要的次数消耗，所以领取前，请确认最大红包还未被人领。
							</p>
							<p>
								6. 要领最大红包的手机号，切记不要提前打开红包链接，会领到小红包，无法再领最大，而且会浪费你的次数。
							</p>
							<p>
								7. 美团、饿了么限制每个手机号一天只能领 5 个红包，请确保你填写的手机号还可以领，否则会浪费你的次数。
							</p>
							<p>
								8. 特别注意，无法领取差一个就是大红包的情况。例如：第七个是最大红包，已经有六个人领了，此时不要使用我们的领取功能。
							</p>
							<p>
								9. 由于刚上线，可能会出现很多问题，请多多包涵。欢迎提 issue 或者加群反馈给我们，我们也在不断修复问题。
							</p>
						</div>
					</TabPane>
					<TabPane tab="领取" key="2">
						<GetHongbaoForm historyList={historyList} callback={this.getHongbaoCallback} />
					</TabPane>
					<TabPane tab="贡献" key="3">
						<div style={{ color: '#dd2323', marginBottom: '15px' }}>
							贡献每一个微信需要完全退出 PC 微信进程再登录小号<br />贡献每一个 QQ 需要清除浏览器 cookie 或打开隐身（无痕）模式再登录小号
						</div>
						<RadioGroup onChange={this.onApplicationChange} value={application} style={{ marginBottom: '12px' }}>
							<Radio value={0}>美团</Radio>
							<Radio value={1}>饿了么</Radio>
						</RadioGroup>
						<ContributeForm callback={this.contributeCallback} application={application} />
						{this.renderTable()}
					</TabPane>
					<TabPane tab="加群" key="4" style={{ textAlign: 'center' }}>
						<a target="_blank" rel="noopener noreferrer" href="//shang.qq.com/wpa/qunwpa?idkey=716520d506845906eb56c91c53e3213ceaddbd99f704c4afa6c1761b388311db">
							点击加入 QQ 3 群：617166836
						</a>
						<div style={{ margin: '12px 0 6px 0' }}>
							扫描下面二维码，邀请你进入微信群
						</div>
						<img style={{ width: '70%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} src={require('../../static/wechat.png')} alt="" />
					</TabPane>
				</Tabs>

				{this.renderAlipayHongbao()}
			</div>
	}

	renderAlipayHongbao = e => {
		return (
			<div className="alihongbao-pc">
				<img src={require('../../static/alipayhongbao.png')} width="240" alt="支付宝天天领红包" />
				<div>支付宝天天领红包</div>
			</div>
		);
	};

	aliHongbao = e => {
		const clipboard = new ClipboardJS('.alihongbao-m', {
			text: () => 'c7XYed92oO'
		});

		clipboard.on('success', e => {
			alert('打开支付宝即可领取红包（每天仅一次）');
			e.clearSelection();
		});

		clipboard.on('error', e => {
			if (window.confirm('您的设备不支持复制红包码，是否跳转到支付宝领取？')) {
				window.location.href =
					'https://render.alipay.com/p/f/fd-j6lzqrgm/guiderofmklvtvw.html?shareId=2088312106287923&campStr=p1j%2BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL&sign=CKWXOrsHM0zT9nWHWNo76TOAPo5xqhAzOvXHgBrflIc%3D&scene=offlinePaymentNewSns';
			}
		});
	};
}
