import { spawn, SpawnOptions } from 'child_process';

export function pspawn(command: string, args?: string[], options?: SpawnOptions) {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, options);
        proc.on('error', reject);
        proc.on('exit', resolve);
    });
}
