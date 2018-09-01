import React from 'react';
import moment from 'moment';
import {Carousel} from 'antd';

export default ({data = []}) => (
  <div style={{height: '30px', overflow: 'hidden'}}>
    <Carousel vertical autoplay>
      {data.map((o, i) => (
        <div key={i} style={{color: '#5bab60', fontSize: '16px', whiteSpace: 'nowrap'}}>
          {o.mail} 在 {moment(new Date(o.gmtModified)).format('HH:mm:ss')} 领到
          <span style={{color: '#dd2323'}}>&nbsp;{o.price}&nbsp;</span>
          元{o.application ? '饿了么' : '美团'}大红包
        </div>
      ))}
    </Carousel>
  </div>
);
