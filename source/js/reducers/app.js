import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_ERROR,
  ASYNC_ACTION_SUCCESS,
  INITIAL_ACTION_SUCCESS,
  FETCH_FORM_PARAMETERS,
  QUICK_SEARCH,
} from 'actions/app';

const initialState = {
  asyncLoading: false,
  asyncError: null,
  asyncData: null,
  initialData: null,
  formParameters: null,
  quickSearch: null,
};

const actionsMap = {
  // Async action
  [ASYNC_ACTION_START]: (state) => {
    return { ...state,
      asyncLoading: true,
      asyncError: null,
    };
  },
  [ASYNC_ACTION_ERROR]: (state, action) => {
    return { ...state,
      asyncLoading: false,
      asyncError: action.data,
    };
  },
  [ASYNC_ACTION_SUCCESS]: (state, action) => {
    return { ...state,
      asyncLoading: false,
      asyncData: action.data,
    };
  },
  [INITIAL_ACTION_SUCCESS]: (state, action) => {
    return { ...state,
      asyncLoading: false,
      initialData: action.data,
    };
  },
  [FETCH_FORM_PARAMETERS]: (state, action) => {
    return { ...state,
      asyncLoading: false,
      formParameters: action.data,
    };
  },
  [QUICK_SEARCH]: (state, action) => {
    return { ...state,
      asyncLoading: false,
      quickSearch: action.data,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
