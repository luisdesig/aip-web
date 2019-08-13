import React from 'react';
import { TitleContainer } from './page.style';
const PageTitle = (props) => {
    return (
        <TitleContainer>{props.titulo}</TitleContainer>
    )
}
export default PageTitle;