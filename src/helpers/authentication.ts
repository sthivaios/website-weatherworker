export async function authenticate(request: Request, env: Env): Promise<Response | null> {
	const givenKey: string | null = request.headers.get('Authorization');
	const actualKey: string = env.API_KEY;

	if (givenKey !== actualKey) {
		const response = {
			message: "Unauthorized! Check the Authorization header. It's value should be the API key ONLY without Bearer or anything like that.",
		};
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
