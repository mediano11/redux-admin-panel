import { createReducer } from "@reduxjs/toolkit"
import { heroesFetched, heroesFetching, heroesFetchingError, heroCreated, heroDeleted } from "../actions";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, {
    [heroesFetching]: (state) => {
      state.heroesLoadingStatus = 'loading'
    },
    [heroesFetchingError]: (state) => {
      state.heroesLoadingStatus = 'error'
    },  
    [heroesFetched]: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload
    },
    [heroCreated]: (state, action) => {
      state.heores = state.heroes.push(action.payload)
    },
    [heroDeleted]: (state, action) => {
      state.heroes = state.heroes.filter(item=>item.id !== action.payload);
    },
  },
  [],
  state=>state
)
// const heroes = createReducer(initialState, (builder) => {
//   builder
//     .addCase(heroesFetching, (state) => {
//       state.heroesLoadingStatus = 'loading'
//     })
//     .addCase(heroesFetched, (state, action) => {
//       state.heroesLoadingStatus = 'idle'
//       state.heroes = action.payload
//     })
//     .addCase(heroesFetchingError, (state) => {
//       state.heroesLoadingStatus = 'error'
//     })
//     .addCase(heroCreated, (state, action) => {
//       state.heroes = state.heroes.push(action.payload)
//     })
//     .addCase(heroDeleted, (state, action) => {
//       state.heroes = state.heroes.filter(item=>item.id !== action.payload);
//     })
//     .addDefaultCase(()=>{})
// })

export default heroes;