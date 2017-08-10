import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// import 'react-select/dist/react-select.css';
import TextInput from './textInput';

class controledForm extends Component {
  static propTypes = {
    data: PropTypes.object,
  }


  constructor(props) {
    super(props);

    this.state = {
      urlComp: { Category: '< Sve Kategorije >',
        structure: '< Sve strukture >',
        Area: [],
        areaFrom: 'NA',
        areaTo: 'NA',
        priceFrom: 'NA',
        priceTo: 'NA',
        service: [],
      },
      errors: {},
      errorsInput: {},
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  onInputChange(e) {
    const { urlComp, errors } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    urlComp[name] = value;

    if (name === 'service') {
      const checkboxes = document.getElementsByName('service');
      const selected = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selected.push(checkboxes[i].value);
        }
      }
      urlComp[name] = selected;

      // validacija na promenu inputa chekboxa
      if (this.state.urlComp.service.length === 0) {
        errors.service = 'Morate izabrati vrstu usluge';
      } else {
        errors.service = '';
      }
    }
    if (this.state.urlComp.City) errors.city = '';
    this.setState({
      ...urlComp,
      urlComp,
      ...errors,
      errors,
    });
  }

  onTextInputChange(term, name) {
    const { errorsInput } = this.state;

    if (/^[0-9\s]+$/.test(term) || term.length === 0) {
      errorsInput[name] = '';
    } else {
      errorsInput[name] = 'Upisite broj';
    }
    this.setState({ ...errorsInput,
      errorsInput,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.validateForm();
  }

  validateForm() {
    let formIsValid = true;
    this.setState({ errors: {} });
    let { urlComp: { Category, structure, Area, service, areaFrom, areaTo, priceFrom, priceTo } } = this.state;
    const { errors, errorsInput, urlComp: { City } } = this.state;
    if (!City) {
      errors.city = 'Morate izabrati grad';
      formIsValid = false;
    }
    if (service.length === 0) {
      errors.service = 'Morate izabrati vrstu usluge';
      formIsValid = false;
    }
    if (errorsInput.areaTo || errorsInput.areaFrom ||
      errorsInput.priceTo || errorsInput.priceFrom) {
      formIsValid = false;
    }
    this.setState({
      ...errors,
      errors });
    if (formIsValid) {
      // slucaj uzimanja svih oblasti grada
      const allCityArea = [];
      // uzimam sve area objekte
      const areaObj = this.props.data.items[0].fields.parameters[`${ this.state.urlComp.City }AreaArray`];
      // izvlacim vrednosti svih objekta u allCityArea array
      areaObj.map((obj) => { return allCityArea.push(obj.value); });

      // pretty url
      Category = Category.replace(/<|>/g, '').trim().replace(/\s/g, '_');
      structure = structure === '< Sve strukture >' ? structure.replace(/<|>/g, '').trim().replace(/\s/g, '_') : structure.replace(/\./, '_');
      service = service.join('-');
      Area = Area.length === 0 ? allCityArea : Area;
      Area = Area.join('-').replace(/\s/g, '_');
      // u slucaju da upise i obrise broj i inputu
      [areaFrom, areaTo, priceFrom, priceTo] = [areaFrom, areaTo, priceFrom, priceTo].map((term) => {
        term = term.replace(/\s+/g, '');
        return term === '' ? term = 'NA' : term;
      }
    );
      browserHistory.push(`/${ Category }/${ structure }/${ service }/${ City }/${ Area }/${ priceFrom }/${ priceTo }/${ areaFrom }/${ areaTo }`);
    }
  }

  logChange(val) {
    const { urlComp } = this.state;
    const value = [];
    for (let i = 0; i < val.length; i++) {
      value.push(val[i].value);
    }
    urlComp.Area = value;
    this.setState({
      ...urlComp,
      urlComp,
    });
  }

  render() {
    if (!this.props.data) return (<div>Strana se učitava...</div>);

    const { CategoryArray, CityArray, ServiceArray, SturctureArray } = this.props.data.items[0].fields.parameters;
    const CityArea = this.state.urlComp.City;
    const areaArray = this.props.data.items[0].fields.parameters[`${ CityArea }AreaArray`];
    return (
      <form onChange={ this.onInputChange } onSubmit={ this.onFormSubmit } >
        <div className='col col-sm-4'>
          <div >
            <label htmlFor='Category' >Tip objekta</label>
            <select className='form-control' name='Category' value={ this.state.urlComp.name }>
              { CategoryArray.map((item) => <option key={ item }>{item}</option>)}
            </select>
          </div>
          <div >
            <label htmlFor='Structure' >Struktura stana</label>
            <select className='form-control' name='structure' value={ this.state.urlComp.name } disabled={ this.state.urlComp.Category !== 'Stan' }>
              { SturctureArray.map((item) => <option key={ item }>{item}</option>)}
            </select>
          </div>
          <div>
            { ServiceArray.map((item) => <span key={ item } ><input type='checkbox' name='service' value={ item } />{item}</span>)}
            <div> {this.state.errors.service ? this.state.errors.service : ''}</div>
          </div>
        </div>
        <div className='col col-sm-3'>
          <div>
            <label htmlFor='City' >Gradovi</label>
            <select className='placeholder form-control' onClick={ this.checkError } name='City' value={ this.state.urlComp.name } >
              { CityArray.map((item) => <option key={ item }>{item}</option>)}
            </select>
            <div >{this.state.errors.city ? this.state.errors.city : ''}</div>
          </div>
          <div>
            <label htmlFor='Area' >Oblast </label>
            <Select
              name='Area'
              placeholder='< Sve oblasti >'
              joinValues={ true }
              multi={ true }
              disabled={ !this.state.urlComp.City }
              value={ this.state.urlComp.Area }
              options={ areaArray }
              onChange={ this.logChange }
            />
          </div>
        </div>
        <div className='col col-sm-5'>
          <div className='col col-sm-12'>
            <label htmlFor='priceFrom' className='col col-sm-4'> {'Cena (€)'}</label>
            <TextInput
              validate={ this.onTextInputChange }
              name='priceFrom'
              placeholder='od'
              value={ this.state.urlComp.name }
              error={ this.state.errorsInput.priceFrom }
            />
            <TextInput
              validate={ this.onTextInputChange }
              name='priceTo'
              placeholder='do'
              value={ this.state.urlComp.name }
              error={ this.state.errorsInput.priceTo }
            />
          </div>
          <div className='col col-sm-12'>
            <label htmlFor='areaFrom' className='col col-sm-4'> {'Površina (m2)'}</label>
            <TextInput
              validate={ this.onTextInputChange }
              name='areaFrom'
              placeholder='od'
              value={ this.state.urlComp.name }
              error={ this.state.errorsInput.areaFrom }
            />
            <TextInput
              validate={ this.onTextInputChange }
              error={ this.state.errorsInput.areaTo }
              name='areaTo'
              placeholder='do'
              value={ this.state.urlComp.name }
            />
          </div>
        </div>
        <div className='col-sm-12'>
          <div className='col-sm-offset-4 col-sm-4'>
            <button
              type='submit'
              value='submit'
              className='btn btn-primary btn-block btn-lg'
            > Pretraži </button>
          </div>
        </div>
      </form>
    );
  }
}

export default controledForm;
