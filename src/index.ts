interface Event {
    cron: string;
    type: string;
    scheduledTime: number;
}

interface Context {
    waitUntil(promise: Promise<any>): void;
}

interface Environment {
    TARGET_URL: string;
    DISCORD_WEBHOOK_URL: string;
}

const checkIfOnline = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url);
        return response.ok;
    } catch {
        return false;
    }
};

const sendDiscordMessage = async (webhookUrl: string, url: string, isOnline: boolean) => {
    if (isOnline) return;
    await fetch(webhookUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({ content: `The URL ${url} is offline` }),
    });
};

const scheduled = async (event: Event, env: Environment, context: Context) => {
    try {
        const isOnline = await checkIfOnline(env.TARGET_URL);
        await sendDiscordMessage(env.DISCORD_WEBHOOK_URL, env.TARGET_URL, isOnline);
    } catch (error) {
        console.error(error);
    } finally {
        context.waitUntil(Promise.resolve());
    }
};

export default { scheduled };
