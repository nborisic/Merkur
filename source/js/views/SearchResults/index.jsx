import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreviewComponent from '../../components/previewcomponent';
import { fetchResults, quickSearch, fetchFormParameters } from '../../actions/app';
import ControledForm from '../../components/form';


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
    asyncError: PropTypes.object,
    formParameters: PropTypes.object,
    asyncLoading: PropTypes.bool,
    params: PropTypes.object,
    dispatch: PropTypes.func,
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    let searchTerm = '';
    const { dispatch } = this.props;
    if (!this.props.formParameters) dispatch(fetchFormParameters());
    if (Object.keys(this.props.params).some((el) => el === 'Category')) {
      dispatch(fetchResults(this.props.params));
      console.log('poslao po asinc');
    } else {
      searchTerm = this.props.params[Object.keys(this.props.params)[0]];
      // Object.values(this.props.params)[0] radi isto, ali ga IE ne podrzava
      // for (const key in this.props.params) {
      //  searchTerm = this.props.params[key];
      // }
      dispatch(quickSearch(searchTerm));
      console.log('poslao po quick');
    }
    console.log('component did mount');
  }


  render() {
console.log('render');
    const {
      asyncData,
      quickSearchData,
      formParameters,
    } = this.props;
    const data = Object.keys(this.props.params).length === 1 ? quickSearchData : asyncData;
    if (!data) return (<p>Učitava se stranica...</p>);
    if (data.items.length === 0) return (<div> <p>Nema rezultata za ovu pretragu</p></div>);

    return (
      <div>
        <h2>SearchResults page</h2>
        <div className='col col-sm-9'>
          <PreviewComponent url={ this.props.params } data={ data } />
        </div>
        <div className='col col-sm-3'>
          <ControledForm data={ formParameters } />
        </div>
      </div>
    );
  }
}
