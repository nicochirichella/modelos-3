import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class HoverStripedTable extends React.Component {
    render() {
      return (
        <BootstrapTable data={this.props.data} striped hover condensed>
            <TableHeaderColumn dataField='id' isKey> ID </TableHeaderColumn>
            <TableHeaderColumn dataField='cliente'>Cliente</TableHeaderColumn>
            <TableHeaderColumn dataField='ganancia'>Ganancia</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }

export default HoverStripedTable;