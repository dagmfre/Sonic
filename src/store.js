import { configureStore } from "@reduxjs/toolkit";
import currentPlayingReducer from "./Components/currentPlayingSlice";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./Components/sagas";

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    currentPlayingSong: currentPlayingReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware),
});

// sagaMiddleware.run(rootSaga);

export default store;