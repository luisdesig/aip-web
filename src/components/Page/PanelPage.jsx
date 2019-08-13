import React from 'react';
import { PanelContainer } from './page.style';
const PagePanel = (props) => {
    return (
        <PanelContainer className='panel'>
            <div className='panel-title'>
                {props.titulo}
            </div>
            {props.children}
        </PanelContainer>
    )
}
export default PagePanel;