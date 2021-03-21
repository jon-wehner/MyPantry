const SET_ITEMS = 'items/setItems'
const SET_RESULTS = 'items/setResults'
const SET_CATEGORIES = 'items/setCategories'

const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items
  }
}
const setResults = (items) => {
  return {
    type: SET_RESULTS,
    items
  }
}
const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories
  }
}
export const loadItems = () => async (dispatch) => {
  const res = await fetch('/api/items/');
  if (res.ok) {
    const items = await res.json();
    dispatch(setItems(items));
  }
};

export const loadCategories = () => async (dispatch) => {
  const res = await fetch('/api/items/categories/');
  if (res.ok) {
    const categories = await res.json();
    dispatch(setCategories(categories))
  }
}

export const searchItems = (query) => async (dispatch) => {
  const options = {
    method: 'PUT',
    body: query
  }
  try {
    const res = await fetch('/api/items/', options)
    console.log(res)
    if (!res.ok) throw res
    const items = await res.json()
    dispatch(setResults(items))
    return items
  }
  catch (err) {
    return err
  }
}
const initialState = {
                      list: null,
                      categories: null,
                      results: null,
                    }
const itemReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ITEMS:
      newState = {...state};
      newState.list = action.items
      return newState
    case SET_RESULTS:
      newState= {...state};
      newState.results = {...action.results};
      return newState;
    case SET_CATEGORIES:
      newState = {...state};
      newState.categories = action.categories;
      return newState;
    default:
      return state;
  }
};
export default itemReducer;
