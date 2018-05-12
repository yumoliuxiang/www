import {css} from 'styled-components';

export default {
  mobile: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)};
    }
  `
};
