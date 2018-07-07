import deepFreeze from 'deep-freeze';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import app, { category } from './index';
import * as types from '../constants';
import { fetchCategoryTree } from '../actions';

describe('Synchronous Actions', () => {
  describe('> App reducer', () => {
    describe('initialState', () => {
      it('Should return app initialState', () => {
        const input = {};
        const output = {
          isFetching: false,
          errorMessage: '',
          categories: []
        };
        deepFreeze(input);
        expect(
          app(undefined, input)
        ).toEqual(output);
      });
    });
    describe('REQUEST_CATEGORY_TREE', () => {
      it('Should switch isFetching to true', () => {
        const input = {
          isFetching: false,
          errorMessage: '',
          categories: []
        };
        const output = {
          isFetching: true,
          errorMessage: '',
          categories: []
        };
        deepFreeze(input);
        expect(
          app(input, { type: types.REQUEST_CATEGORY_TREE })
        ).toEqual(output);
      });
    });
  });
  describe('> Category reducer', () => {
    describe('RECEIVE_CATEGORY_TREE', () => {
      it('Should map the categories with needed properties', () => {
        const input = {
          "id": 16812,
          "name": "Science",
          "description": null,
          "parent_id": null,
          "depth": 0,
          "node_children_count": 4,
          "tree_children_count": 4,
          "node_video_count": 0,
          "tree_video_count": 0,
          "created_at": "2018-05-21T19:29:05.000Z",
          "updated_at": "2018-05-21T19:36:56.000Z"
        };
        const output = {
          id: 16812,
          name: "Science",
          parent_id: null,
          depth: 0,
          node_children_count: 4,
          node_video_count: 0,
          isClicked: false
        };
        deepFreeze(input);
        expect(
          category(input, { type: types.RECEIVE_CATEGORY_TREE })
        ).toEqual(output);
      });
    });
  });
});

describe('Asynchronous Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  describe('> App reducer', () => {
    describe('RECEIVE_CATEGORY_TREE when fetching has been done', () => {
      it('Should match expectedActions', () => {
        // const url = 'https://vzaar-frontend-test.herokuapp.com';
        const url = 'local.json';

        fetchMock
          .getOnce(url, {
            body: {
              categories: ['list of categories']
            },
            headers: { 'content-type': 'application/json' }
          });


        const expectedActions = [{
          type: types.REQUEST_CATEGORY_TREE
        },
        {
          type: types.RECEIVE_CATEGORY_TREE,
          body: {
            categories: ['list of categories']
          }
        }];
        const store = mockStore({ categories: [] });

        return store.dispatch(fetchCategoryTree()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});