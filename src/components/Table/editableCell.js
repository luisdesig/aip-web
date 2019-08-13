import React, { Component } from 'react';
import { InputNumberForm } from '../Util/util.style';

export default class extends Component {
    state = {
        id: this.props.id
    };
    handleChange = event=> {
        const prioridad = event;
        this.props.onCellChange(this.state.id,prioridad)
    };
    render() {
        const { idpactivo, prioridad, params } = this.props;
            return (
                <div className="isoEditData">
                    {(idpactivo === '9' || idpactivo === 9) ? (
                        <div style={{width: '50%'}}>
                            <InputNumberForm
                                min={1}
                                value={prioridad}
                                onChange={this.handleChange}
                                onBlur={this.props.onFocus}
                                disabled={params === undefined || params === 'asignar' ? true: false}
                            />
                        </div>
                    ) : (
                            <p className="isoDataWrapper">
                                {prioridad}
                            </p>
                        )}
                </div>
            );
    }
}
