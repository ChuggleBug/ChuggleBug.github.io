
export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${input}`, init);
}

export type Status = "ok" | "unknown";
export interface ServiceHealth {
    status: Status
}
export type ProjectHealth = Record<string, ServiceHealth>;
export type StatusReport = Record<string, ProjectHealth>

export async function getAPIStatus(): Promise<StatusReport | null> {
    const resp = await apiFetch("/api/status");
    if (!resp.ok) {
        return null
    }

    return resp.json()
}