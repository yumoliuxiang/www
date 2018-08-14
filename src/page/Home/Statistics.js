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
        <div>成功领取最大红包的总个数（单位：千个）</div>
        <div>因为现在支持了领取到最佳前一个, 所以那部分领取不在图表统计之中</div>
        <Echarts
          style={{height: '300px', width: '100%'}}
          option={{
            grid: {
              top: 30,
              bottom: 24,
              right: 40
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
            yAxis: [
              {
                // name: '成功领取最大红包的总金额（千元）',
                nameTextStyle: {
                  color: '#666'
                },
                type: 'value',
                min: 0,
                max: 40000,
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
              {
                nameTextStyle: {
                  color: '#666'
                },
                type: 'value',
                min: 0,
                max: 10000,
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
                  show: false
                }
              }
            ],
            series: [
              {
                data: ele.map(o => o.totalPrice).reverse(),
                hoverAnimation: false,
                lineStyle: {
                  color: 'rgb(0,141,225)'
                },
                itemStyle: {
                  color: 'rgb(0,141,225)'
                },
                type: 'line'
              },
              {
                data: meituan.map(o => o.totalPrice).reverse(),
                hoverAnimation: false,
                lineStyle: {
                  color: 'rgb(255,209,97)'
                },
                itemStyle: {
                  color: 'rgb(255,209,97)'
                },
                type: 'line'
              },
              {
                data: meituan.map(o => o.count).reverse(),
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                type: 'bar',
                barWidth: 15,
                barCategory: 0,
                yAxisIndex: 1,
                itemStyle: {
                  color: 'rgb(255,209,97)'
                }
              },
              {
                data: ele.map(o => o.count).reverse(),
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                type: 'bar',
                barWidth: 15,
                barGap: '50%',
                barCategory: 0,
                yAxisIndex: 1,
                itemStyle: {
                  color: 'rgb(0,141,225)'
                }
              }
            ]
          }}
        />
        {this.renderPie()}
      </div>
    );
  }

  renderPie() {
    let {pieData} = this.props;

    return [
      <Echarts
        style={{width: '100%', height: '300px', marginTop: '24px'}}
        key={0}
        option={{
          // color: ['#22559c', '#f27370', '#fa9856', '#ede862', '#51dacf', '#9e3668', '#ff7f5b', '#7aa5d2'],
          title: {
            text: '饿了么大红包金额分布',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} : {b} 元<br/> 占比 : {d}%'
          },
          series: [
            {
              name: '红包金额',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: pieData.ele.map(o => ({value: o.proportion / 1000, name: o.price})),
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }}
      />,
      <Echarts
        style={{width: '100%', height: '300px', marginTop: '24px'}}
        key={1}
        option={{
          // color: ['#22559c', '#f27370', '#fa9856', '#ede862', '#51dacf', '#9e3668', '#ff7f5b', '#7aa5d2'],
          title: {
            text: '美团大红包金额分布',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} : {b} 元<br/> 占比 : {d}%'
          },
          series: [
            {
              name: '红包金额',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: pieData.meituan.map(o => ({value: o.proportion / 1000, name: o.price})),
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }}
      />
    ];
  }
}
