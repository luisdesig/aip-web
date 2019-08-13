import React from 'react';
import { Button } from 'antd';
import { ModalWrapper } from './Modal.style';

export const Modal = props => {
  return (
    <div>
      <ModalWrapper
        title={props.title}
        visible={props.visible}
        width={props.width}
        centered={props.centered}
        onCancel={props.onCancel}
        footer={[
          <Button className="cancelar" key="back1" onClick={props.onCancel}>
            Cancelar
          </Button>,
          <Button
            className="aceptar"
            key="submit"
            type="primary"
            disabled={props.disabled}
            style={props.params === 'view' ? { display: 'none' } : { display: 'inline' }}
            onClick={props.onOk}
          >
            Guardar
          </Button>,
        ]}
      >
        {props.children}
      </ModalWrapper>
    </div>
  );
};

export const ModalQ = props => {
  return (
    <div>
      <ModalWrapper
        title={props.title}
        visible={props.visible}
        width={props.width}
        centered={props.centered}
        onCancel={props.onCancel}
        footer={[
          <Button className="cancelar" key="back2" onClick={props.onCancel}>
            Cancel
          </Button>,
          <Button
            className="aceptar"
            key="submit"
            type="primary"
            style={props.params === 'view' ? { display: 'none' } : { display: 'inline' }}
            onClick={props.onOk}
          >
            Pre-Guardar
          </Button>,
        ]}
      >
        {props.children}
      </ModalWrapper>
    </div>
  );
};

export const ModalLoading = props => {
  return (
    <div>
      <ModalWrapper
        title={props.title}
        visible={props.visible}
        width={props.width}
        centered={props.centered}
        onCancel={props.onCancel}
        footer={[
          <Button className="cancelar" key="back3" onClick={props.onCancel}>
            Cancelar
          </Button>,
          <Button
            className="aceptar"
            key="submit"
            loading={props.loading}
            type="primary"
            style={props.params === 'view' ? { display: 'none' } : { display: 'inline' }}
            onClick={props.onOk}
          >
            Guardar
          </Button>,
        ]}
      >
        {props.children}
      </ModalWrapper>
    </div>
  );
};
