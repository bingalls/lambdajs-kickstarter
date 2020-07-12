import test from 'ava';

const fn = () => 'Ava unit test works';

test('Ava unit test is working', t => {
	t.is(fn(), 'Ava unit test works');
});
