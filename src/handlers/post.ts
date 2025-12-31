import { tryCatch } from '../helpers/tryCatch';
import { isExpectedBodyFormat } from '../helpers/validateRequestBody';

export async function handlePost(request: Request, env: Env): Promise<Response> {
	const { data: requestBody, error: bodyParseError } = await tryCatch(request.json());
	if (bodyParseError) {
		return new Response(JSON.stringify({ message: 'Something is very wrong with your request', details: bodyParseError.message }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	if (!isExpectedBodyFormat(requestBody)) {
		return new Response(JSON.stringify({ message: 'Your request body does not match the expected type' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	const { error: writeError } = await tryCatch(env.website_weatherworker.put(requestBody.sensor, JSON.stringify(requestBody)));
	if (writeError) {
		return new Response(JSON.stringify({ message: 'Internal server error when trying to write to the KV', details: writeError.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return new Response(JSON.stringify({ message: 'Value written successfully!' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
