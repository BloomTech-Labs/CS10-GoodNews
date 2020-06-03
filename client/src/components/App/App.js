import React, { useReducer } from "react";
import LandingPage from "./LandingPage/LandingPage";
import initialState from "../../utils/initialState";
import globalContext from "../contexts/context";
import NewsFeedHome from "./NewsFeedHome/NewsFeedHome";
import reducer from "../../utils/reducer";
import { useAuth0 } from "../../utils/react-auth0-spa";
export default function App() {
  const [state, dispatch] = useReducer(initialState, reducer);
  const { isAuthenticated } = useAuth0();

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      <div>{isAuthenticated ? <NewsFeedHome /> : <LandingPage />}</div>
    </globalContext.Provider>
  );
}
