import React from 'react';
import {Alert} from 'antd';

export default () => <Alert style={{margin: '15px 0'}} message="广告位招租" type="success" />;

// 有广告时注释上面的 Alert，打开下面的注释
// export default () => (
//   <a href="" target="_blank" rel="noopener noreferrer">
//     <img
//       style={{width: '100%', display: 'block', borderRadius: '4px'}}
//       src={require('../static/xxx.jpg')}
//       alt="某某广告"
//     />
//   </a>
// );
