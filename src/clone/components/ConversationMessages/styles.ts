import styled from 'styled-components';
import AutoScroll from '@brianmcallister/react-auto-scroll';

import messageInArrowIcon from '../../assets/icons/message-in-arrow.svg';
import messageOutArrowIcon from '../../assets/icons/message-out-arrow.svg';

export const Container = styled.section`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

export const CurrentConversationDate = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: 6px;
  left: 0;
  z-index: 999;

  span {
    background: #E2F5FD;
    border-radius: 7.5px;
    font-size: 11px;
    padding: 6px 12px;
  }
`;

export const MessagesList = styled(AutoScroll)`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden auto;

  > div {
    padding: 15px 70px;
    overflow-x: hidden !important;
  }
`;

export const Message = styled.div`
  position: relative;
  width: max-content;
  max-width: 520px;
  border-radius: 7.5px;
  box-shadow: 0 1px .5px rgba(0, 0, 0, 0.13);
  padding: 7px 8px;

  span {
    position: relative;
    display: flex;
    font-size: 13px;
    padding-bottom: 2px;
  
    &::after {
      content: '';
      display: block;
      width: 50px;
      right: 0;
      bottom: 0;
    }
  }

  small {
    position: absolute;
    color: rgba(0, 0, 0, 0.45);
    font-size: 9px;
    right: 8px;
    bottom: 4px;
  }
`;

export const MessageIn = styled(Message).attrs({
  'data-value': 'message-in',
})`
  background: #fff;

  & + & {
    margin-top: 2px;
  }

  div[data-value="message-out"] + & {
    margin-top: 15px
  }

  &:first-child, 
  div[data-value="message-out"] + & {
    border-top-left-radius: 0;
  }

  &:first-child::before, 
  div[data-value="message-out"] + &::before {
    position: absolute;
    content: '';
    width: 8px;
    height: 13px;
    display: block;
    background: url(${messageInArrowIcon}) no-repeat center;
    background-size: contain;
    top: 0;
    left: -8px;
  }
`;

export const MessageOut = styled(Message).attrs({
  'data-value': 'message-out',
})`
  background: #dcf8c6;
  margin-left: auto;

  & + & {
    margin-top: 2px;
  }

  div[data-value="message-in"] + & {
    margin-top: 15px
  }

  &:first-child,
  div[data-value="message-in"] + & {
    border-top-right-radius: 0;
  }

  &:first-child::after,
  div[data-value="message-in"] + &::after {
    position: absolute;
    content: '';
    width: 8px;
    height: 13px;
    display: block;
    background: url(${messageOutArrowIcon}) no-repeat center;
    background-size: contain;
    top: 0;
    right: -8px;
  }

  small {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    img {
      width: 14px;
      height: 14px;
      margin-left: 3px;
    }
  }
`;
