import Loadable from 'react-loadable';

export default loader =>
  Loadable({
    loading: () => null,
    loader
  });
