import React, { Component } from 'react';
import 'sash-layout';
import '../styles/global';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategoryTree } from '../actions';
import CategoryTree from './CategoryTree';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategoryTree());
  }
  render() {
    return (
      <div>
        <CategoryTree />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(fetchCategoryTree, dispatch)
});

export default connect(mapDispatchToProps)(App);
