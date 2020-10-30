import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { selectorDateStart } from './recorder.reducer';
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

const CREATE_REQUEST = 'userEvents/crate_request';
interface CreateRequestAction extends Action<typeof CREATE_REQUEST> {}

const CREATE_SUCCESS = 'userEvents/create_success';
interface CreateSuccessAction extends Action<typeof CREATE_SUCCESS> {
  payload: {
    event: IUserEvent;
  };
}

const CREATE_FAILURE = 'userEvents/create_failure';
interface CreateFailureAction extends Action<typeof CREATE_FAILURE> {}

export const createUserEvent = (): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  CreateRequestAction | CreateSuccessAction | CreateFailureAction
> => async (dispatch, getState) => {
  dispatch({
    type: CREATE_REQUEST,
  });

  try {
    const dateStart = selectorDateStart(getState());
    const event: Omit<IUserEvent, 'id'> = {
      title: 'No Name',
      dateStart,
      dateEnd: new Date().toISOString(),
    };
    const response = await fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    const createdEvent: IUserEvent = await response.json();

    dispatch({
      type: CREATE_SUCCESS,
      payload: { event: createdEvent },
    });
  } catch (e) {
    dispatch({
      type: CREATE_FAILURE,
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
  action: LoadSuccessAction | CreateSuccessAction
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

    case CREATE_SUCCESS:
      const { event } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, event.id],
        byIds: { ...state.byIds, [event.id]: event },
      };

    default:
      return state;
  }
};

export default userEventsReducer;
