import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import * as lib from '../styles/library';
import Messages from './Messages';

const Div = styled.div`
display: flex; 
flexDirection: column; 
height: 100vh;

* {
  box-sizing: content-box;
}

> div {
  flex: 1 0 50%;
  padding: 20px 0 0 15px;
}

.rst__tree {
  width: 300px;
}

.rstcustom__rowContents {
  box-shadow: none;
  background-color: transparent;
}
`;

export const CategoryTree = (props) => {
  const hasError = props.errorMessage;
  const isFetching = props.isFetching;

  switch (hasError) {
    case '':
      if (isFetching) {
        return <Messages type="loading" />;
      } else {
        return (
          <lib.Container>
            <Div>
              <div>
                <SortableTree
                  getNodeKey={({ node }) => node.id}
                  theme={FileExplorerTheme}
                  treeData={props.categories}
                  onChange={props.updateCategoryTree}
                  rowHeight={45}
                />
              </div>
            </Div>
          </lib.Container>
        );
      }
    default:
      return <Messages type="error" />;
  }
};

CategoryTree.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    parent_id: PropTypes.number,
    title: PropTypes.string.isRequired,
    tree_video_count: PropTypes.number.isRequired,
    isClicked: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired
  }).isRequired).isRequired,
  updateCategoryTree: PropTypes.func.isRequired
};

export default CategoryTree;
