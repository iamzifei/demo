import React from 'react';
import MSGlyphicon from 'MSGlyphicon/MSGlyphicon';

export default class MSColumnHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNumber: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      displayNumber: e.shiftKey
    });
  }

  render() {
    const { value, sortingCols, colProperty, sortable } = this.props;
    let className = 'sort';
    if (sortingCols[colProperty] && sortingCols[colProperty].direction === 'asc') {
      className = 'sort-asc';
    } else if (sortingCols[colProperty] && sortingCols[colProperty].direction === 'desc') {
      className = 'sort-desc';
    }
    return (
      <div style={{ display: 'block', width: '100%' }} onClick={this.handleClick}>
        <span className="value">{value}</span>
        {sortingCols[colProperty] &&
          this.state.displayNumber && <span style={{ color: 'orange' }}>{sortingCols[colProperty].position + 1}</span>}
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
      </div>
    );
  }
}
