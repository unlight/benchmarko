#!/usr/bin/env node
import { main } from './index';
const { version } = require('../package.json');

const argv = require('yargs')
    .usage(`Usage: benchmarko -f <file> -r <revisions>`)
    // .example('benchmarko -f benchmarks/string')
    .option('f', {
        alias: 'file',
        describe: 'Path to file which return test function',
    })
    .require('f')
    .option('r', {
        alias: 'revisions',
        describe: 'Revisions',
        default: ['HEAD', 'HEAD~1'],
    })
    .array('revisions')
    .help('h')
    .alias('h', 'help')
    .version(version)
    .alias('v', 'version')
    .argv;

(async () => {
    try {
        await main(argv);
    } catch (err) {
        console.error(err); // eslint-disable-line no-console
    }
})();
