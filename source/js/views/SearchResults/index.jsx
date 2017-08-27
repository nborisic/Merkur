import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PreviewComponent from '../../components/previewcomponent';
import { fetchResults, quickSearch, fetchFormParameters } from '../../actions/app';
import ControledForm from '../../components/form';


const style = {
  sm: 'col-sm-12',
  xs: 'col-xs-6',
};

@connect(state => ({
  asyncData: state.app.asyncData,
  quickSearchData: state.app.quickSearch,
  asyncError: state.app.asyncError,
  asyncLoading: state.app.asyncLoading,
  formParameters: state.app.formParameters,
}))
export default class SearchResults extends Component {
  static propTypes = {
    asyncData: PropTypes.object,
    quickSearchData: PropTypes.object,
    formParameters: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func,
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    let searchTerm = '';
    const { dispatch } = this.props;
    if (!this.props.formParameters) dispatch(fetchFormParameters());
    if (Object.keys(this.props.params).some((el) => el === 'category')) {
      dispatch(fetchResults(this.props.params));
    } else {
      searchTerm = this.props.params[Object.keys(this.props.params)[0]];
      dispatch(quickSearch(searchTerm));
    }
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(Object.values(this.props.params), Object.values(nextProps.params))) {
      const { dispatch } = this.props;
      dispatch(fetchResults(nextProps.params));
    }
  }

  render() {
    const {
      asyncData,
      quickSearchData,
      formParameters,
    } = this.props;
    const data = Object.keys(this.props.params).length === 1 ? quickSearchData : asyncData;
    if (!data) return (<p>Učitava se stranica...</p>);
    if (data.items.length === 0) return (<div> <p>Nema rezultata za ovu pretragu</p></div>);
    return (
      <div id='searchResults' className='container'>
        <div className='col col-sm-9'>
          <PreviewComponent url={ this.props.params } data={ data } />
        </div>
        <div className='col col-sm-3'>
          <ControledForm data={ formParameters } style={ style } />
        </div>
      </div>
    );
  }
}
