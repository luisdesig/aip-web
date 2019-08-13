import React from 'react';
import { ImageContainer } from './Image.style';
import { ModalWrapper } from '../Util/util.style';

const ImagePreview = (props) => (
    <ModalWrapper
        style={{zIndex: 1001}}
        visible={props.previewVisible}
        footer={null}
        onCancel={props.handelCloseView}
    >
        {props.children}
    </ModalWrapper>
)

export default ImagePreview