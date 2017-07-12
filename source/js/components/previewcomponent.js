import React , {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SingleComponent from './single_prewiev';

export default class PreviewComponent extends Component {
	static propTypes = {
    	url: PropTypes.object,
    	data: PropTypes.object
    }
	renderField(result){
		let route='';
		if(Object.keys(this.props.url).length==1){
			route = '/Novo_u_ponudi';
		} else {
			const {Category,Service,City,Area,priceFrom,priceTo,areaFrom,areaTo} = this.props.url;
			route = `/${Category}/${Service}/${City}/${Area}/${priceFrom}/${priceTo}/${areaFrom}/${areaTo}`;
		}
	
		return (
			<div className='col-sm-3' key={result.sys.id}>
			<SingleComponent data={result} route={route} />
			</div>
			)
	}

	render(){
		if( !this.props ) return (<div> <p>Učitava se stranica...</p></div>);
		const {items} = this.props.data;
		
		return (
			<div >
			{_.map(items,this.renderField.bind(this))}
			</div>
			)
	}
}