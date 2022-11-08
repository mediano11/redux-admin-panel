const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    filteredHeroes: [],
    activeFilter:"all"
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading'
      }
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle'
      }
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error'
      }
    case "HERO_CREATED":
      let newHero = [...state.heroes, action.payload]
      return {
        ...state,
        heroes: newHero
      }
    case "HERO_DELETED":
      let delHero = state.heroes.filter(item=>item.id !== action.payload);
      return {
        ...state,
        heroes: delHero
      }
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading'
      }
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle'
      }
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error'
      }  
    default: 
      return state
  }
}

export default reducer;