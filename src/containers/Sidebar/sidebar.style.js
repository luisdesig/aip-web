import styled from 'styled-components'

const SidebarContainer = styled.div`
    color: #494f66;
    .ant-menu-submenu-title {
        margin: 0 !important
    }
    .ant-menu-submenu-title:hover {
        color: white;
    }
    .ant-menu-submenu-arrow:hover{
        color: white !important
    }
    .Menu-Title:hover {
        background-color: #F0353B !important;
        color: white !important
        i{
            color: white !important
        }
    }
    .Menu-Title:focus {
        background-color: #F0353B !important;
        color: white !important
    }
    .Sub-Menu{
        height: auto !important;
        white-space: unset !important;
        line-height: initial !important;
        padding: 5px 5px 5px 48px !important;
    }
    .Sub-Menu:hover{
        color: #494f66 !important;
    }
`

export { SidebarContainer }