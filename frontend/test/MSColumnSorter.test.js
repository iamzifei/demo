import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import rootReducer from 'Global/RootReducer.js';
import { validatorRequired, validatorAlphaNumeric } from 'CommonUtil/CommonUtil.js';
import { LocalForm } from 'react-redux-form';
import MSColumnSorter from 'MSColumnSorter/MSColumnSorter';

const store = createStore(
  combineReducers({
    app: rootReducer,
    routing: routerReducer
  }),
  {}, // initial state
  applyMiddleware(thunk)
);

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

describe('Test MSColumnSorter', function() {
  before(function() {});

  it('MSColumnSorter is rendered properly', function() {
    const table = mount(
      <Provider store={store}>
        <MSColumnSorter
          columns={columns}
          sortingColumns={sortingColumns}
          rows={rows}
        />
      </Provider>
    );
    // check if there 4 sortable column
    expect(table.find('th.sort')).to.have.length(4);
  });
});
