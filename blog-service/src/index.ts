import app from './app';
console.log(`Server started at PORT: ${Bun.env.PORT}`);

Bun.serve({
	fetch: app.fetch,
	port: Bun.env.PORT || 3031,
});
