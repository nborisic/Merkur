import * as contentful from 'contentful';

export const ASYNC_ACTION_START = 'RUN_ASYNC_ACTION_START';
export const ASYNC_ACTION_ERROR = 'RUN_ASYNC_ACTION_ERROR';
export const ASYNC_ACTION_SUCCESS = 'RUN_ASYNC_ACTION_SUCCESS';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const INITIAL_ACTION_SUCCESS = 'RUN_INITIAL_ACTION_SUCCESS';
export const FETCH_FORM_PARAMETERS = 'RUN_FETCH_FORM_PARAMETERS';
export const QUICK_SEARCH = 'RUN_QUICK_SEARCH';

function runAsyncStart() {
  return {
    type: ASYNC_ACTION_START,
  };
}

function runAsyncSuccess(data) {
  return {
    type: ASYNC_ACTION_SUCCESS,
    data,
  };
}

function runAsyncError(error) {
  return {
    type: ASYNC_ACTION_ERROR,
    error,
  };
}

function runInitialActionSuccess(data) {
  return {
    type: INITIAL_ACTION_SUCCESS,
    data,
  };
}

function runFetchFormParametersSuccess(data) {
  return {
    type: FETCH_FORM_PARAMETERS,
    data,
  };
}

function runQuickSearch(data) {
  return {
    type: QUICK_SEARCH,
    data,
  };
}

const client = contentful.createClient({
  space: 'xslxambdvm6o',
  accessToken: '9f6dcf923ce304216a7dda7cfbf467bf28c84c952bc80d463794b8e2776c80e1',
});

export function fetchResults(URLparams) {
  return function (dispatch) {
    dispatch(runAsyncStart());
    let { category, structure, area, service, priceFrom, priceTo, areaFrom, areaTo } = URLparams;
    const { city } = URLparams;
    if (category === 'Sve_kategorije') category = '';
    structure = structure === 'Sve_strukture' ? '' : structure;
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
      .then((data) => dispatch(runAsyncSuccess(data)))
      .catch(error => dispatch(runAsyncError(error)));
      });
  };
}

export function initialResults() {
  return function (dispatch) {
    dispatch(runAsyncStart());
    client.getEntries({
      include: 1,
      limit: 12,
      content_type: 'realty',
      order: '-sys.updatedAt',
    }).then((data) => dispatch(runInitialActionSuccess(data)))
      .catch(error => dispatch(runAsyncError(error)));
  };
}

export function fetchFormParameters() {
  return function (dispatch) {
    dispatch(runAsyncStart());
    client.getEntries({
      include: 1,
      content_type: 'formParamaters',
    }).then((data) => dispatch(runFetchFormParametersSuccess(data)))
      .catch(error => dispatch(runAsyncError(error)));
  };
}

export function quickSearch(type) {
  return function (dispatch) {
    dispatch(runAsyncStart());
    client.getEntries({
      include: 1,
      content_type: 'realty',
      'fields.realtyType': type,
    }).then((data) => dispatch(runQuickSearch(data)))
      .catch(error => dispatch(runAsyncError(error)));
  };
}
