import React, {Component} from 'react';
import {fetchResults} from '../../actions/app';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PreviewComponent from '../../components/previewcomponent';
import Carousel from '../../components/carousel'

@connect(state => ({
  	asyncData: state.app.asyncData,
  	asyncError: state.app.asyncError,
  	asyncLoading: state.app.asyncLoading,
}))
export default class SearchResults extends Component {
	 static propTypes = {
    asyncData: PropTypes.object,
    asyncError: PropTypes.object,
    asyncLoading: PropTypes.bool,
    dispatch: PropTypes.func,
  }
	componentDidMount(){
    	window.scrollTo(0,0); //cini mi se da ovo ne radi?
    	
    	const { dispatch } = this.props;
    	 dispatch(fetchResults(this.props.params));

	}

	render(){
		const {
	      asyncData,
	      asyncError,
	      asyncLoading,
    	} = this.props;

    	if( !asyncData ) return (<div> <p>Učitava se stranica...</p></div>);
    	if( asyncData.items.length==0) return (<div> <p>Nema rezultata za ovu pretragu</p></div>);

		return (
			<div>
				<h2>SearchResults page</h2>
				<div> 
					<PreviewComponent url={this.props.params} data={asyncData}/>
				</div>
			</div>
			);
	}
}