import { useCallback, useReducer } from 'react';

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
const RESET = 'RESET';

const initState = {
  error: null,
  isLoading: false,
  payload: null,
};

function reducer(state, action) {
  switch (action.type) {
    case PENDING:
      return {
        ...state, isLoading: true,
      };
    case FULFILLED:
      return {
        isLoading: false, payload: action.payload, error: null,
      };
    case REJECTED:
      return {
        isLoading: false, error: action.payload, payload: null,
      };
    case RESET:
      return initState;
    default:
      return state;
  }
}

export default function useRequest(fetchFunc) {
  const [state, dispatch] = useReducer(reducer, initState);

  const fetch = useCallback((...args) => {
    dispatch({
      type: PENDING,
    });

    return fetchFunc(...args)
      .then(payload => dispatch({ type: FULFILLED, payload }))
      .catch(payload => dispatch({ type: FULFILLED, payload }));

  }, [dispatch, fetchFunc]);

  const reset = useCallback(() => {
    dispatch({ type: RESET });
  }, [dispatch])

  return {
    state,
    fetch,
    reset,
  };
}
