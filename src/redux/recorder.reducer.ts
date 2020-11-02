import { type } from 'os';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

interface RecorderState {
  dateStart: string;
  count: number;
}

const START = 'recorder/start';
const STOP = 'recorder/stop';
const PAUSE = 'recorder/pause';

type StartAction = Action<typeof START>;
type StopAction = Action<typeof STOP>;

export const start = (): StartAction => ({
  type: START,
});

export const stop = (): StopAction => ({
  type: STOP,
});

interface PauseAction extends Action<typeof PAUSE> {
  payload: {
    count: number;
  };
}

export const pause = (count: number): PauseAction => ({
  type: PAUSE,
  payload: {
    count: count,
  },
});

export const selectRecorderState = (rootState: RootState) => rootState.recorder;

export const selectorDateStart = (rootState: RootState) =>
  selectRecorderState(rootState).dateStart;

export const selectorCount = (rootState: RootState) =>
  selectRecorderState(rootState).count;

const initState: RecorderState = {
  dateStart: '',
  count: 0,
};

const recorderReducer = (
  state: RecorderState = initState,
  action: StartAction | StopAction | PauseAction
) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        dateStart: new Date().toISOString(),
        count: 0,
      };

    case STOP:
      return { ...state, dateStart: '', count: 0 };

    case PAUSE:
      console.log({ ...state });
      return { ...state, dateStart: '', count: action.payload.count };

    default:
      return state;
  }
};

export default recorderReducer;
