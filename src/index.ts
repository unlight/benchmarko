import { spawn, spawnSync, SpawnOptions } from 'child_process';
import { resolve } from 'path';
import { sandbox } from './sandbox';
import { RunResult } from './benchmarkify';
const Benchmarkify = require('benchmarkify');

type MainOptions = {
    revisions: string[];
    file: string;
}

export async function main({ revisions, file }: MainOptions) {
    if (revisions.length <= 1) {
        throw new Error(`Required at least 2 revisions`);
    }
    const sandboxes = await Promise.all(revisions.map((revision, n) => sandbox(n, revision)));
    const name = revisions.join(' vs ');
    const benchmark = new Benchmarkify(name);
    const suite = benchmark.createSuite(name);
    sandboxes.map(sandbox => {
        const testFn = require(`${sandbox.directory}/${file}`);
        suite.add(sandbox.revision, testFn);
    });
    suite
        .run()
        .then((results: RunResult )=> {
        });
}
