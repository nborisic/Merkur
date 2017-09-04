import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TextInput from './textInput';
import { StyledSelect, StyledMultiSelect } from './styledComponents';

class controledForm extends Component {
  static propTypes = {
    data: PropTypes.object,
    style: PropTypes.object,
  }
  constructor(props) {
    super(props);

    this.state = {
      urlComp: { category: 'Sve kategorije',
        structure: 'Sve strukture',
        area: [],
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
    this.multiselectChange = this.multiselectChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  onInputChange(e) {
    const urlComp = {};
    const name = e.target.name;
    const value = e.target.value;
    urlComp[name] = value;
    if (name === 'service') {
      const selected = this.state.urlComp.service.slice();
      if (e.target.checked) {
        selected.push(value);
      } else {
        _.pull(selected, value);
      }
      urlComp[name] = selected;
    }

    this.setState({
      urlComp: { ...this.state.urlComp,
        ...urlComp },
    }, () => {
      const errors = {};
      if (this.state.urlComp.city) errors.city = '';
      // samo u slucaju promene service stata menjace error
      if (name === 'service') {
        if (this.state.urlComp.service.length === 0) {
          errors.service = 'Morate izabrati vrstu usluge';
        } else {
          errors.service = '';
        }
      }
      this.setState({
        errors: { ...this.state.errors,
          ...errors },
      });
    });
  }

  onTextInputChange(value, name) {
    const urlComp = {};
    urlComp[name] = value;
    const errorsInput = {};
    if (/^[0-9\s]+$/.test(value) || value.length === 0) {
      errorsInput[name] = '';
    } else {
      errorsInput[name] = 'Upisite broj';
    }
    this.setState({
      errorsInput: { ...this.state.errorsInput,
        ...errorsInput },
      urlComp: { ...this.state.urlComp,
        ...urlComp },
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.validateForm();
  }

  validateForm() {
    let formIsValid = true;
    this.setState({ errors: {} });
    let { urlComp: { category, structure, area, service, areaFrom, areaTo, priceFrom, priceTo } } = this.state;
    const { errorsInput, urlComp: { city } } = this.state;
    const errors = {};
    if (!city) {
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
      errors: { ...this.state.errors,
        ...errors,
      },
    });
    if (formIsValid) {
      // slucaj uzimanja svih oblasti grada
      const allCityArea = [];
      // uzimam sve area objekte
      const areaObj = this.props.data.items[0].fields.parameters[`${ this.state.urlComp.city }AreaArray`];
      // izvlacim vrednosti svih objekta u allCityArea array
      areaObj.map((obj) => { return allCityArea.push(obj.value); });

      // pretty url
      category = category.replace(/\s/g, '_');
      structure = structure === 'Sve strukture' ? structure.replace(/\s/g, '_') : structure;
      service = service.join('-');
      area = area.length === 0 ? allCityArea : area;
      area = area.join('-').replace(/\s/g, '_');
      // u slucaju da upise i obrise broj i inputu
      [areaFrom, areaTo, priceFrom, priceTo] = [areaFrom, areaTo, priceFrom, priceTo].map((term) => {
        term = term.replace(/\s+/g, '');
        return term === '' ? term = 'NA' : term;
      }
    );
      browserHistory.push(`/${ category }/${ structure }/${ service }/${ city }/${ area }/${ priceFrom }/${ priceTo }/${ areaFrom }/${ areaTo }`);
    }
  }

  multiselectChange(val) {
    const { urlComp } = this.state;
    const value = [];
    for (let i = 0; i < val.length; i++) {
      value.push(val[i].value);
    }
    const selectValue = {};
    selectValue.area = value;
    this.setState({
      urlComp: { ...urlComp,
        ...selectValue,
      },
    });
  }

  selectChange(val, name) {
    const { urlComp } = this.state;
    const selectValue = {};
    selectValue[name] = val.value;
    this.setState({
      urlComp: {
        ...urlComp,
        ...selectValue,
      },
    }, () => {
      if (name === 'city') {
        const errors = {};
        if (this.state.errors.city) {
          errors.city = '';
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
            },
          });
        }
      }
    });
  }

  render() {
    if (!this.props.data) return (<div>Strana se učitava...</div>);
    const { categoryArray, cityArray, serviceArray, sturctureArray } = this.props.data.items[0].fields.parameters;
    const cityArea = this.state.urlComp.city;
    const areaArray = this.props.data.items[0].fields.parameters[`${ cityArea }AreaArray`];
    const { xs, sm } = this.props.style;
    return (
      <form onSubmit={ this.onFormSubmit } >
        <div className='row helping' >
          <div className={ `col ${ sm } ${ xs }` }>
            <div className='form-group'>
              <label htmlFor='category' >Tip objekta</label>
              <StyledSelect
                placeholder='Sve kategorije'
                name='category'
                value={ this.state.urlComp.category }
                options={ categoryArray }
                onChange={ value => this.selectChange(value, 'category') }
              />
            </div>
          </div>
          <div className={ `col ${ sm } ${ xs }` }>
            <div className='form-group'>
              <label htmlFor='city' >Gradovi</label>
              <StyledSelect
                placeholder='Izaberite grad'
                onChange={ value => this.selectChange(value, 'city') }
                name='city'
                value={ this.state.urlComp.city }
                options={ cityArray }
              />
              <div >{this.state.errors.city ? this.state.errors.city : ''}</div>
            </div>
          </div>
          <div className={ `col ${ sm } zeroPadding` }>
            <div className='form-group' >
              <label htmlFor='priceFrom' className='col col-xs-12'> {'Cena (€)'}</label>
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
          </div>
          <div ref={ (input) => this.selectInput = input } onChange={ this.onInputChange } className={ `col ${ sm } checkboxes` }>
            <div className='form-group'>
              { serviceArray.map((item) => <label htmlFor={ item } key={ item } >{item} <input type='checkbox' name='service' value={ item } /></label>)}
              <div> {this.state.errors.service ? this.state.errors.service : ''}</div>
            </div>
          </div>
        </div>

        <div className='row' >
          <div className={ `col ${ sm } ${ xs }` }>
            <div className='form-group'>
              <label htmlFor='Structure' >Struktura</label>
              <StyledSelect
                placeholder='< Sve structure >'
                name='structure'
                value={ this.state.urlComp.structure }
                disabled={ this.state.urlComp.category !== 'Stan' && this.state.urlComp.category !== 'Kuća' }
                options={ sturctureArray }
                onChange={ value => this.selectChange(value, 'structure') }
              />
            </div>
          </div>
          <div className={ `col ${ sm } ${ xs }` }>
            <div className='form-group'>
              <label htmlFor='area' >Oblast </label>
              <StyledMultiSelect
                name='area'
                placeholder='Sve oblasti'
                joinValues={ true }
                multi={ true }
                disabled={ !this.state.urlComp.city }
                value={ this.state.urlComp.area }
                options={ areaArray }
                onChange={ this.multiselectChange }
              />
            </div>
          </div>
          <div className={ `col ${ sm } zeroPadding` }>
            <div className='form-group'>
              <label htmlFor='areaFrom' className='col col-xs-12'> {'Površina (m2)'}</label>
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
          <div className={ `col ${ sm } checkboxes` }>
            <button
              type='submit'
              value='submit'
              className='btn btn-primary btn-block'
            >Nađi svoj dom</button>
          </div>
        </div>
      </form>
    );
  }
}

export default controledForm;
