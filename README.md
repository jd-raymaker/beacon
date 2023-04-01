# Beacon
This is a Cloudflare Worker that monitors the status of a target URL and sends a notification to a Discord channel using a webhook when the target URL goes offline. 

## How to use
1. Clone this repository and navigate to the project directory.
2. Install the Cloudflare command-line tool `wrangler` by running `npm install -g @cloudflare/wrangler`.
3. Login to your Cloudflare account by running `wrangler login`.
4. Add the required secrets to your Cloudflare account using `wrangler secret` command:
   - `DISCORD_WEBHOOK_URL`: The webhook URL to the Discord channel where you want to send notifications.
   - `TARGET_URL`: The URL that you want to monitor.
5. Deploy the worker to Cloudflare by running `wrangler publish`.
6. Set up a scheduled event to run the worker periodically using Cloudflare Workers dashboard or API.
   - In the dashboard, go to the Workers tab and click "Create a Worker".
   - Paste the contents of `index.js` in the code editor and click "Save and Deploy".
   - Go to the "Scheduled" tab, set up the frequency and the cron expression, and save the event.

## Secrets
The worker requires two secrets to run:

- `DISCORD_WEBHOOK_URL`: The webhook URL to the Discord channel where you want to send notifications.
- `TARGET_URL`: The URL that you want to monitor.

You can add these secrets to your Cloudflare account using the following `wrangler secret` commands:

```
wrangler secret put DISCORD_WEBHOOK_URL
wrangler secret put TARGET_URL
```

## How to run locally
You can test the worker locally using `wrangler dev` command. The `wrangler dev` command will start a local development server and simulate the Cloudflare Workers environment. To test the worker, run the following command:
```
wrangler dev --env DISCORD_WEBHOOK_URL=<your-discord-webhook-url> --env TARGET_URL=<your-target-url>
```
Replace `<your-discord-webhook-url>` and `<your-target-url>` with the actual values.

## How to publish using wrangler
You can publish your Cloudflare Worker using the wrangler publish command. This command will upload your worker code to Cloudflare and make it available at a unique URL.
Before publishing, make sure to configure your Cloudflare account by following these steps:

1. Create a new Cloudflare account if you don't have one already.
2. Create a new Cloudflare Workers project in the Cloudflare dashboard.
3. Generate API tokens with the necessary permissions to deploy workers.
4. Once your account is configured, you can publish your worker by running the following commands in your project directory:
```
wrangler login
wrangler publish
```
The wrangler login command will prompt you to authenticate with your Cloudflare account, while wrangler publish will upload your worker code and make it available at the URL defined in your wrangler.toml configuration file.
After publishing your worker, you can test it by sending requests to the URL specified in your Cloudflare dashboard. You can also use the wrangler tail command to monitor the logs produced by your worker.
