import * as contentful from 'contentful'

export const TEST_ASYNC_ACTION_START = 'TEST_ASYNC_ACTION_START';
export const TEST_ASYNC_ACTION_ERROR = 'TEST_ASYNC_ACTION_ERROR';
export const TEST_ASYNC_ACTION_SUCCESS = 'TEST_ASYNC_ACTION_SUCCESS';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const TEST_INITIAL_ACTION_SUCCESS = 'TEST_INITIAL_ACTION_SUCCESS';

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

function testInitialActionSuccess(data){
  return {
    type: TEST_INITIAL_ACTION_SUCCESS,
    data
  }
}

export function fetchResults(URLparams){
  return function (dispatch){
    dispatch(testAsyncStart());
    let {Category,Area,Service,City,priceFrom,priceTo,areaFrom,areaTo,id} = URLparams;

    if (Category=='Sve_Kategorije') Category='';
    if (Area=='Sve_Oblasti') Area='';
    Service = Service.replace(/_/g,',');
    [areaFrom,priceFrom] = [areaFrom,priceFrom].map((term)=>{
        return term=='NA' ? term = '0' : term
        }
      );
    [areaTo,priceTo] = [areaTo,priceTo].map((term)=>{
        return term=='NA' ? term = '1000000' : term
        }
      );

    const cityId = {
    Beograd : '5oRb1qNHpYuAIW2eICCoyw',
    Kraljevo : '64T6An0la0GQcqceiOqgGG'
    }

    const client = contentful.createClient({
    space: 'xslxambdvm6o',
    accessToken: '9f6dcf923ce304216a7dda7cfbf467bf28c84c952bc80d463794b8e2776c80e1'
    })
        
    client.getEntries({
          content_type: 'area',
          'fields.name' : Area
    })
      .then(function(entrys){ 
        if(Area=='') entrys.items[0].sys.id='';
        client.getEntries({
          include : 1,
          content_type: 'realty',
          'fields.realtyType' : Category, 
          'fields.adType[in]' : Service, 
          'fields.surfaceArea[gte]': areaFrom,
          'fields.surfaceArea[lte]': areaTo,
          'fields.price[gte]': priceFrom,
          'fields.price[lte]': priceTo,
          'fields.area.sys.id' : entrys.items[0].sys.id,
          'fields.city.sys.id' : cityId[City]
      })
      .then((data) =>  dispatch(testAsyncSuccess(data)))
      .catch(error => dispatch(testAsyncError(error))); 
    })
      
    }
}

export function initialResults (){
    return function (dispatch){
    dispatch(testAsyncStart());
        const client = contentful.createClient({
          space: 'xslxambdvm6o',
          accessToken: '9f6dcf923ce304216a7dda7cfbf467bf28c84c952bc80d463794b8e2776c80e1'
          })
          
        client.getEntries({
          include : 1,
          limit: 12,
          content_type: 'realty',
          order: '-sys.updatedAt'
      }).then((data) =>  dispatch(testInitialActionSuccess(data)))
      .catch(error => dispatch(testAsyncError(error))); 
    }
}