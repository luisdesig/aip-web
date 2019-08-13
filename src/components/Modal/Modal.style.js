import styled from 'styled-components';
import { Modal } from 'antd';

const ModalWrapper = styled(Modal)`
    .aceptar {
        background: #f0353b;
        border: #f0353b
        span {
            color: white
        }
    }
    .aceptar:hover, .aceptar:focus{
        background: red;
        border: #f0353b
        span {
            color: white
        }
    }
    .cancelar {
        background: white;
        border-color: #f0353b
        span {
            color: #f0353b
        }
    }
    .cancelar:hover, .cancelar:focus {
        background: white;
        border: 1px solid #f0353b
        span {
            color: #f0353b
        }
    }
    .ant-modal-header, .ant-modal-body {
    }
    .ant-select{
        text-align: center;
        cursor: pointer;
    }
`

export {
    ModalWrapper
}