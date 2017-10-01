import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreviewComponent from '../../components/previewcomponent';
import SingleResult from '../../components/single_result';
import { initialResults, fetchResults, quickSearch, fetchFormParameters } from '../../actions/app';
import ControledForm from '../../components/form';


const style = {
  sm: 'col-sm-12',
  xs: 'col-xs-6',
};
@connect(state => ({
  initialData: state.app.initialData,
  asyncData: state.app.asyncData,
  asyncError: state.app.asyncError,
  asyncLoading: state.app.asyncLoading,
  quickSearchData: state.app.quickSearch,
  formParameters: state.app.formParameters,
}))
export default class DetailView extends Component {
  static propTypes = {
    initialData: PropTypes.object,
    asyncData: PropTypes.object,
    quickSearchData: PropTypes.object,
    formParameters: PropTypes.object,
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
    if (!this.props.formParameters) dispatch(fetchFormParameters());
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
  componentDidMount() {
    window.scrollTo(0, 0);
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
  componentDidUpdate() {
    $("body, html").animate({scrollTop: 0}, 'slow');
  }
  render() {
    if (!this.state.data) {
      return (<div> <p>Učitava se stranica...</p></div>);
    }
    const {
      formParameters,
    } = this.props;
    return (
      <div id='detail' className='container'>
        <div className='col col-sm-9' >
          <SingleResult url={ this.props.params } data={ this.state.data } />
        </div>
        <div className='col col-sm-3'>
          <ControledForm data={ formParameters } style={ style } />
        </div>
        <PreviewComponent url={ this.props.params } data={ this.state.data } />
      </div>
    );
  }
}
