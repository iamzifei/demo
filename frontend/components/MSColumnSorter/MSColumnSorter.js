import React from 'react';
import orderBy from 'lodash/orderBy';
import * as resolve from 'table-resolver';
import * as Table from 'reactabular-table';
import * as sort from 'sortabular';
import { compose } from 'redux';
import MSColumnHeader from 'MSColumnSorter/MSColumnHeader';

export default class MSColumnSorter extends React.Component {
  constructor(props) {
    super(props);

    // the state management could put into react-redux state tree if having time
    this.state = {
      sortingColumns: this.props.sortingColumns, // reference to the sorting columns
      columns: this.getColumns() // initial columns
    };
  }

  getColumns() {
    const { columns } = this.props;
    const sortable = sort.sort({
      getSortingColumns: () => this.state.sortingColumns || [],
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      },
      strategy: sort.strategies.byProperty
    });

    const sortableHeader = sortHeader(sortable, () => this.state.sortingColumns, columns);

    return columns.map(column => {
      return {
        property: column.property,
        header: {
          label: column.header.label,
          transforms: column.sortable ? [sortable] : [],
          formatters: column.sortable ? [sortableHeader] : [],
          props: {
            style: {
              width: 80
            }
          }
        }
      };
    });
  }
  render() {
    const { rows } = this.props;
    const { columns, sortingColumns } = this.state;
    const sortedRows = compose(
      sort.sorter({ columns, sortingColumns, sort: orderBy, strategy: sort.strategies.byProperty }),
      resolve.resolve({
        columns,
        method: resolve.nested
      })
    )(rows);

    return (
      <div>
        <Table.Provider className="table table-striped table-bordered" columns={columns} style={{ overflowX: 'auto' }}>
          <Table.Header headerRows={resolve.headerRows({ columns })} />
          <Table.Body rows={sortedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

function sortHeader(sortable, getSortingColumns, columns) {
  return (value, { columnIndex }) => {
    const colProperty = columns[columnIndex].property;
    const sortingCols = getSortingColumns() || [];
    return <MSColumnHeader value={value} colProperty={colProperty} sortingCols={sortingCols} sortable={sortable} />;
  };
}
