import React from 'react';
import moment from 'moment';
import Echarts from '../../component/Echarts';

export default class Statistics extends React.Component {
  render() {
    let {ele = [], meituan = []} = this.props.data;

    if (!ele.length) return <div style={{textAlign: 'center'}}>暂无数据</div>;

    return (
      <div>
        <div style={{color: '#dd2323'}}>统计数据半小时更新一次</div>
        <div>成功领取最大红包的总金额（单位：千元）</div>
        <Echarts
          style={{height: '300px', width: '100%'}}
          option={{
            grid: {
              top: 30,
              bottom: 24,
              right: 0
            },
            tooltip: {
              show: true,
              trigger: 'axis',
              formatter: params => {
                try {
                  const name = params[0].name;
                  const e = ele.find(o => o.date === name);
                  const m = meituan.find(o => o.date === name);
                  return `${moment(new Date(name)).format('YYYY-MM-DD')}<br />
                    饿 ${e.totalPrice}元/${e.count}个 平均${(e.totalPrice / e.count).toFixed(1)}元<br/>
                    美 ${m.totalPrice}元/${m.count}个 平均${(m.totalPrice / m.count).toFixed(1)}元`;
                } catch (e) {
                  return '数据出错，请联系管理员修复';
                }
              }
            },
            xAxis: {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                color: '#666',
                formatter: value => {
                  return moment(new Date(value)).format('MM-DD');
                }
              },
              splitLine: {
                show: false
              },
              data: ele.map(o => o.date).reverse()
            },
            yAxis: {
              // name: '成功领取最大红包的总金额（千元）',
              nameTextStyle: {
                color: '#666'
              },
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                color: '#666',
                formatter: value => Number(value / 1000).toFixed(0)
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            series: [
              {
                data: ele.map(o => o.totalPrice).reverse(),
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                lineStyle: {
                  color: 'rgb(0,141,225)'
                },
                type: 'line'
              },
              {
                data: meituan.map(o => o.totalPrice).reverse(),
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                lineStyle: {
                  color: 'rgb(255,209,97)'
                },
                type: 'line'
              }
            ]
          }}
        />
      </div>
    );
  }
}
