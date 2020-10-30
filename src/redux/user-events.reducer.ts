import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

export interface IUserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

interface IUserEventState {
  byIds: Record<IUserEvent['id'], IUserEvent>;
  allIds: IUserEvent['id'][];
}

const LOAD_REQUEST = 'userEvents/load_request';

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

const LOAD_SUCCESS = 'userEvents/load_success';

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
  payload: {
    events: IUserEvent[];
  };
}

const LOAD_ERROR = 'userEvents/load_error';

interface LoadErrorAction extends Action<typeof LOAD_ERROR> {
  error: string;
}

export const loadUserEvents = (): ThunkAction<
  void,
  RootState,
  undefined,
  LoadRequestAction | LoadSuccessAction | LoadErrorAction
> => async (dispatch, getState) => {
  dispatch({
    type: LOAD_REQUEST,
  });

  try {
    const response = await fetch('http://localhost:3001/events');
    const events: IUserEvent[] = await response.json();
    dispatch({
      type: LOAD_SUCCESS,
      payload: { events },
    });
  } catch (e) {
    dispatch({
      type: LOAD_ERROR,
      error: 'Failed to dispatch',
    });
  }
};

const selectUserEventsState = (rootState: RootState) => rootState.userEvents;

export const selectUserEventsArray = (rootState: RootState) => {
  const state = selectUserEventsState(rootState);
  return state.allIds.map((id) => state.byIds[id]);
};

const initState: IUserEventState = {
  byIds: {},
  allIds: [],
};

const userEventsReducer = (
  state: IUserEventState = initState,
  action: LoadSuccessAction
) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      const { events } = action.payload;
      return {
        ...state,
        allIds: events.map(({ id }) => id),
        byIds: events.reduce<IUserEventState['byIds']>((byIds, event) => {
          byIds[event.id] = event;
          return byIds;
        }, {}),
      };
    default:
      return state;
  }
};

export default userEventsReducer;
