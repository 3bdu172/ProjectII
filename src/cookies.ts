export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
    const cookies: Record<string, string> = {};

    if (!cookieHeader) {
        return cookies;
    }

    const cookiePairs = cookieHeader.split(";");

    for (const pair of cookiePairs) {
        const parts = pair.split("=");

        const name = parts[0]?.trim();
        const value = parts[1]?.trim();

        if (name && value) {
            cookies[name] = decodeURIComponent(value);
        }
    }

    return cookies;
}

