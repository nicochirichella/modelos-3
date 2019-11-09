import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import paginationFactory from 'react-bootstrap-table2-paginator';
<link rel="stylesheet" href="node_modules/react-table/react-table.css"></link>

class HoverStripedTable extends React.Component {

  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data} striped hover condensed pagination={paginationFactory()}>
          <TableHeaderColumn dataField='id' width={50} isKey> ID </TableHeaderColumn>
          <TableHeaderColumn dataField='cliente' width={300}>Cliente</TableHeaderColumn>
          <TableHeaderColumn dataField='vencimiento' width={200}>Fecha de vencimiento</TableHeaderColumn>
          <TableHeaderColumn dataField='ultimo_movimiento' width={200}>Ultimo movimiento</TableHeaderColumn>
          <TableHeaderColumn dataField='responsable' width={200}>responsable</TableHeaderColumn>
          <TableHeaderColumn dataField='ganancia' width={100}>Ganancia</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default HoverStripedTable;