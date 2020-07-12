import test from 'ava';
require('dotenv').config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const dbRows = async () => {
	await prisma.connect();
	try {
		const promos = await prisma.promo.findMany({
		take: 2
		});
		return promos;
	} catch (error) {
		console.error(error);
		return error;
	} finally {
		prisma.disconnect();
	}
};

dbRows().then(rows => 
	test('Reading 2nd DB row, ID is 2', arg => {
		arg.is(JSON.parse(JSON.stringify(rows[1])).id, 2)
	})
);
