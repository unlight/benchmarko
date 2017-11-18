import { pspawn } from './pspawn';
import { promisify } from 'util';
import { existsSync } from 'fs';

export async function sandbox(n: number, revision: string) {
    const directory = `~benchmarko.sandbox/${n}`;
    if (!existsSync(directory)) {
        await pspawn('git', ['clone', '.', directory]);
    } else {
        await pspawn('git', ['pull']);
    }
    const cwd = `${process.cwd()}/${directory}`;
    await pspawn('git', ['checkout', '-', revision], { cwd });
    return { directory: cwd, revision };
}
