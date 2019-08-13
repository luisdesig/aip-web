import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { ColForm, RowForm, FieldContainer, Field, InputForm } from '../../../../components/Util/util.style'
import TableZona from './TableZona';

const Search = InputForm.Search;

class ListZona extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: [],
            status: false
        }
    }
    async componentDidMount(){
        await this.props.STARTACTIONZONASFREE();
    }
    onSearch = e => {
        const text = e.target.value;
        const newData = this.props.dataSource.filter(res => {
            var nombres = `${res.pais.nombre} ${res.departamento.nombre} ${res.provincia.nombre} ${res.distrito.nombre}`;
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
                                    placeholder="Buscar lugar"
                                    onChange={this.onSearch}
                                    style={{ width: 200 }}
                                />
                            </Field>
                        </ColForm>
                    </RowForm>
                    <RowForm>
                        <TableZona
                            dataSource={data}
                            params={params}
                            handleAsignarZona={handleAsignarZona}
                            ACTIONDELETECURRENTZONA={ACTIONDELETECURRENTZONA}
                        />
                    </RowForm>
                </FieldContainer>
            </div>
        )
        return (
            <FieldContainer>
                <Modal
                    title='Datos de las zonas pendientes de asignar'
                    visible={modal}
                    width='60%'
                    centered={false}
                    params='view'
                    children={pendientes}
                    onCancel={handleModalOff}
                />
            </FieldContainer>
        )
    }
}

export default ListZona;