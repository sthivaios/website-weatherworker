export async function getAllValuesFromKV(env: Env) {
	const kvList = await env.website_weatherworker.list();

	const entries = await Promise.all(
		kvList.keys.map(async (key) => {
			const raw = await env.website_weatherworker.get(key.name);
			return [key.name, raw ? JSON.parse(raw) : null] as const;
		}),
	);

	return Object.fromEntries(entries);
}
