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

		if (givenKey !== actualKey) {
			const response = { message: "Unauthorized! Check the Authorization header. It's value should be the API key ONLY without Bearer or anything like that." };
			return new Response(JSON.stringify(response), {
				status: 401
			});
		}

		const valueToWrite = {
			timestamp: new Date(),
			value: Math.random() * 1000 * Math.sqrt(Math.PI) // my incredible random number algorithm lmfao
		}

		try {
			await env.website_weatherworker.put("test", JSON.stringify(valueToWrite))
		} catch (e) {
			if (e instanceof Error) {
				console.error(e);
				return new Response(JSON.stringify({ message: "Internal server error when trying to write to the KV", details: e.message }), { status: 500 })
			}
		}

		return new Response(JSON.stringify({ message: "Value written successfully!" }), { status: 200 })
	},
} satisfies ExportedHandler<Env>;
