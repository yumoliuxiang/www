import {asyncComponent} from 'react-async-component';

// 有点大，异步加载
export default asyncComponent({
  resolve: () => import('./Talk')
});
