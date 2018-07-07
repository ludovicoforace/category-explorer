import { connect } from 'react-redux';
import { updateCategoryTree } from '../actions';
import CategoryTree from '../components/CategoryTree';

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  errorMessage: state.errorMessage,
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  updateCategoryTree: (tree) => {
    dispatch(updateCategoryTree(tree));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTree);
