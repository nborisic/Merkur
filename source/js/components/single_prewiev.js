import React , {Component} from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default class SingleComponent extends Component {
	static propTypes = {
    data: PropTypes.object,
    route: PropTypes.string
  }
	render(){
		const result = this.props.data;
		
		return (
		<Link to={`${this.props.route}/${result.sys.id}`} key={result.sys.id} >
		<div className='result'  >
			<img 	src={result.fields.images[0].fields.file.url} 
						className="img-responsive" alt="glavna slika"/>
			<div className='description'> 
				<p> {result.fields.title}</p>
				<p> {result.fields.address}</p>
				<p>
					<span className='pull-left'>{result.fields.surfaceArea} m²</span>
					<span className='pull-right'>{result.fields.price} €</span>
				</p>
			</div>
		</div>
		</Link>
		)
	}
}