import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from '../../components/slider';
import ControledForm from '../../components/form';
import { initialResults, fetchFormParameters } from '../../actions/app';
import QuickSearch from '../../components/quick_search';
import StartingImg from '../../../assets/img/v3.jpg';


const style = {
  sm: 'col-sm-3',
  xs: 'col-xs-6',
};
@connect(state => ({
  initialData: state.app.initialData,
  asyncError: state.app.asyncError,
  asyncLoading: state.app.asyncLoading,
  formParameters: state.app.formParameters,
}))
export default class startingPage extends Component {
  static propTypes = {
    initialData: PropTypes.object,
    formParameters: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (!this.props.initialData) dispatch(initialResults());
    if (!this.props.formParameters) dispatch(fetchFormParameters());
  }

  render() {
    const { initialData, formParameters } = this.props;
    return (
      <div id='Pocetna'>
        <img src={ StartingImg } alt='' />
        <div className='pgl-bg-light'>
          <div className='container'>
            <ControledForm data={ formParameters } style={ style } />
          </div>
        </div>
        <QuickSearch />
        <div id='Novo-u-ponudi' className='col-sm-12'>
          <Slider data={ initialData } />
        </div>
        <div id='O-nama' className='col-sm-12' >
          <section className='pgl-offer'>
            <div className='container'>
              <h2>O nama</h2>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='offer-item pgl-bg-light'>
                    <div className='offer-item-inner'>
                      <p><i className='icons icon-calendar' /></p>
                      <h3>Preko dve decenije u poslu!</h3>
                      <p>Agencija za promet nepokretnosti Merkur započela je sa radom 1994. godine. Sedište Agencije se nalazi u Kraljevu.</p>
                    </div>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='offer-item pgl-bg-light'>
                    <div className='offer-item-inner'>
                      <p><i className='icons icon-efficiency' /></p>
                      <h3>Težak posao prepustite nama!</h3>
                      <p>U saradnji sa bankama pružamo kompletnu uslugu. Proveravamo legalnost nekretnina, obezbeđujemo pravnu sigurnost.</p>
                    </div>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='offer-item pgl-bg-light'>
                    <div className='offer-item-inner'>
                      <p><i className='icons icon-justice' /></p>
                      <h3>Nudimo i pravne usluge</h3>
                      <p>U okviru prostorija Agencije Merkur nalazi se i posebna kancelarija koju vodi advokat Zorica Dobrosavljević.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id='Sta-radimo' className='col-sm-12'>
          <div className='pgl-bg-light' >
            <div className='container'>
              Agencija MERKUR svojom delatnošću u posredovanju u prometu nepokretnosti, pruža maksimalnu pravnu zaštitu i stoji Vam na raspolaganju ako Vam je potrebno:
            </div>
          </div>
          <div className='container'>
            <div className='col-sm-6'>
              <ul>
                <li>Stručna pomoć u realizaciji kupovine i prodaje nepokretnosti</li>
                <li>Proceni vrednosti nekretnine</li>
                <li>Oglašavanje nekretnine u dnevnoj štampi, na internetu i na svom sajtu</li>
                <li>Pregled dokumentaciju i pružiti advokatske usluge i savete u pogledu upisa prava svojine u javne knjige i katastar nepokretnosti</li>
                <li>Prezentirati nepokretnost, dovesti potencijalnog kupca</li>
              </ul>
            </div>
            <div className='col-sm-6'>
              <ul>
                <li>U skladu sa Vašim željama i potrebama, pronaći adekvatnu nepokretnost i omogućiti njihovog razgledanje</li>
                <li>Pružiti Vam pomoć pri odlučivanju o stambenom kreditu s obzirom da sarađujemo sa velikim brojem banaka i pomažemo u prikupljanju potrebnu dokumentacije vezane za nepokretnost za koju se odobrava stambeni kredit</li>
                <li>Sačinjavamo kupoprodajni ugovor i pružamo pomoć u pogledu dalje realizacije (oslobađanja poreza na prenos apsolutnih prava –potrebna dokumentacija, povraćaj PDV-a, uknjižba nepokretnosti)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
