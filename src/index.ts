import { sandbox } from './sandbox';
import { RunResult } from './benchmarkify';
const Benchmarkify = require('benchmarkify');

type MainOptions = {
    revisions: string[];
    file: string;
};

export async function main({ revisions, file }: MainOptions) {
    if (revisions.length <= 1) {
        throw new Error(`Required at least 2 revisions`);
    }
    const sandboxes = await Promise.all(revisions.map((revision, n) => sandbox(n, revision)));
    const name = revisions.join(' vs ');
    const benchmark = new Benchmarkify(name);
    const suite = benchmark.createSuite(name);
    sandboxes.map(sandbox => {
        let name = sandbox.revision;
        const testFn = require(`${sandbox.directory}/${file}`);
        if (testFn.name) {
            name += ` (${testFn.name})`;
        }
        suite.add(name, testFn);
    });
    const [test] = suite.tests.slice(-1);
    test.reference = true;
    suite
        .run()
        .then((results: RunResult) => {
            // console.log("results", results);
        });
}
