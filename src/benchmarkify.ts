export interface Stat {
    duration: number;
    cycle: number;
    count: number;
    avg: number;
    rps: number;
    percent: number;
}

export interface ResultObject {
    name: string;
    reference?: boolean;
    fastest?: boolean;
    stat: Stat;
}

export type RunResult = ResultObject[];
