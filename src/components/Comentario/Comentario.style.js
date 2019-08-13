import styled from 'styled-components'

const ComentarioContainer = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid gray;
    border-style: dashed;
    position: relative;
    padding: 5px;
    margin: 0 5px 0 5px;
    .comentario {
        color: gray;
        font-size: 90px;
        cursor: pointer;
    }
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
`


export { ComentarioContainer }