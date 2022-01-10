import { configureStore } from "@reduxjs/toolkit";
import datasetSearch from "./datasetSearchSlice";
import granuleSearch from "./granuleSearchSlice";
import pendingJob from "./pendingJobSlice";
import variables from "./variablesSlice";
import jobHistory from "./jobHistorySlice";
import modals from "./modalsSlice";

export function createStore(thunkExtraArgument = {}) {
  return configureStore({
    reducer: {
      datasetSearch,
      granuleSearch,
      pendingJob,
      variables,
      jobHistory,
      modals,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: thunkExtraArgument,
        },
      }),
  });
}
