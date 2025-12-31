import { reportWorkerError } from '../helpers/reportError';
import { tryCatch } from '../helpers/tryCatch';
import { isExpectedBodyFormat } from '../helpers/validateRequestBody';

export async function handlePost(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	const { data: requestBody, error: bodyParseError } = await tryCatch(request.json());
	if (bodyParseError) {
		reportWorkerError(bodyParseError, ctx);

		return new Response(JSON.stringify({ message: 'Something is very wrong with your request', details: bodyParseError.message }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	if (!isExpectedBodyFormat(requestBody)) {
		reportWorkerError(new Error('Request body did not match expected type'), ctx);

		return new Response(JSON.stringify({ message: 'Your request body does not match the expected type' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	const { value, timestamp } = requestBody;

	const { error: writeError } = await tryCatch(
		env.website_weatherworker.put(
			requestBody.sensor,
			JSON.stringify({
				value: value,
				timestamp: timestamp,
			}),
		),
	);
	if (writeError) {
		reportWorkerError(writeError, ctx);

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
