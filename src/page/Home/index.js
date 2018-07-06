import React from 'react';
import {Alert, Breadcrumb, Tabs} from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import {axios, apis, logout} from '../../api';
import Ad from '../../component/Ad';
import Alipay from '../../component/Alipay';
import Carousel from '../../component/Carousel';
import Notice from '../../component/Notice';
import Talk from '../../component/Talk';
import Media from '../../component/Media';
import Domain from '../../component/Domain';
import GetHongbao from './GetHongbao';
import Contribute from './Contribute';
import FriendLink from './FriendLink';
import Rules from './Rules';
import Rank from './Rank';
import Statistics from './Statistics';
import JoinGroup from './JoinGroup';
import MiniProgram from './MiniProgram';

const Container = styled.div`
  display: flex;
  justify-content: center;

  ${Media.mobile`display: block;`};
`;

const Column = styled.div`
  position: relative;
  width: 480px;

  &:first-child {
    margin-right: 20px;
  }

  ${Media.mobile`width: 100%;`};
`;

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      cookies: [],
      noticeList: [],
      number: {
        ele: {
          available: 0,
          total: 0
        },
        meituan: {
          available: 0,
          total: 0
        }
      },
      historyList: [],
      createTime: 15,
      tab: localStorage.getItem('tab') || '1',
      application: 1, // parseInt(localStorage.getItem('application') || 0, 10),
      carouselRecords: [],
      rankData: {},
      trendData: {},
      pieData: {
        ele: [],
        meituan: []
      }
    };
    document.body.classList.add('is-home');
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.callApiByTab();
      this.getUserInfo();
      this.getAvailableCount();
      this.zhuangbi();
    } else {
      logout();
    }
  }

  render() {
    const {application, historyList, tab, carouselRecords, cookies, rankData, trendData, pieData} = this.state;
    return (
      <Container>
        <Column>
          <Carousel data={carouselRecords} />
          {this.renderHello()}
          {this.renderBreadcrumb()}
          <Alipay />
          <Domain />
          {this.renderAvailable()}
          <Ad />
          <Notice />
          <Talk />
        </Column>
        <Column>
          <Tabs defaultActiveKey={tab} onChange={this.onTabChange}>
            <Tabs.TabPane tab="规则" key="rule">
              <Rules />
            </Tabs.TabPane>
            <Tabs.TabPane tab="领取" key="getHongbao">
              <GetHongbao historyList={historyList} callback={this.getHongbaoCallback} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="贡献" key="contribute">
              <Contribute
                contributeCallback={this.contributeCallback}
                onApplicationChange={this.onApplicationChange}
                application={application}
                cookies={cookies}
                deleteCookieCallback={this.deleteCookieCallback}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="排行" key="rank">
              <Rank data={rankData} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="统计" key="statistics">
              <Statistics data={trendData} pieData={pieData} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="小程序" key="mp">
              <MiniProgram />
            </Tabs.TabPane>
            <Tabs.TabPane tab="加群" key="joinGroup">
              <JoinGroup />
            </Tabs.TabPane>
          </Tabs>
          <FriendLink />
        </Column>
      </Container>
    );
  }

  deleteCookieCallback = id => {
    //前端删除
    let cookies = this.state.cookies.filter(o => o.id !== id);
    this.setState({cookies});
    //刷新
    this.getAvailableCount();
  };

  getTrend = e => {
    axios.get(apis.getTrend).then(data => this.setState({trendData: data.data}));
  };

  getRank = e => {
    axios.get(apis.getRank).then(data => this.setState({rankData: data.data}));
  };

  getUserInfo = e => {
    axios.get(apis.getUser).then(data => {
      if (data.code === 0) {
        this.setState({user: data.data});
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
          c.time = moment(new Date(c.gmtCreate)).format('YYYY-MM-DD HH:mm:ss');
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
    axios.get(apis.getAvailableCount).then(data => this.setState({number: data.data}));
  };

  getHongbaoHistory = e => {
    axios.get(apis.getHongbaoHistory).then(data => this.setState({historyList: data.data}));
  };

  refresh = id => {
    axios.get(`${apis.refresh}/${id}`).then(res => {
      const {data} = res;
      if (data.status === 0) {
        setTimeout(() => this.refresh(id), 1000);
      } else {
        const {historyList} = this.state;
        historyList[0] = data;
        this.setState({historyList});
        this.getAvailableCount();
      }
    });
  };

  zhuangbi = e => {
    axios.get(apis.zhuangbi).then(res => this.setState({carouselRecords: res.data}));
  };

  getPie = e => {
    axios.get(apis.getPie).then(res => this.setState({pieData: res.data}));
  };

  onTabChange = tab => {
    this.callApiByTab(tab);
    localStorage.setItem('tab', tab);
  };

  callApiByTab = (tab = this.state.tab) => {
    switch (tab) {
      case 'getHongbao':
        if (this.state.historyList.length) return;
        this.getHongbaoHistory();
        break;
      case 'contribute':
        if (this.state.cookies.length) return;
        this.getCookieList();
        break;
      case 'rank':
        if (Object.keys(this.state.rankData).length) return;
        this.getRank();
        break;
      case 'statistics':
        if (Object.keys(this.state.trendData).length) return;
        this.getTrend();
        this.getPie();
        break;
      default:
        break;
    }
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

  renderHello = e => {
    return this.state.user.mail ? (
      <h3>
        您好 {this.state.user.mail} (uid: {this.state.user.id})
      </h3>
    ) : (
      <h3>您好</h3>
    );
  };

  renderBreadcrumb = e => {
    return (
      <Breadcrumb style={{margin: '15px 0'}}>
        <Breadcrumb.Item>
          <a href="https://github.com/mtdhb" target="_blank" rel="noopener noreferrer">
            本站开源
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="https://github.com/mtdhb/mtdhb/issues" target="_blank" rel="noopener noreferrer">
            反馈问题
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="https://github.com/mtdhb/donate/blob/master/README.md" target="_blank" rel="noopener noreferrer">
            捐赠我们
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          >
            退出登录
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  renderAvailable = e => {
    let {meituan, ele} = this.state.number;

    return this.state.user.mail ? (
      <Alert
        style={{margin: '15px 0'}}
        message={
          '今日剩余可消耗：美团 ' +
          meituan.available +
          '/' +
          meituan.total +
          ' 次，饿了么 ' +
          ele.available +
          '/' +
          ele.total +
          ' 次'
        }
        type="info"
      />
    ) : (
      <Alert style={{margin: '15px 0'}} message="数据加载中，长时间没有响应请刷新页面" type="info" />
    );
  };
}
