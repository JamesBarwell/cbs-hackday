const client = require('./client');

async function main() {
  console.log('start');

  //console.log('list all currency symbols');
  //const listResponse = await client.getList();
  //console.log(listResponse);

  console.log('--- get gpb rates ---');
  const ratesResponse = await client.getRates('gbp', '2022-01-01');
  console.log(ratesResponse);

  console.log('--- gpb to euro ---');
  const gbpEurResponse = await client.getRelativeRate('gbp', 'eur', '2022-01-01');
  console.log(gbpEurResponse);

  console.log('--- gbp over time ---');
  const ratesForDates = await client.getRatesForDateRange('gbp', '2022-01-29', '2022-02-02');
  console.log(ratesForDates);

  console.log('--- gbp to euro over time ---');
  const relativeRatesForDates = await client.getRelativeRateForDateRange('gbp', 'eur', '2022-01-29', '2022-02-02');
  console.log(relativeRatesForDates);

  console.log('end');
}

main();
