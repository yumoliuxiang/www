import React from 'react';
import echarts from 'echarts';
import deep from 'deep';

export default class EchartsComponent extends React.Component {
  static echarts = echarts;

  render() {
    return (
      <div
        ref="me"
        name={this.props.name}
        className={this.props.className}
        style={this.props.style}
        onClick={this.props.onContainerClick}
      />
    );
  }

  mousedown(e) {
    this.mousex = e.offsetX;
    this.mousey = e.offsetY;
  }

  mouseup(e) {
    const cp = (a, b) => a + 15 < b || a - 15 > b;
    this.clickmoved = cp(e.offsetX, this.mousex) || cp(e.offsetY, this.mousey);
  }

  click(e) {
    !this.clickmoved && this.props.onClick && this.props.onClick(e);
  }

  componentDidMount = e => {
    this.echart = echarts.init(this.refs.me);
    this.props.getRef && this.props.getRef(this.echart);

    this.echart.setOption(this.props.option);

    this.refs.me.addEventListener('mousedown', this.mousedown);
    this.refs.me.addEventListener('mouseup', this.mouseup);
    this.echart.on('click', this.click); //'onClick'需要特殊处理，move过的，就不触发onClick事件
    this.props.group && (this.echart.group = this.props.group);

    [
      'click',
      'dblclick',
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'globalout',
      'legendselectchanged',
      'legendselected',
      'legendunselected',
      'datazoom',
      'datarangeselected',
      'timelinechanged',
      'timelineplaychanged',
      'restore',
      'dataviewchanged',
      'magictypechanged',
      'geoselectchanged',
      'geoselected',
      'geounselected',
      'pieselectchanged',
      'pieselected',
      'pieunselected',
      'mapselectchanged',
      'mapselected',
      'mapunselected',
      'axisareaselected',
      'brush',
      'brushselected'
    ]
      .filter(eventName => this.props[eventName])
      .map(eventName => this.echart.on(eventName, o => this.props[eventName](o)));
    window.addEventListener('resize', this.resize);
    setTimeout(this.resize, 360);
    this.mounted = true;
  };

  shouldComponentUpdate(nextProps) {
    const echart = this.echart;

    if (!deep.equals(this.props.style, nextProps.style)) {
      echart.resize();
    }

    if (!deep.equals(this.props.option, nextProps.option)) {
      echart.setOption(nextProps.option, !!nextProps.notMerge);
    }

    return false;
  }

  componentWillUnmount = e => {
    window.removeEventListener('resize', this.resize);
    this.echart.dispose();
    this.mounted = false;
  };

  resize() {
    if (this.mounted) this.echart.resize();
  }
}
