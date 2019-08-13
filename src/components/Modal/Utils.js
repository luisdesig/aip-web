import React from 'react';
import { ModalWrapper } from './Modal.style';

const confirm = ModalWrapper.confirm;
export function showConfirm(title, content, props, cancel) {
  confirm({
    title: title,
    content: content,
    okText: 'Aceptar',
    okType: 'danger',
    cancelText: 'Cancelar',
    cancelType: 'primary',
    onOk() {
      props();
      cancel();
    },
    onCancel() {
      cancel()
    },
  })
}

export function showDeleteConfirm(title, content, props) {
  confirm({
    title: title,
    content: content,
    okText: 'Aceptar',
    okType: 'danger',
    cancelText: 'Cancelar',
    cancelType: 'primary',
    onOk() {
      props();
    },
    onCancel() {
    },
  });
}
export function showDeleteConfirmModal(title, content, props) {
  confirm({
    title: title,
    content: content,
    okText: 'Aceptar',
    okType: 'danger',
    cancelText: 'Cancelar',
    cancelType: 'primary',
    onOk() {
      props();
    },
    onCancel() {
    },
  });
}

export function info(title, content) {
  ModalWrapper.info({
    title: title,
    content: content,
    onOk() { },
  });
}

export function success(title, content) {
  ModalWrapper.success({
    title: title,
    content: content,
  });
}
/*
function error(title, content) {
    ModalWrapper.error({
      title: 'This is an error message',
      content: content,
    });
}

function warning(title, content) {
    ModalWrapper.warning({
      title: title,
      content: content,
    });
}
*/