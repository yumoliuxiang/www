import React from 'react';
import ec from 'echarts';
import deep from 'deep';

var EcharsReact = React.createClass({
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
  },

  mousedown(e) {
    this.mousex = e.offsetX;
    this.mousey = e.offsetY;
  },
  mouseup(e) {
    var cp = (a, b) => a + 15 < b || a - 15 > b;
    this.clickmoved = cp(e.offsetX, this.mousex) || cp(e.offsetY, this.mousey);
  },
  click(e) {
    !this.clickmoved && this.props.onClick && this.props.onClick(e);
  },
  componentDidMount() {
    this.echart = ec.init(this.refs.me);
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
  },

  shouldComponentUpdate(nextProps) {
    var echart = this.echart;

    if (!deep.equals(this.props.style, nextProps.style)) {
      echart.resize();
    }

    if (!deep.equals(this.props.option, nextProps.option)) {
      echart.setOption(nextProps.option, !!nextProps.notMerge);
    }

    return false;
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    this.echart.dispose();
  },

  resize() {
    if (this.isMounted()) this.echart.resize();
  }
});
EcharsReact.echarts = ec;
export default EcharsReact;
