import React from 'react';
import { ColForm, RowForm } from '../Util/util.style';
import { ProgressContainer } from './progress.style';

const Progress = (props) => (
    <ProgressContainer>
        <RowForm>
            <ColForm lg={4} style={{textAlign: "-webkit-center" }}>
                <div className='color' style={{ background: props.color}}>
            </div>
            </ColForm>
            <ColForm lg={10} style={{textAlign: 'left'}}>{props.name}</ColForm>
            <ColForm lg={10}>{props.value}</ColForm>
        </RowForm>
    </ProgressContainer>
)

export default Progress
