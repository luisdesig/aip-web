import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';

const HeaderWrapper = styled.div`
    .ant-layout-header {
        background: #f0353b;
    }
    img {
        width: 130px;
    }
`

const LayoutWrapper = styled(Layout)`
    
`
const MenuWrapper = styled(Menu)`

`
const IconWrapper = styled(Icon)`

`

export {
    LayoutWrapper,
    MenuWrapper,
    IconWrapper,
    HeaderWrapper
}