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

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const givenKey: string | null = request.headers.get("Authorization");
		const actualKey: string = env.API_KEY;

		if (givenKey === actualKey) {
			const response = { message: "Auth successful, hello world!" };
			return new Response(JSON.stringify(response), {
				status: 200
			});
		} else {
			const response = { message: "nope! wrong key." };
			return new Response(JSON.stringify(response), {
				status: 401
			});
		}
	},
} satisfies ExportedHandler<Env>;
