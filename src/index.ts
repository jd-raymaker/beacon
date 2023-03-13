interface Event {
    passThroughOnException?: boolean;
}

interface Context {
    waitUntil(promise: Promise<any>): void;
    processOnlineStatus(): void;
}

type Environment = {
    URL: string;
    DISCORD_WEBHOOK_URL: string;
};

const checkIfOnline = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url);
        return response.ok;
    } catch {
        return false;
    }
};

const sendDiscordMessage = (webhookUrl: string, url: string) => (isOnline: boolean) => {
    if (isOnline) return;
    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `The URL ${url} is offline` }),
    });
};

const scheduled = (event: Event, env: Environment, ctx: Context) => {
    checkIfOnline(env.URL)
        .then(sendDiscordMessage(env.DISCORD_WEBHOOK_URL, env.URL))
        .then(() => ctx.processOnlineStatus())
        .catch(console.error)
        .finally(() => ctx.waitUntil(Promise.resolve()));
};

export default { scheduled };
