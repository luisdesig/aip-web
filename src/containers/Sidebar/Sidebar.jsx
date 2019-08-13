import React from 'react';
import { SidebarContainer } from './sidebar.style';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends React.Component {
    render() {
        return (
            <SidebarContainer>
                <Sider
                    breakpoint="md"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => { }}
                    onCollapse={(collapsed, type) => { }}
                    width={200}
                    style={{
                        background: '#fff',
                        marginTop: 64,
                    }}>

                    <Menu
                        mode="inline"
                        openKeys={this.props.openKeys}
                        onOpenChange={this.props.onOpenChange}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <li className='menu'>
                            <span>Menú</span>
                        </li>
                        {this.props.Options.map((item, index) => {
                            return (
                                <SubMenu className='Menu-Title' key={index} title={<span><Icon type="user" />{item.padre.nombre}</span>}>
                                    {item.padre.hijos.map((item, index) => {
                                        return (
                                            <Menu.Item
                                                className='Sub-Menu'
                                                key={item.index}
                                                onClick={()=>this.props.add(item)}
                                            >
                                                {item.nombre}
                                            </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            )
                        })}
                    </Menu>
                </Sider>
            </SidebarContainer>
        )
    }
}

export default Sidebar;