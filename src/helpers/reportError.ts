export function reportWorkerError(err: Error, ctx: ExecutionContext) {
	console.error(err);

	// tell cloudflare that this error'd
	ctx.waitUntil(Promise.reject(err));
}
