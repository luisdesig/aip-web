import React from 'react';
import { Layout, Menu, Col, Row, Tabs, Avatar, Dropdown, Spin, Alert, Modal, Button } from 'antd';
import Options from './options';
import { connect } from 'react-redux';
import authAction from '../../redux/Auth/actions';
import Sidebar from '../Sidebar/Sidebar';
import { Notification } from '../../components/Notifications/Notifications';
import { messages } from '../../util/messages';
import {
  STARTACTIONGETPARAMETRICAS,
  STARTACTIONGETUBIGEOZONA,
  STARTACTIONZONA,
  STARTACTIONZONASOCUPADAS,
  STARTACTIONGETGRUPOSGARANTIA,
  STARTACTIONRIESGOS,
  STARTACTIONGETGIROSNEGOCIOS,
  STARTACTIONGETINGENIEROQA,
} from '../../redux/Common/actions';
import imgLogo from '../../images/logo-rimac.png';
const PermisosDenegados =
  'El usuario ingresado no cuenta con un perfil, ir a configuración del SAS';

const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;
const { logout } = authAction;

function array(x) {
  let rootSubmenuKeys = [];
  for (var i = 0; i < x; i++) {
    rootSubmenuKeys.push(i.toString());
  }
  return rootSubmenuKeys;
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [];
    this.state = {
      openKeys: [],
      rootSubmenuKeys: array(Options.length),
      activeKey: panes.length === 0 ? '0' : panes[0].key,
      panes,
      status: '123',
    };
    this.add = this.add.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  async componentDidMount() {
    await this.props.STARTACTIONGETPARAMETRICAS();
    await this.props.STARTACTIONGETUBIGEOZONA();
    await this.props.STARTACTIONZONA();
    await this.props.STARTACTIONGETGRUPOSGARANTIA();
    await this.props.STARTACTIONRIESGOS();
    await this.props.STARTACTIONGETGIROSNEGOCIOS();
    await this.props.STARTACTIONGETINGENIEROQA();
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  menuItem = e => {};

  onOpenChange = openKeys => {
    const lastestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(lastestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: lastestOpenKey ? [lastestOpenKey] : [],
      });
    }
    this.setState({
      rootSubmenuKeys: array(this.props.sidebar.length),
    });
  };

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = item => {
    const panes = this.state.panes;
    const activeKey = item.index.toString();
    const params = panes.find(res => res.key === activeKey);
    if (!params) {
      panes.push({ title: item.tab, content: item.component, key: activeKey });
    }
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    const { username, sidebar, modal } = this.props;
    const user = username.split('@');
    const menu = (
      <Menu style={{ textAlign: 'center' }}>
        {user ? (
          <Menu.Item key="0">
            <a>{user[0].toUpperCase()}</a>
          </Menu.Item>
        ) : (
          ''
        )}
        <Menu.Item key="1">
          <a href="">Descargar</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a onClick={this.props.logout}>Salir</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout height="100%">
        {this.props.errorserver === false
          ? ''
          : Notification('error', messages.errorconexiontitle, messages.errorconexioncontent)}
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Row>
            <Col lg={12}>
              <div className="logo">
                <img src={imgLogo} alt="Logo RIMAC Seguros" />
              </div>
            </Col>
            <Col lg={12} style={{ textAlign: 'right', color: 'white' }}>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                <Avatar size={40} style={{ cursor: 'pointer', background: 'white', color: 'red' }}>
                  {username.toUpperCase().substring(0, 2)}
                </Avatar>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        {modal ? (
          <Modal
            title="Configuración de Usuario"
            visible={modal}
            footer={[
              <Button
                key="back"
                style={{ background: '#dc3545', color: '#ffffff' }}
                onClick={this.props.logout}
              >
                Salir
              </Button>,
            ]}
          >
            <p>{PermisosDenegados}</p>
          </Modal>
        ) : (
          ''
        )}
        {sidebar.length === 0 ? (
          <Spin
            tip="Cargando Plataforma..."
            style={{ position: 'absolute', top: 100, color: '#f0353b' }}
          >
            <Alert
              style={{ textAlign: 'center', color: '#f0353b' }}
              message="Cargando Menu .............."
              description="Espere un momento por favor."
              type="info"
            />
          </Spin>
        ) : (
          <Layout>
            <Sidebar
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              Options={sidebar}
              add={this.add}
            />
            <Layout style={{ padding: '0 24px 24px', height: '100%', marginTop: 64 }}>
              <div style={{ margin: '16px 0' }}>
                <Tabs
                  hideAdd
                  onChange={this.onChange}
                  activeKey={this.state.activeKey}
                  type="editable-card"
                  onEdit={this.onEdit}
                >
                  {this.state.panes.map(pane => {
                    return (
                      <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                        <Content
                          style={{
                            background: '#fff',
                            padding: '0 50px 50px',
                            minHeight: 280,
                            maxHeight: '100%',
                          }}
                        >
                          {pane.content}
                        </Content>
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </Layout>
          </Layout>
        )}
      </Layout>
    );
  }
}

const mapStateProps = state => ({
  errorserver: state.common.errorserver,
  username: state.auth.username,
  sidebar: state.auth.sidebar,
  modal: state.auth.modal,
});

const mapDispatchProps = dispatch => ({
  STARTACTIONGETPARAMETRICAS: () => dispatch(STARTACTIONGETPARAMETRICAS()),
  STARTACTIONGETUBIGEOZONA: () => dispatch(STARTACTIONGETUBIGEOZONA()),
  STARTACTIONZONA: () => dispatch(STARTACTIONZONA()),
  STARTACTIONZONASOCUPADAS: () => dispatch(STARTACTIONZONASOCUPADAS()),
  STARTACTIONGETGRUPOSGARANTIA: () => dispatch(STARTACTIONGETGRUPOSGARANTIA()),
  STARTACTIONRIESGOS: () => dispatch(STARTACTIONRIESGOS()),
  STARTACTIONGETGIROSNEGOCIOS: () => dispatch(STARTACTIONGETGIROSNEGOCIOS()),
  STARTACTIONGETINGENIEROQA: () => dispatch(STARTACTIONGETINGENIEROQA()),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateProps,
  mapDispatchProps,
)(Main);
