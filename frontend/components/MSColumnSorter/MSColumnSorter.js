import React from 'react';
import orderBy from 'lodash/orderBy';
import * as resolve from 'table-resolver';
import * as Table from 'reactabular-table';
import * as sort from 'sortabular';
import { compose } from 'redux';

import MSGlyphicon from 'MSGlyphicon/MSGlyphicon';

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
    let className = 'sort';
    if (sortingCols[colProperty] && sortingCols[colProperty].direction === 'asc') {
      className = 'sort-asc';
    } else if (sortingCols[colProperty] && sortingCols[colProperty].direction === 'desc') {
      className = 'sort-desc';
    }
    return (
      <div style={{ display: 'inline' }}>
        <span className="value">{value}</span>
        {React.createElement(
          MSGlyphicon,
          sortable(
            value,
            {
              colProperty
            },
            {
              style: { float: 'right' },
              glyph: className
            }
          )
        )}
        {sortingCols[colProperty] && (
          <span className="sort-order" style={{ marginLeft: '0.5em', float: 'right' }}>
            {sortingCols[colProperty].position + 1}
          </span>
        )}
      </div>
    );
  };
}
