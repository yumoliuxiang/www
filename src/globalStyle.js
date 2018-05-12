import {injectGlobal} from 'styled-components';
import Media from './component/Media';

injectGlobal`
  html {
    overflow-y: scroll;
    overflow-x: auto;
  }
  
  body {
    min-width: 290px;
    max-width: 480px;
    padding: 0 15px;
    margin: 0 auto;
    
    &.is-home {
      width: 1020px;
      max-width: 100%;
      
      ${Media.mobile`width: 100%;`}
    }
  }
  
  #root {
    padding-top: 20px;
  }
  
  input {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: rgba(0, 0, 0, 0.65) !important;
    vertical-align: middle;
  }
  
  textarea {
    resize: none;
  }
  
  .ant-tabs-tabpane {
    margin-bottom: 12px;
  }
  
  .ant-form-item {
    margin-bottom: 12px;
  }
  
  .ant-table-thead {
    white-space: nowrap;
  }
  
  .ant-collapse-header {
    pointer-events: none;
  }
  
  .ant-collapse-borderless > .ant-collapse-item {
    border-top: 1px solid #d9d9d9;
    border-bottom: 0;
  }
  
  .ant-pagination > li {
    margin-bottom: 8px;
  }
  
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 16px 8px;
  }
  
  .ant-tabs-nav .ant-tabs-tab {
    margin-right: 5px;
  }
  
  .ant-breadcrumb a {
    color: #40a9ff;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
