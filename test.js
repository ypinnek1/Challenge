import test from 'ava';
const app = require('./src/index.js');

test('User registration is being tested', t => {
  t.pass();
})
test('Lunch group is being tested', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});
test('Coffee group is being tested', t => {
  t.plan(2);
  t.pass('this assertion passed');
})