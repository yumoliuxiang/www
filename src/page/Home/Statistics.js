import React from 'react';
import Echarts from '../../component/Echarts';

export default class Statistics extends React.Component {
  render() {
    let {ele = [], meituan = []} = this.props.data;

    if (!ele.length && !meituan.length) return <div style={{textAlign: 'center'}}>暂无数据</div>;

    return (
      <div>
        <div style={{color: '#dd2323'}}>统计数据半小时更新一次</div>
        <div>成功领取最大红包的总金额（单位：千元）</div>
        <div>成功领取最大红包的总个数（单位：千个）</div>
        <div>因为现在支持了领取到最大前一个, 所以那部分领取不在图表统计之中</div>
        <div>因为现在饿了么只能领到最大前一个，所以不再展示图表统计</div>
        {this.renderPie()}
      </div>
    );
  }

  renderPie() {
    let {pieData} = this.props;

    return [
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
