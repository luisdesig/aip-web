import React from 'react';
import { TableWrapper } from './Table.style';
import ReactDragListView from 'react-drag-listview';


export default class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            columns : this.props.columns
        }

        const that = this;
        this.dragProps = {
            onDragEnd(fromIndex, toIndex) {
                const columns = that.state.columns;
                const item = columns.splice(fromIndex, 1)[0];
                columns.splice(toIndex, 0, item);
                that.setState({
                    columns
                });
            },
            nodeSelector: "th"
        };
    }
    render(){
        const { columns } = this.state;
        const { dataSource, title, scroll, rowKey, rowSelection, pageSize, loading } = this.props;
        return(
            <ReactDragListView.DragColumn {...this.dragProps}>
                <TableWrapper
                    rowKey={rowKey}
                    rowSelection={rowSelection}
                    title={() => title}
                    scroll={scroll}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={dataSource.length < 4 ? false : {pageSize: pageSize}}
                    bordered
                    size='small'
                    loading={loading}
            />
            </ReactDragListView.DragColumn>
        )
    }
}