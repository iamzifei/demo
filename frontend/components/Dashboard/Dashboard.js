import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

import { getRoutePath } from 'CommonUtil/CommonUtil.js';

import MSColumnSorter from 'MSColumnSorter/MSColumnSorter';

const columns = [
  {
    property: 'id',
    header: {
      label: 'id'
    },
    sortable: false
  },
  {
    property: 'name',
    header: {
      label: 'name'
    },
    sortable: true
  },
  {
    property: 'family',
    header: {
      label: 'family'
    },
    sortable: true
  },
  {
    property: 'city',
    header: {
      label: 'city'
    },
    sortable: true
  },
  {
    property: 'score',
    header: {
      label: 'score'
    },
    sortable: true
  }
];

const sortingColumns = {
  name: {
    direction: 'asc',
    position: 0
  }
};

const rows = [
  {
    id: 1,
    name: 'jack',
    family: 'hanson',
    city: 'sydney',
    score: 100
  },
  {
    id: 2,
    name: 'peter',
    family: 'street',
    city: 'melbourne',
    score: 200
  },
  {
    id: 3,
    name: 'joe',
    family: 'larson',
    city: 'brisbane',
    score: 300
  },
  {
    id: 4,
    name: 'simon',
    family: 'long',
    city: 'perth',
    score: 400
  },
  {
    id: 5,
    name: 'abraham',
    family: 'blue',
    city: 'darwin',
    score: 500
  }
];
export class Dashboard extends React.Component {
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={() => this.context.router.push(getRoutePath('sample'))}>Go to sample page</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <p style={{ marginTop: 32 }}>Place your sample below this line (Dashboard/Dashboard.js):</p>
        <hr style={{ border: '1px solid black' }} />
        <MSColumnSorter columns={columns} sortingColumns={sortingColumns} rows={rows} />
      </div>
    );
  }
}

// latest way to dispatch
Dashboard.contextTypes = {
  // @see https://github.com/grommet/grommet/issues/441
  router: React.PropTypes.object.isRequired
};

export default connect(function(storeState) {
  // store state to props
  return {};
})(Dashboard);
