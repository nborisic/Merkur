import React, {Component} from 'react';
import PreviewComponent from './previewcomponent';
import SingleComponent from './single_prewiev';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default class Slider extends Component{
	static propTypes = {
		   data: PropTypes.object
		  }

	renderField(result,i){
			const ClassName = `item ${i==0? "active":''}`;
			const route = '/Novo_u_ponudi';

		return ( 
					<div className={ClassName} key={i}>
						<div className="row">
								{result.map((item,index)=><div className="col-sm-3" key={index}><SingleComponent data={item} route={route} /></div>)}
				        </div>
				    </div>
				)
		}

	render(){
		if( !this.props.data ) return (<div> <p>Loading...</p></div>);

		$(document).ready(function() {
		  $('#media').carousel({
		    pause: true,
		    interval: false,
		  });
		});
		
		let {items} = this.props.data;
		items = _.chunk(items,4);
		
		return(
			<div className="container">
			  <div className="row">
			    <h2>Novo u ponudi</h2>
			  </div>
			  <div className='row'>
			    <div className='col-md-12'>
			      <div className="carousel slide media-carousel" id="media">
			        <div className="carousel-inner" onClick={this.props.onClick} name='slider'>
			          {items.map(this.renderField.bind(this))}
			        </div>
			        <a data-slide="prev" href="#media" className="left carousel-control">‹</a>
			        <a data-slide="next" href="#media" className="right carousel-control">›</a>
			      </div>                          
			    </div>
			  </div>
			</div>
			);
	}
}
