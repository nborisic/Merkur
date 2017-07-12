import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchResults} from '../../actions/app';
import _ from 'lodash';
import PreviewComponent from '../../components/previewcomponent';
import SingleResult from '../../components/single_result';
import { initialResults } from '../../actions/app'; 

@connect(state => ({
	initialData: state.app.initialData,
 	 asyncData: state.app.asyncData,
 	 asyncError: state.app.asyncError,
 	 asyncLoading: state.app.asyncLoading,
}))
export default class DetailView extends Component {
	 static propTypes = {
    asyncData: PropTypes.object,
    asyncError: PropTypes.object,
    asyncLoading: PropTypes.bool,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  componentWillMount(){
  	const { dispatch } = this.props;
  	if(Object.keys(this.props.params).length==1){
  	  	if(!this.props.initialData) dispatch(initialResults());
  	  	}
  	else {
  		if(!this.props.asyncData) dispatch(fetchResults(this.props.params));
  	}
  }

	render (){
		const {
	      asyncData,
	      asyncError,
	      asyncLoading,
	      initialData
    	} = this.props;
    	if( !asyncData && !initialData ) return (<div> <p>Učitava se stranica...</p></div>);
    	const data =Object.keys(this.props.params).length==1?initialData:asyncData;

		return(
		<div>
				<SingleResult url= {this.props.params} data={data} />
				<div className='col-sm-12'>
				<PreviewComponent url= {this.props.params} data={data}/>
				</div>
		</div>
	
	);}
}