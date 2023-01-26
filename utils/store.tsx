import { RandomImage } from "@/lib/sanity.query";
import React, { useContext, useMemo, useReducer } from "react";
import produce from "immer";

export interface AppState {
  isViewerOpen: boolean;
  viewerMainImage: RandomImage | null;
}

const initialState: AppState = {
  isViewerOpen: false,
  viewerMainImage: null,
};

function reducer(state: AppState, update: (state: AppState) => void) {
  // console.log(produce(state, update));
  return produce(state, update);
}

const AppStateContext = React.createContext<AppState | null>(null);

const AppDispatchContext = React.createContext<React.Dispatch<
  (state: AppState) => void
> | null>(null);

type Props = {
  children: React.ReactNode;
};

export function AppContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateContextValue = useMemo(() => state, [state]);
  const dispatchContextValue = useMemo(() => dispatch, [dispatch]);

  return (
    <AppStateContext.Provider value={stateContextValue}>
      <AppDispatchContext.Provider value={dispatchContextValue}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const state = useContext(AppStateContext);

  if (!state) {
    throw new Error("useAppState must be used within a AppContextProvider");
  }

  return state;
}

export function useAppDispatch() {
  const dispatch = useContext(AppDispatchContext);

  if (!dispatch) {
    throw new Error("useAppDispatch must be used within a AppContextProvider");
  }

  return dispatch;
}
