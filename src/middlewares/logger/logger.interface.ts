export interface ILogInfo {
    ip: string,
    date: string,
    method: string,
    url: string,
    status: number,
    params?: string,
    body?: string,
    time: string
}