function resolve(path: string): string {
    return `${process.env.NEXT_PUBLIC_API_URL}/${path.replace(/^\/+/, "")}`;
}

export async function apiFetch(
    input: string,
    init?: RequestInit,
): Promise<Response> {
    return fetch(resolve(input), init);
}

export type Status = "ok" | "down" | "unknown";
export interface ServiceHealth {
    status: Status;
}
export type ProjectHealth = Record<string, ServiceHealth>;
export type StatusReport = Record<string, ProjectHealth>;

export async function getAPIStatus(): Promise<StatusReport | null> {
    const resp = await apiFetch("/status");
    if (!resp.ok) {
        return null;
    }

    return resp.json();
}

export function getAPIStatusEvents(): EventSource {
    return new EventSource(resolve("/status/events"));
}
