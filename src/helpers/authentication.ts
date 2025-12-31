import { reportWorkerError } from './reportError';

export async function authenticate(request: Request, env: Env, ctx: ExecutionContext): Promise<Response | null> {
	const givenKey: string | null = request.headers.get('Authorization');
	const actualKey: string = env.API_KEY;

	if (givenKey !== actualKey) {
		const response = {
			message: "Unauthorized! Check the Authorization header. It's value should be the API key ONLY without Bearer or anything like that.",
		};

		reportWorkerError(new Error('Unauthorized request'), ctx);

		return new Response(JSON.stringify(response), {
			status: 401,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} else {
		return null;
	}
}
