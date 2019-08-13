import styled from 'styled-components'

const TitleContainer = styled.div`
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: #494f66;
    padding: 10px 0 10px 0;
    font-size: 30px;
    line-height: 1.3;
    letter-spacing: 0.2px;
    text-align: center
`
const PanelContainer = styled.div`
    border: 1px solid #A9B1D1;
    border-radius: 3px;
    background: #ffffff;
    position: relative;
    margin-bottom: 10px;
    .panel-title{
        color: #676F8F;
        font-size: 14px;
        background: white;
        position: absolute;
        top: -12px;
        left: 12px;
    }
`

export { TitleContainer, PanelContainer }