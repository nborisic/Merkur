import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreviewComponent from '../../components/previewcomponent';
import SingleResult from '../../components/single_result';
import { initialResults, fetchResults, quickSearch } from '../../actions/app';

@connect(state => ({
  initialData: state.app.initialData,
  asyncData: state.app.asyncData,
  asyncError: state.app.asyncError,
  asyncLoading: state.app.asyncLoading,
  quickSearchData: state.app.quickSearch,
}))
export default class DetailView extends Component {
  static propTypes = {
    initialData: PropTypes.object,
    asyncData: PropTypes.object,
    asyncError: PropTypes.object,
    quickSearchData: PropTypes.object,
    asyncLoading: PropTypes.bool,
    params: PropTypes.object,
    dispatch: PropTypes.func,
  }
  constructor() {
    super();

    this.state = {
      data: {},
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const {
      asyncData,
      initialData,
      quickSearchData,
    } = this.props;
    switch (Object.keys(this.props.params)[0]) {
      case 'id': {
        if (!this.props.initialData) dispatch(initialResults());
        this.setState({ data: initialData });
        break;
      }
      case 'quickParameter': {
        let searchTerm = '';
        if (!this.props.quickSearchData) {
          searchTerm = this.props.params[Object.keys(this.props.params)[0]];
          if (!this.props.quickSearchData) {
            dispatch(quickSearch(searchTerm));
          }
        }
        this.setState({ data: quickSearchData });
        break;
      }
      default: {
        if (!this.props.asyncData) dispatch(fetchResults(this.props.params));
        this.setState({ data: asyncData });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    switch (Object.keys(this.props.params)[0]) {
      case 'id': {
        this.setState({ data: nextProps.initialData });
        break;
      }
      case 'quickParameter': {
        this.setState({ data: nextProps.quickSearchData });
        break;
      }
      default: {
        this.setState({ data: nextProps.asyncData });
      }
    }
  }

  render() {
    if (!this.state.data) {
      return (<div> <p>Učitava se stranica...</p></div>);
    }
    return (
      <div>
        <SingleResult url={ this.props.params } data={ this.state.data } />
        <div className='col-sm-12'>
          <PreviewComponent url={ this.props.params } data={ this.state.data } />
        </div>
      </div>
    );
  }
}
