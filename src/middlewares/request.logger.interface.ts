export { ILogInfo }

interface ILogInfo {
    ip: string,
    date: Date,
    method: string,
    url: string,
    status: number,
    params?: string,
    body?: string,
    time: [number, number]
}