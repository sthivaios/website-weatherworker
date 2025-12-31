import { getAllValuesFromKV } from '../helpers/getAllValuesFromKV';
import { reportWorkerError } from '../helpers/reportError';

export async function handleGet(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	try {
		const kv = await getAllValuesFromKV(env);
		return new Response(JSON.stringify(kv), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (e) {
		if (e instanceof Error) {
			reportWorkerError(e, ctx);
		}
		return new Response(
			JSON.stringify({ message: 'Internal server error when trying to write to the KV', details: e instanceof Error ? e.message : '' }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}
}
