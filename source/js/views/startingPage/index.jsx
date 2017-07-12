import React, { Component } from 'react';
import ControledForm from '../../components/form.js';
import { initialResults } from '../../actions/app'; 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Slider from '../../components/slider';

@connect(state => ({
  initialData: state.app.initialData,
  asyncError: state.app.asyncError,
  asyncLoading: state.app.asyncLoading,
}))
export default class startingPage extends Component {
	static propTypes = {
		    initialData: PropTypes.object,
		    asyncError: PropTypes.object,
		    asyncLoading: PropTypes.bool,
		    dispatch: PropTypes.func,
		  }

	componentDidMount(){
		const { dispatch } = this.props;
		if(!this.props.initialData) dispatch(initialResults());
		}
			
	render (){
		const {initialData} = this.props;

		return(
		<div id='Pocetna'>
		<div className='col-sm-12'>
			<ControledForm />
		</div>
		<div className='col-sm-12'  >
			<Slider data={initialData} />
		</div>
			<div className='Slider col-sm-12' >
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus condimentum nunc eu rhoncus. Cras malesuada felis sed lectus egestas, sed faucibus mi blandit. Curabitur facilisis, diam vitae varius aliquet, tortor nulla efficitur enim, quis pretium diam orci nec est. Proin ultrices nibh ut cursus elementum. Quisque at rutrum mauris, eleifend finibus augue. Nam eget mi et magna euismod accumsan non in nunc. Suspendisse venenatis sodales ex sit amet elementum. Quisque lacinia ex ante, id scelerisque sapien auctor eu. Duis fermentum, justo tristique ultricies porttitor, tortor est elementum erat, eget vulputate purus nibh non nisl. In a maximus massa, a interdum tellus. Aliquam erat volutpat. Maecenas sed ultricies quam.
				</div>
			<div id="ONama" className='ONama col-sm-12'></div>
			<div id="Staradimo" className='Staradimo col-sm-12'>
				Nullam semper eu dui sit amet vulputate. Aenean sollicitudin consequat tellus, bibendum ultrices erat facilisis et. Nulla ultrices arcu non justo condimentum pharetra. Sed ullamcorper eros risus, quis ultricies urna pulvinar at. Donec a elementum nisi. Donec quis posuere turpis, eu volutpat felis. In sit amet aliquam turpis. Sed tincidunt maximus elementum. Curabitur risus erat, molestie sit amet diam in, vulputate dictum nibh. Mauris hendrerit sapien nec mollis sagittis. Phasellus cursus dolor vehicula tortor dignissim, posuere volutpat nunc viverra. Suspendisse mattis tortor in consequat molestie.
			</div>
			<div id='Kontakt' className='Kontakt col-sm-12'></div>
		</div>
	
	);}
}