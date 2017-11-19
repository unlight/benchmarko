import { pspawn } from './pspawn';
import { promisify } from 'util';
import { existsSync } from 'fs';
import { SpawnOptions } from 'child_process';

export async function sandbox(n: number, revision: string) {
    const directory = `~benchmarko.sandbox/${n}`;
    const spawnOptions: SpawnOptions = { stdio: 'inherit' };
    if (!existsSync(directory)) {
        await pspawn('git', ['clone', '.', directory]);
    } else {
        await pspawn('git', ['pull']);
    }
    const cwd = `${process.cwd()}/${directory}`;
    await pspawn('git', ['checkout', '-f', 'master'], { ...spawnOptions, cwd });
    await pspawn('git', ['checkout', '-f', revision], { ...spawnOptions, cwd });
    return { directory: cwd, revision };
}
