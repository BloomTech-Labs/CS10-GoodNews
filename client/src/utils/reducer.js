import initialState from './initialState'
 export default function reducer(action, state = initialState){
    switch(action.type){
        default:
            return {...state}
    }
}

