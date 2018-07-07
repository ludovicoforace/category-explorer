import * as types from '../constants';

const requestCategoryTree = () => ({
  type: types.REQUEST_CATEGORY_TREE
});

const receiveCategoryTree = (body) => ({
  type: types.RECEIVE_CATEGORY_TREE,
  body: body
});

const httpError = (error) => ({
  type: types.HTTP_ERROR,
  errorMessage: error
});

export const fetchCategoryTree = () => (dispatch) => {
  dispatch(requestCategoryTree());
  // const url = 'https://vzaar-frontend-test.herokuapp.com';
  const url = 'local.json';
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(`${response.status} - "${url}, ${response.statusText}"`);
      } else {
        return response.json();
      }
    })
    .then(json => {
      dispatch(receiveCategoryTree(json));
    })
    .catch(error => {
      dispatch(httpError(error));
    });
};
