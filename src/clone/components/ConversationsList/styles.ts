import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex: 1;
  overflow: hidden;

  ul {
    width: 100%;
    overflow: hidden auto;

    &::-webkit-scrollbar-track {
      background: #fff;
    }
  }
`;

export const ConversationItem = styled.li`
  position: relative;
  display: flex;
  justify-content: stretch;
  align-items: center;
  background: #fff;
  padding: 8px 15px;
  cursor: pointer;

  &:first-child {
    background: #ebebeb;
  }

  &:hover {
    #conversation-menu-button {
      width: 21px;
      height: 21px;
    }
  }

  & + &:hover {
    background: #f5f5f5;
  }

  &::after {
    position: absolute;
    content: '';
    width: calc(100% - 95px);
    height: 1px;
    display: block;
    background: #f5f5f5;
    bottom: 0;
    right: 15px;
  }

  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

export const ConversationInfo = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    &:last-child {
      flex: 0 0 auto;
      align-items: flex-end;
    }
  }

  h5 {
    color: #000;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 5px;
  }

  span {
    max-width: 230px;
    display: inline-block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    img {
      margin-right: 3px;
      transform: translateY(3px);
    }
  }

  small {
    color: rgba(0, 0, 0, 0.45);
    font-size: 11px;
  }
`;

export const ConversationButtons = styled.div`
  height: max-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: auto;

  button {
    width: 0;
    height: 0;
    display: flex;
    background: none;
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: width .1s;
  }
`;

