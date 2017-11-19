import { pspawn } from './pspawn';
import { existsSync } from 'fs';
import { SpawnOptions } from 'child_process';

export async function sandbox(n: number, revision: string) {
    const directory = `~benchmarko.sandbox/${n}`;
    const cwd = `${process.cwd()}/${directory}`;
    const spawnOptions: SpawnOptions = { };
    if (!existsSync(directory)) {
        await pspawn('git', ['clone', '.', directory]);
    } else {
        await pspawn('git', ['pull'], { cwd });
    }
    await pspawn('git', ['checkout', '-f', 'master'], { ...spawnOptions, cwd });
    await pspawn('git', ['checkout', '-f', revision], { ...spawnOptions, cwd });
    return { directory: cwd, revision };
}
