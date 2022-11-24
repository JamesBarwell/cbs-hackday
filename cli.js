const fxClient = require('./client/fx.js');

async function main() {
  console.log('start');

  await outputFxExamplesToConsole();

  outputExampleTableToConsole();

  console.log('end');
}

// This calls the FX API and outputs the results to the console
async function outputFxExamplesToConsole() {
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
}

// This outputs some table table to the console
function outputExampleTableToConsole() {

  // Just using arrays is ok, but the table will have no headers
  const arrayData = [
    [ 'name', 'email', 'job' ],
    [ 'Luke Skywalker', 'luke@rebelbase.com', 'Jedi Knight' ],
    [ 'Han Solo', 'han@milleniumfalcon.com', 'Smuggler' ],
    [ 'R2D2', 'r2d2@droids.com', 'Astromech Droid' ],
  ]
  console.table(arrayData);

  // Using objects, columns will get proper header names
  const objectData = [
    { name: 'Luke Skywalker', email: 'luke@rebelbase.com', job: 'Jedi Knight' },
    { name: 'Han Solo', email: 'han@milleniumfalcon.com', job: 'Smuggler' },
    { name: 'R2D2', email: 'r2d2@droids.com', job: 'Astromech Droid' },
  ];
  console.table(objectData);
}

main();
