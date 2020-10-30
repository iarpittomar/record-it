import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import recorderReducer from './recorder.reducer';
import userEventsReducer from './user-events.reducer';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
