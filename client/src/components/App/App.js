import React,{useReducer} from 'react'
import LandingPage from './LandingPage/LandingPage'
import initialState from '../../utils/initialState'
import globalContext from '../contexts/context'
import NewsFeedHome from './NewsFeedHome/NewsFeedHome'
import reducer from '../../utils/reducer'
export default function App() {

  const [state,dispatch] = useReducer(initialState,reducer)

  return (
    <globalContext.Provider value={{state,dispatch}}>
      <div>
      {state.isAuthenticated ? <NewsFeedHome />: <LandingPage />}
      </div>
    </globalContext.Provider>

  )
}

