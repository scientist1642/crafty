// Default fetch optiosn
// Todo move the key to .env file

// TODO handle errors / rate limits etc etc

const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
    'x-messari-api-key': 'a7004d4f-23a9-4da7-8ae7-e80bd3f59a6f',
  },
};

const fetchAsset = async (assetId) => {
  try {
    const url = `https://data.messari.io/api/v1/assets/${assetId}/metrics?fields=id,slug,symbol,name,market_data/price_usd`;
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    const asset = data['data'];
    // Quick hack to standartize price property  for assetItem.
    // Asset object has following schema {id, symbol, name, metrics:{market_data:{price_usd}}}
    // but fetchasset compared to fetchassets returns an object without metrics key
    // so we adding it here to be consistent
    asset['metrics'] = { market_data: asset.market_data };
    return data;
  } catch (error) {
    console.log(error);
  }
};
const fetchAssets = async ({ pageParam = 1 }) => {
  try {
    url = `https://data.messari.io/api/v2/assets?limit=20&page=${pageParam}&fields=id,slug,symbol,name,metrics/market_data/price_usd`;
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    if ('data' in data) return { data: data['data'], pageParam };
    // TODO make sure that the reason we didn't get data is because we reached the end of the pages
    // and not because of some other error
    else return { data: [], pageParam: -1 }; //-1 indicates end of pages
  } catch (error) {
    console.log(error);
  }
};

const fetchPriceHistory = async (assetSymbol) => {
  url = `https://data.messari.io/api/v1/markets/binance-${assetSymbol}-usdt/metrics/price-usd/time-series?interval=15m`;
  const response = await fetch(url, fetchOptions);
  return await response.json();
};

export { fetchOptions, fetchAsset, fetchAssets, fetchPriceHistory };
