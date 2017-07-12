//import { Map } from 'immutable';

import {
  TEST_ASYNC_ACTION_START,
  TEST_ASYNC_ACTION_ERROR,
  TEST_ASYNC_ACTION_SUCCESS,
  TEST_INITIAL_ACTION_SUCCESS
} from 'actions/app';

const initialState = {
  asyncLoading: false,
  asyncError: null,
  asyncData: null,
  initialData: null
};

const actionsMap = {
  // Async action
  [TEST_ASYNC_ACTION_START]: (state) => {
    return { ...state,
      asyncLoading: true,
      asyncError: null,
    };
  },
  [TEST_ASYNC_ACTION_ERROR]: (state, action) => {
    return { ...state,
      asyncLoading: false,
      asyncError: action.data,
    };
  },
  [TEST_ASYNC_ACTION_SUCCESS]: (state, action) => {
    return { ...state,
      asyncLoading: false,
      asyncData: action.data,
    };
  },
  [TEST_INITIAL_ACTION_SUCCESS] : (state, action) => {
      return {...state,
        asyncLoading:false,
        initialData: action.data
      }
    }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
