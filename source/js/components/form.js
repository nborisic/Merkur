import React , { Component } from 'react';
import TextInput from './textInput';
import _ from 'lodash';
import { browserHistory } from 'react-router';

class controledForm extends Component {
	constructor(props){
		super(props);

		this.state= { 
			urlComp:{	Category: '< Sve Kategorije >', 
						Area: '< Sve Oblasti >',
						areaFrom:"NA",
						areaTo:"NA",
						priceFrom:"NA",
						priceTo:"NA",
						service: [],
					},
			errors:{},
			errorsInput:{}
			};

		this.onInputChange=this.onInputChange.bind(this);
		this.onFormSubmit=this.onFormSubmit.bind(this);
		this.onTextInputChange=this.onTextInputChange.bind(this);
	}

	onInputChange(e){
		const {urlComp,errors } = this.state;
		const name = e.target.name;
		const value = e.target.value;
		urlComp[name] = value;

		if(name==='service'){
			const checkboxes = document.getElementsByName('service');
			const selected = [];
				for (var i=0; i<checkboxes.length; i++) {
    			if (checkboxes[i].checked) {
			        selected.push(checkboxes[i].value);
			    }
			}
			urlComp[name] = selected;

			//validacija na promenu inputa chekboxa
			if(this.state.urlComp.service.length ==0){
			 	// setTimeout(()=>{errors['service']='Morate izabrati vrstu usluge';},500) ne radi..
			 	errors['service']='Morate izabrati vrstu usluge'; //pitaj za debounce
			}
			else {
				errors['service']= '';
				}
			}
		
		if(this.state.urlComp.City) errors.city= '';
		this.setState({...urlComp,	urlComp,
						...errors,errors	});
	}

	onTextInputChange(term,name){
		const {errorsInput} = this.state;

		if (/^[0-9\s]+$/.test(term) | term.length==0){
			errorsInput[name] = ''
		}
		else {
			 errorsInput[name] = 'Upisite broj';
		}
		this.setState({...errorsInput,errorsInput});
	}


	validateForm(e){
		let formIsValid = true;
		 this.setState({errors : {}});
		 let {errors,errorsInput,urlComp : {Category,Area,service,City,areaFrom,areaTo,priceFrom,priceTo}} = this.state;
		if(!City){
			errors['city']='Morate izabrati grad';
			this.setState({...errors,errors});
			formIsValid=false;
		};
		if(service.length ==0){
			errors['service']='Morate izabrati vrstu usluge';
			this.setState({...errors,errors});
			formIsValid=false;
		};
		if(errorsInput.areaTo || errorsInput.areaFrom || errorsInput.priceTo || errorsInput.priceFrom){
			formIsValid= false;
		};
		if(formIsValid){
			//pretty url
			Category = Category.replace(/<|>/g,'').trim().replace(/\s/,'_');
			service = service.join('_');
			Area = Area.replace(/<|>/g,'').trim().replace(/\s/,'_');
			//u slucaju da upise i obrise broj i inputu
			[areaFrom,areaTo,priceFrom,priceTo] = [areaFrom,areaTo,priceFrom,priceTo].map((term)=>{
				term = term.replace(/\s+/g, ''); 
				return term=='' ? term = 'NA' : term
				}
			);
			
			browserHistory.push(`/${Category}/${service}/${City}/${Area}/${priceFrom}/${priceTo}/${areaFrom}/${areaTo}`);
			
		}
	}

	onFormSubmit(e){
		e.preventDefault();
		this.validateForm();
	}

	render (){

		const CategoryArray = ['< Sve kategorije >','kuća','lokal','garsonjera','jednosoban','dvosoban stan','trosoban stan','cetvorosoban+','plac'];
		const CityArray = ['< Izaberite grad >','Kraljevo', 'Beograd'];
		const KraljevoAreaArray = ['< Sve oblasti >', 'Centar', 'Naselje Moše Pijade', 'Vojno naselje', 'Ribnica','Higijenski zavod', 'Dositejeva', 'Žiča','Jarčujak'];
		const ServiceArray = ['Prodaja','Izdavanje','Kupovina'];
		const BeogradAreaArray = ['< Sve oblasti >', 'Čukarica','Novi Beograd','Palilula','Rakovica','Savski venac','Stari grad','Voždovac','Vračar','Zemun','Zvezdara','Barajevo','Grocka','Lazarevac','Mladenovac','Obrenovac','Sopot','Surčin']
		  
		return (
			<form onChange={this.onInputChange} onSubmit={this.onFormSubmit}>
				<div className='col col-sm-4'>
				<div >
					<label htmlFor='Category' >Tip stana</label>
					<select className="form-control" name='Category'  value={this.state.urlComp.name}>
						{CategoryArray.map((item)=> <option key={item}>{item}</option>)}
					</select>
				</div>	
				<div>
					{ServiceArray.map((item)=> <span  key={item} ><input type='checkbox'  name='service' value={item}/>{item}</span>)}
					<div> {this.state.errors.service ? this.state.errors.service: ''}</div>
				</div>
				</div>
				<div className='col col-sm-3'>
					<div>
						<label htmlFor='City' >Gradovi</label>
						<select  className="placeholder form-control" onClick={this.checkError} name='City' value={this.state.urlComp.name} >
							{CityArray.map((item)=> <option key={item}>{item}</option>)}
						</select>
						<div >{this.state.errors.city ? this.state.errors.city: ''}</div>
					</div>
					<div>
						<label htmlFor='Area' >Oblast </label>
						<select className="form-control" name='Area' value={this.state.urlComp.name} disabled={!this.state.urlComp.City}>
							{(this.state.urlComp.City=='Kraljevo' ? KraljevoAreaArray:BeogradAreaArray).map((item)=> <option key={item}>{item}</option>)  }
						</select>
					</div>
				</div>
				<div className='col col-sm-5'>		
					<div className='col col-sm-12'>
						<label htmlFor='priceFrom' className="col col-sm-4"> {'Cena (€)'}</label>
						<TextInput 
							validate= {this.onTextInputChange}
							name='priceFrom'
							placeholder='od' 
							value={this.state.urlComp.name}
							error = {this.state.errorsInput.priceFrom}
							/>
						<TextInput
							validate= {this.onTextInputChange} 
							name='priceTo'
							placeholder='do' 
							value={this.state.urlComp.name}
							error = {this.state.errorsInput.priceTo}
							/> 
					</div>
					<div className='col col-sm-12'>
						<label htmlFor='areaFrom' className="col col-sm-4"> {'Površina (m2)'}</label>
						<TextInput 
							validate= {this.onTextInputChange}
							name='areaFrom' 
							placeholder='od' 
							value={this.state.urlComp.name}
							error = {this.state.errorsInput.areaFrom}
							 />
						<TextInput 
							validate= {this.onTextInputChange}
							error = {this.state.errorsInput.areaTo}
							name='areaTo' 
							placeholder='do' 
							value={this.state.urlComp.name}
							/> 
					</div>
				</div>
				<div className='col-sm-offset-4 col-sm-4'>
				<button 
					type="submit" value="submit" className='btn btn-primary btn-block btn-lg' > Pretraži </button>
				</div>
			</form>
		);}
}

export default controledForm;