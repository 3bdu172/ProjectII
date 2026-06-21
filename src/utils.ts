import { parseCookies } from "./cookies.ts";


export function setFlash(res: any, message: string): void {
    res.cookie("flash", message, {
        httpOnly: true,
        path: "/"
    });
}

export function getFlash(req: any, res: any): string | null {
    const cookies = parseCookies(req.headers.cookie);

    if (!cookies.flash) {
        return null;
    }

    const message = cookies.flash;

    res.clearCookie("flash", {
        path: "/"
    });

    return message;
}