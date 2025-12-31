import { KvArray } from '../types';

export async function getAllValuesFromKV(env: Env): Promise<KvArray> {
	const kvArray: KvArray = [];
	const kvList = await env.website_weatherworker.list();
	const promises = kvList.keys.map(async (key) => {
		kvArray.push({
			key: key.name,
			value: (await env.website_weatherworker.get(key.name)) ?? '',
		});
	});
	await Promise.all(promises);
	return kvArray;
}
