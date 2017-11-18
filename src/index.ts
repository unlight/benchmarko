import { spawn, spawnSync, SpawnOptions } from 'child_process';
const Benchmarkify = require('benchmarkify');

export function pspawn(command: string, args?: string[], options?: SpawnOptions) {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, options);
        proc.on('error', reject);
        proc.on('exit', resolve);
    });
}

(async () => {
    const { stdout } = spawnSync('git', ['log', '-2', '--pretty=format:%H'], { encoding: 'utf8' });
    const [headRef, prevRef] = stdout.split('\n');
    if (!headRef || !prevRef) {
        throw new Error(`Get commits`);
    }
    await Promise.all([
        pspawn('git', ['clone', '.', `~sandbox.head`]).then(() => pspawn('git', ['checkout', headRef], { cwd: `${process.cwd()}/~sandbox.head` })),
        pspawn('git', ['clone', '.', `~sandbox.prev`]).then(() => pspawn('git', ['checkout', prevRef], { cwd: `${process.cwd()}/~sandbox.prev` })),
    ]);
    const benchmark = new Benchmarkify('String concat').printHeader();
    const bench = benchmark.createSuite("Increment integer");
    const headFn = require('./~sandbox.head/src/example/string-concat');
    bench.add('String concat implementation in head ref', (done) => {
        headFn();
        done();
    });
    const prevFn = require('./~sandbox.prev/src/example/string-concat');
    bench.add('String concat implementation in prev commit', (done) => {
        prevFn();
        done();
    });
    bench.run();
})();
