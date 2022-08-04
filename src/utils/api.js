// Todo move the key to .env file
// TODO handle error better / rate limits etc etc

// Default fetch options
const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
    'x-messari-api-key': 'a7004d4f-23a9-4da7-8ae7-e80bd3f59a6f',
  },
};

const fetchUrl = async (url) => {
  try {
    const response = await fetch(url, fetchOptions);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
      const error = data?.status?.error_message || response.status;
      throw Error(error);
    }
    return data;
  } catch (error) {
    console.log(error);
    if (error.message.startsWith('Market with key') && error.message.endsWith('not found'))
      throw Error('Sorry this currency Pair was not found on Binance Market');
    else throw Error(error);
  }
};

const fetchAsset = async (assetId) => {
  const url = `https://data.messari.io/api/v1/assets/${assetId}/metrics?fields=id,slug,symbol,name,market_data/price_usd`;
  return await fetchUrl(url).then((data) => {
    const asset = data['data'];
    // Quick hack to standartize price property  for assetItem.
    // Asset object has following schema {id, symbol, name, metrics:{market_data:{price_usd}}}
    // but fetchasset compared to fetchassets returns an object without metrics key
    // so we adding it here to be consistent
    asset['metrics'] = { market_data: asset.market_data };
    return data;
  });
};

const fetchAssets = async ({ pageParam = 1 }) => {
  const url = `https://data.messari.io/api/v2/assets?limit=20&page=${pageParam}&fields=id,slug,symbol,name,metrics/market_data/price_usd`;
  return await fetchUrl(url).then((data) => {
    if (data?.data?.length > 0) return { data: data['data'], pageParam };
    // TODO make sure that the reason we didn't get data is because we reached the end of the pages
    // and not because of some other error
    else return { data: [], pageParam: -1 }; //-1 indicates end of pages
  });
};

const fetchPriceHistory = async (assetSymbol) => {
  const url = `https://data.messari.io/api/v1/markets/binance-${assetSymbol}-usdt/metrics/price-usd/time-series?interval=15m`;
  return await fetchUrl(url);
};

export { fetchOptions, fetchAsset, fetchAssets, fetchPriceHistory };
