import React from 'react';
import raf from 'raf';

export default class Carousel extends React.Component {
  static defaultProps = {
    interval: 3000
  };

  constructor(props) {
    super(props);

    this.boxDom = null;
    this.innerDom = null;

    this.state = {};
  }

  componentDidMount = e => {
    setTimeout(e => {
      raf(this.run);
    }, this.props.interval);
  };

  run = e => {
    try {
      if (this.boxDom.scrollTop >= this.innerDom.scrollHeight) {
        this.boxDom.scrollTop = 0;
      } else {
        this.boxDom.scrollTop++;
      }

      if (this.boxDom.scrollTop % 30) {
        raf(this.run);
      } else {
        setTimeout(e => {
          raf(this.run);
        }, this.props.interval);
      }
    } catch (e) {
      // 在 home 跳到其它页时，会报错
    }
  };

  renderBody() {
    let {data = []} = this.props;

    return (
      <div
        style={{width: '100%', height: '100%', overflow: 'hidden'}}
        ref={dom => (this.boxDom = dom)}
      >
        <div ref={dom => (this.innerDom = dom)}>
          {data.map((item, index) => (
            <div
              style={{height: '30px', lineHeight: '30px'}}
              className="marquee-vertical-txt"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          {data.map((item, index) => (
            <div
              style={{height: '30px', lineHeight: '30px'}}
              className="marquee-vertical-txt"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{width: '100%', height: '30px', overflow: 'hidden'}}>
        {this.renderBody()}
      </div>
    );
  }
}
