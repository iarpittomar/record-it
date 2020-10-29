import { AnyAction } from "redux";

interface UserEvent{
    id: number;
    title: string;
    dateStart: string;
    dateEnd: string;
}

interface UserEventState {
    byIds: Record<UserEvent['id'], UserEvent>
    allIds: UserEvent['id'][];
}

const initState: UserEventState = {
    byIds: {},
    allIds: [],
}

const userEventsReducer = (state: UserEventState = initState, action: AnyAction) => {
    switch(action.type) {
        default: 
        return state;
    }
};

export default userEventsReducer;