import styled from 'styled-components'

const ImageContainer = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid gray;
    border-style: dashed;
    position: relative;
    padding: 5px;
    margin: 0 5px 0 5px;
    .button-delete {
        color: #1890ff;
        position: absolute;
        right: -8px;
        top: -10px;
        cursor: pointer;
    }
    .button-delete:hover {
        backgorund: gray;
    }
    .button-view {
        color: #1890ff;
        position: absolute;
        top: 37px;
        left: 33px;
        font-size: 28px;
        cursor: pointer;
        z-index: 1
    }
    .button-view:hover {
        backgorund: gray;
    }
    img {
        width: 100%;
        height: 100%;
        opacity: 0.5
    }
`


export { ImageContainer }