import styled from 'styled-components';

import background from '../../assets/background.png';
import rightArrowIcon from '../../assets/icons/right-arrow.svg';
import searchIcon from '../../assets/icons/search.svg';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';

export const Container = styled.main`
  width: 100vw;
  min-width: max-content;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  background: url(${background}) no-repeat center;
  background-size: cover;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .06),0 2px 5px 0 rgba(0, 0, 0, .2);
  margin: 0 auto;

  @media only screen and (min-width: 1296px) {
    width: 90%;
    max-width: 1460px;
    height: calc(100vh - 40px);
  }
`;

export const Header = styled.header`
  max-height: 60px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: #ededed;
  padding: 8px 15px;

  > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    align-items: center;

    button {
      width: 24px;
      height: 24px;
      border: none;
      cursor: pointer;

      & + button {
        margin-left: 20px;
      }
    }
  }
`;

export const Sidebar = styled.aside`
  max-width: 30%;
  min-width: 300px;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
`;

export const AlertBox = styled.section`
  max-height: 80px;
  display: flex;
  flex: 1;
  align-items: center;
  background: #9de1fe;
  padding: 25px 15px;

  img {
    margin-right: 15px;
  }

  span {
    display: block;
    font-size: 14px;
  }

  a {
    position: relative;
    color: #444;
    font-size: 12.5px;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      background: url(${rightArrowIcon}) no-repeat center;
      background-size: contain;
      padding: 5px;
      top: calc(50% - 3px);
      right: -12px;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SearchContacts = styled.section`
  position: relative;
  background: #f6f6f6;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 5px 15px;
  transition: background .24s;

  &:focus-within {
    background: #fff;
  }

  &::before {
    content: '';
    position: absolute;
    background: url(${searchIcon}) no-repeat center;
    background-size: contain;
    padding: 12px;
    top: calc(50% - 12px);
    left: 25px;
    transition: all .24s cubic-bezier(.4,0,.2,1);
  }

  &:focus-within::before {
    background: url(${leftArrowIcon}) no-repeat center;
    transform: rotate(360deg);
  }

  input {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 30px;
    font-size: 13px;
    line-height: 1;
    padding: 5px 15px 5px 50px;

    &::placeholder {
      color: #acacac;
    }
  }
`;

export const Conversation = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;

  header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    h4 {
      display: flex;
      flex-direction: column;
      color: #000;
      font-size: 14px;
      font-weight: normal;
      margin: 0 auto 0 20px;

      span {
        color: rgba(0, 0, 0, 0.6);
        font-size: 13px;
      }
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ededed;
  padding: 8px 15px;
  margin-top: auto;

  button {
    width: 24px;
    height: 24px;
    border: none;
    cursor: pointer;
  }

  input {
    width: 100%;
    height: 42px;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    padding: 5px 15px;
    margin: 0 20px;

    &::placeholder {
      color: #acacac;
    }
  }
`;
