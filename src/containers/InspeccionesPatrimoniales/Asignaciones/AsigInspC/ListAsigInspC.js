import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { ColForm, RowForm, FieldContainer, Field, InputForm } from '../../../../components/Util/util.style'
import TableAsigInspC from './TableAsigInspC';
import { messages } from '../../../../util/messages';

const Search = InputForm.Search;

class ListAsigInspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: [],
            status: false
        }
    }
    onSearch = e => {
        const text = e.target.value;
        const newData = this.props.dataSource.filter(res => {
            var nombres = `${res.nombroker} ${res.apepatbroker} ${res.apematbroker}`;
            return nombres.toLowerCase().indexOf(text.toLowerCase()) >= 0;
        });
        if (e === '') {
            this.setState({ status: false });
        } else {
            this.setState({ searchData: newData, status: true });
        }
    };
    render() {
        let data = [];
        const { status, searchData } = this.state;
        const {
            modal,
            dataSource,
            params,
            handleAsignarZona,
            ACTIONDELETECURRENTZONA,
            handleEditAsigCorredorFree,
            handleModalOff
        } = this.props;

        if (status) {
            data = searchData
        } else {
            data = dataSource;
        }

        const pendientes = (
            <div>
                <FieldContainer>
                    <RowForm gutter={16}>
                        <ColForm sm={24} lg={24}>
                            <Field>
                                <Search
                                    placeholder="Buscar Corredor"
                                    onChange={this.onSearch}
                                    style={{ width: 200 }}
                                />
                            </Field>
                        </ColForm>
                    </RowForm>
                    <RowForm>
                        <TableAsigInspC
                            dataSource={data}
                            params={params}
                            handleAsignarZona={handleAsignarZona}
                            ACTIONDELETECURRENTZONA={ACTIONDELETECURRENTZONA}
                            handleEditAsigCorredorFree={handleEditAsigCorredorFree}
                        />
                    </RowForm>
                </FieldContainer>
            </div>
        )

        return (
            <div>
                <Modal
                    title={messages.asiginspectorescorredor.asignarcorredor}
                    visible={modal}
                    width='60%'
                    centered={false}
                    params='view'
                    children={pendientes}
                    onCancel={handleModalOff}
                />
            </div>
        )
    }
}

export default ListAsigInspector;