export interface IStat {
    duration: number;
    cycle: number;
    count: number;
    avg: number;
    rps: number;
    percent: number;
}

export interface IResultObject {
    name: string;
    reference?: boolean;
    fastest?: boolean;
    stat: IStat;
}

export type RunResult = IResultObject[];
