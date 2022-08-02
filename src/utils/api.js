// Default fetch optiosn
// Todo move the key to .env file
const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
    'x-messari-api-key': 'a7004d4f-23a9-4da7-8ae7-e80bd3f59a6f',
  },
};

const fetchAsset = async (assetId) => {
  const url = `https://data.messari.io/api/v1/assets/${assetId}`;
  console.log(url);
  const response = await fetch(url, fetchOptions);
  return response.json();
};
const fetchAssets = async ({ pageParam = 1 }) => {
  url = `https://data.messari.io/api/v2/assets?limit=20&page=${pageParam}&fields=id,slug,symbol,metrics/market_data/price_usd`;
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  if ('data' in data) return { data: data['data'], pageParam };
  // TODO make sure that the reason we didn't get data is because we reached the end of the pages
  // and not because of some other error
  else return { data: [], pageParam: -1 }; //-1 indicates end of pages
};

export { fetchOptions, fetchAsset, fetchAssets };
