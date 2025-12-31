/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { handleGet } from './handlers/get';
import { handlePost } from './handlers/post';
import { authenticate } from './helpers/authentication';
import { reportWorkerError } from './helpers/reportError';

const allowedMethods = ['GET', 'POST'];

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (!allowedMethods.includes(request.method)) {
			reportWorkerError(new Error("Request received with a method that isn't handled"), ctx);

			return new Response(JSON.stringify({ message: 'Method not allowed!' }), {
				status: 405,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} else {
			const authenticationResponse = await authenticate(request, env, ctx);
			if (authenticationResponse instanceof Response) {
				return authenticationResponse;
			}

			if (request.method === 'POST') {
				return await handlePost(request, env, ctx);
			} else if (request.method == 'GET') {
				return await handleGet(request, env, ctx);
			}

			reportWorkerError(new Error('Unknown error'), ctx);

			return new Response(JSON.stringify({ message: 'Internal server error' }), {
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}
	},
} satisfies ExportedHandler<Env>;
