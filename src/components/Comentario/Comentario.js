import React from 'react';
import { ComentarioContainer } from './Comentario.style';
import { IconWrapper } from '../Util/util.style';

const ComentarioMedia = (props) => (
    <ComentarioContainer className="clearfix" listType="picture-card">
        <IconWrapper
            type="close-circle"
            className='button-delete'
            onClick={props.handleDelete}
        />
        <IconWrapper
            className='comentario'
            type='file-text'
            onClick={props.handleEdit}
        />
        <IconWrapper />
    </ComentarioContainer>
)

export default ComentarioMedia