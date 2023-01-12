// import { Action, ActionWithPayload, StateActions } from '../models';
// import { DbFlag, Flag, Flags } from '../schemas';
// import { logger } from '../server';
// import { store, updateSetOfFlags } from '../state';

// export type PromisedResult<Payload = unknown, ErrorType = Error> = Promise<Result<Payload, ErrorType>>;

// export type DbProviderFunction<Payload = AnyValue> = (action: ActionWithPayload<Payload>) => PromisedResult;

// const DB_PROVIDER_MAP = new Map<StateActions, DbProviderFunction>();

// DB_PROVIDER_MAP.set(StateActions.ADD_ONE, async (action: ActionWithPayload<Flag>) => {
//   try {
//     await DbFlag.create(action.payload);
//     return success(true);
//   } catch (err) {
//     return failure(err as Error);
//   }
// });

// DB_PROVIDER_MAP.set(StateActions.UPDATE_BY_ID, async (action: ActionWithPayload<Flag>) => {
//   try {
//     const { flagId, value } = action.payload;

//     await DbFlag.updateOne({ flagId }, { value });
//     return success(true);
//   } catch (err) {
//     return failure(err as Error);
//   }
// });

// DB_PROVIDER_MAP.set(StateActions.UPDATE_SET, async (action: ActionWithPayload<Flags>) => {
//   let result = true;

//   const errors: string[] = [];

//   for await (const item of action.payload) {
//     const { flagId, value } = item;

//     try {
//       const result = await DbFlag.updateOne({ flagId }, { value });

//       if (!result.modifiedCount) throw new Error(`Key ${flagId} was not updated`);
//     } catch (err) {
//       result = false;
//       errors.push('message' in (err as Error) ? (err as Error)['message'] : `Unknown error updating flagId ${flagId}`);
//     }
//   }

//   if (result) return success(`Successfully update ${action.payload.length} keys.`);

//   return failure(errors.join('. '));
// });

// async function callProviderFn<Payload = void>(action: Action<Payload>): PromisedResult {
//   const fn = DB_PROVIDER_MAP.get(action.type);

//   if (fn) return await fn(action as ActionWithPayload<Payload>);
//   else return failure(`Unable to find the function for ${action.type}`);
// }

// export async function dbProvider<Payload = void>(action: Action<Payload>) {
//   const result = await callProviderFn(action);

//   if (result.isOK) logger.info(result, `dbProvider >> ${action.type}`);
//   else logger.error(result, `dbProvider >> ${action.type}`);
// }

// export async function reStore(): PromisedResult<boolean> {
//   const storeFromDb = await DbFlag.find({});

//   const newStore = reduce((acc, elem) => append(elem, acc), [] as Flags, storeFromDb);

//   store.dispatch(updateSetOfFlags(newStore));
//   return success(true);
// }

export const dbProvider = '';
