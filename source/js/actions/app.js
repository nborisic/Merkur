import * as contentful from 'contentful';

export const TEST_ASYNC_ACTION_START = 'TEST_ASYNC_ACTION_START';
export const TEST_ASYNC_ACTION_ERROR = 'TEST_ASYNC_ACTION_ERROR';
export const TEST_ASYNC_ACTION_SUCCESS = 'TEST_ASYNC_ACTION_SUCCESS';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const TEST_INITIAL_ACTION_SUCCESS = 'TEST_INITIAL_ACTION_SUCCESS';
export const TEST_FETCH_FORM_PARAMETERS = 'TEST_FETCH_FORM_PARAMETERS';
export const TEST_QUICK_SEARCH = 'TEST_QUICK_SEARCH';

function testAsyncStart() {
  return {
    type: TEST_ASYNC_ACTION_START,
  };
}

function testAsyncSuccess(data) {
  return {
    type: TEST_ASYNC_ACTION_SUCCESS,
    data,
  };
}

function testAsyncError(error) {
  return {
    type: TEST_ASYNC_ACTION_ERROR,
    error,
  };
}

function testInitialActionSuccess(data) {
  return {
    type: TEST_INITIAL_ACTION_SUCCESS,
    data,
  };
}

function testFetchFormParametersSuccess(data) {
  return {
    type: TEST_FETCH_FORM_PARAMETERS,
    data,
  };
}

function testQuickSearch(data) {
  return {
    type: TEST_QUICK_SEARCH,
    data,
  };
}

const client = contentful.createClient({
  space: 'xslxambdvm6o',
  accessToken: '9f6dcf923ce304216a7dda7cfbf467bf28c84c952bc80d463794b8e2776c80e1',
});

export function fetchResults(URLparams) {
  return function (dispatch) {
    dispatch(testAsyncStart());
    let { category, structure, area, service, priceFrom, priceTo, areaFrom, areaTo } = URLparams;
    const { city } = URLparams;
    if (category === 'Sve_Kategorije') category = '';
    structure = structure === 'Sve_strukture' ? '' : structure.replace(/_/g, '.');
    if (category !== 'Stan') structure = '';
    area = area.replace(/-/g, ',').replace(/_/g, ' ');
    service = service.replace(/-/g, ',');
    [areaFrom, priceFrom] = [areaFrom, priceFrom].map((term) => {
      return term === 'NA' ? term = '0' : term;
    }
      );
    [areaTo, priceTo] = [areaTo, priceTo].map((term) => {
      return term === 'NA' ? term = '1000000' : term;
    }
      );

    const cityId = {
      Beograd: '5oRb1qNHpYuAIW2eICCoyw',
      Kraljevo: '64T6An0la0GQcqceiOqgGG',
    };
    client.getEntries({
      content_type: 'area',
      'fields.name[in]': area,
    })
      .then((entrys) => {
        let areaId = '';
        for (let i = 0; i < entrys.items.length; i++) {
          areaId += `${ entrys.items[i].sys.id },`;
        }
        client.getEntries({
          include: 1,
          content_type: 'realty',
          'fields.realtyType': category,
          'fields.adType[in]': service,
          'fields.surfaceArea[gte]': areaFrom,
          'fields.surfaceArea[lte]': areaTo,
          'fields.price[gte]': priceFrom,
          'fields.price[lte]': priceTo,
          'fields.area.sys.id[in]': areaId,
          'fields.city.sys.id': cityId[city],
          'fields.structure': structure,
        })
      .then((data) => dispatch(testAsyncSuccess(data)))
      .catch(error => dispatch(testAsyncError(error)));
      });
  };
}

export function initialResults() {
  return function (dispatch) {
    dispatch(testAsyncStart());
    client.getEntries({
      include: 1,
      limit: 12,
      content_type: 'realty',
      order: '-sys.updatedAt',
    }).then((data) => dispatch(testInitialActionSuccess(data)))
      .catch(error => dispatch(testAsyncError(error)));
  };
}

export function fetchFormParameters() {
  return function (dispatch) {
    dispatch(testAsyncStart());
    client.getEntries({
      include: 1,
      content_type: 'formParamaters',
    }).then((data) => dispatch(testFetchFormParametersSuccess(data)))
      .catch(error => dispatch(testAsyncError(error)));
  };
}

export function quickSearch(type) {
  return function (dispatch) {
    dispatch(testAsyncStart());
    client.getEntries({
      include: 1,
      content_type: 'realty',
      'fields.realtyType': type,
    }).then((data) => dispatch(testQuickSearch(data)))
      .catch(error => dispatch(testAsyncError(error)));
  };
}
