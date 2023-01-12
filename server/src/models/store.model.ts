export enum StateActions {
  UPDATE_BY_ID = 'update_by_id',
  UPDATE_SET = 'update_set',
  ADD_ONE = 'add_one',
  RESET_STORE = 'reset_store',
}

export interface ActionWithPayload<T = unknown> {
  type: StateActions;
  payload: T;
}

export interface ActionWithoutPayload {
  type: StateActions;
}

export type Action<T = void> = T extends void ? ActionWithoutPayload : ActionWithPayload<T>;

export type State = RecordObject;

export type ReducerFunction<Payload = AnyValue> =
  | ((state: State, action: ActionWithPayload<Payload>) => State)
  | ((state: State, action: ActionWithoutPayload) => State);
