import React from 'react';
import { ImageContainer } from './Image.style';
import { IconWrapper } from '../Util/util.style';

const Image = (props) => (
    <ImageContainer className="clearfix" listType="picture-card">
        <IconWrapper 
            type="close-circle" 
            className='button-delete'
            onClick={props.handleDelete}
            />
        <IconWrapper 
            type="eye" 
            className='button-view'
            onClick={props.handleView}/>
        <img
            src={props.image}
            alt="avatar" />
    </ImageContainer>
)

export default Image