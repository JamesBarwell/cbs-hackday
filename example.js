const fxClient = require('./client/fx.js');

async function main() {
  console.log('start');

  console.log('--- get gpb rates ---');
  const ratesResponse = await fxClient.getRates('gbp', '2022-01-01');
  console.log(ratesResponse);

  console.log('--- gpb to euro ---');
  const gbpEurResponse = await fxClient.getRelativeRate('gbp', 'eur', '2022-01-01');
  console.log(gbpEurResponse);

  console.log('--- gbp over time ---');
  const ratesForDates = await fxClient.getRatesForDateRange('gbp', '2022-01-29', '2022-02-02');
  console.log(ratesForDates);

  console.log('--- gbp to euro over time ---');
  const relativeRatesForDates = await fxClient.getRelativeRateForDateRange('gbp', 'eur', '2022-01-29', '2022-02-02');
  console.log(relativeRatesForDates);

  console.log('end');
}

main();
