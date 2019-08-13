import React from 'react';
import { LayoutWrapper, HeaderWrapper } from './header.style';
import { ColForm, RowForm } from '../Util/util.style';
import imgLogo from '../../images/logo-rimac.png';

const { Header } = LayoutWrapper;

class HeaderLogin extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <Header>
          <RowForm gutter={16}>
            <ColForm lg={24}>
              <img src={imgLogo} alt="Logo RIMAC Seguros" />
            </ColForm>
          </RowForm>
        </Header>
      </HeaderWrapper>
    );
  }
}

export default HeaderLogin;
