import * as types from '../constants';
import { nestCategoryChildren } from '../utils';

const initialState = () => ({
  isFetching: false,
  errorMessage: '',
  categories: []
});

function app(state = initialState(), action) {
  switch (action.type) {
    case types.REQUEST_CATEGORY_TREE:
      return {
        ...state,
        isFetching: true
      };
    case types.RECEIVE_CATEGORY_TREE:
      return {
        ...state,
        isFetching: false,
        categories: nestCategoryChildren(action.body.data.map(item => category(item, action)), [])
      };
    case types.HTTP_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}

export function category(state, action) {
  switch (action.type) {
    case types.RECEIVE_CATEGORY_TREE:
      return {
        id: state.id,
        name: state.name,
        parent_id: state.parent_id,
        depth: state.depth,
        node_children_count: state.node_children_count,
        node_video_count: state.node_video_count,
        isClicked: state.node_children_count ? false : null
      };
    default:
      return state;
  }
}

export default app;
