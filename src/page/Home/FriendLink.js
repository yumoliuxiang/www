import React from 'react';
import {Icon} from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: none; /* 需要时删除此行 */
  position: relative;
  border-top: 1px dashed #ccc;
  padding: 15px 0;
`;

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  :after {
    content: ' ';
    color: rgba(0, 0, 0, 0.5);
    padding: 0 5px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default class FriendLink extends React.Component {
  state = {
    links: [
      {
        href: '',
        text: ''
      }
    ]
  };

  render() {
    return (
      <Wrapper>
        <Icon type="usergroup-add" />&nbsp; {this.state.links.map(link => <Link href={link.href}>{link.text}</Link>)}
      </Wrapper>
    );
  }
}
