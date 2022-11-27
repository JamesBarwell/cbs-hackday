const fxClient = require('./client/fx.js');
const customersClient = require('./client/customers');
const emailClient = require('./client/email');

async function main() {
  console.log('start');

  await outputFxExamplesToConsole();
  await outputCustomerInfoToConsole();

  // uncomment below to test out the email sending (recomment when not in use)
  // you will need to let Ben know if you want an email address to be whitelisted
  // await emailAlert();

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

async function outputCustomerInfoToConsole() {
  console.log('--- get customer info ---');
  const customerInfo = await customersClient.get();
  console.log('customers retrieved:', customerInfo.length);
  console.log('sample customer:', customerInfo[0]);
}

async function emailAlert() {
  await emailClient.send({
    email: 'ben.brunton@t5digital.com',
    message: 'Test email',
    subject: 'ALERT!'
  });
}

main();
