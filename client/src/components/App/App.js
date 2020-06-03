import React, { useReducer } from "react";
import LandingPage from "./LandingPage/LandingPage";
import initialState from "../../utils/initialState";
import globalContext from "../contexts/context";
import NewsFeedHome from "./NewsFeedHome/NewsFeedHome";
import reducer from "../../utils/reducer";
export default function App() {
  const [state, dispatch] = useReducer(initialState, reducer);
  const visited = localStorage.getItem("visited")
  return (
    <globalContext.Provider value={{ state, dispatch }}>
      <div>{visited ? <NewsFeedHome /> : <LandingPage />}</div>
    </globalContext.Provider>
  );
}
