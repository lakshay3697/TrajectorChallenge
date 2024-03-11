export enum FetchAppState {
    DEFAULT = 'DEFAULT',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export type APIData = {
    userId: number;
    id: number;
    title: string;
    body: string
}