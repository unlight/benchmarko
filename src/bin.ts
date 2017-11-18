import { main } from './index';
const VERSION = require('../package.json').version;

const argv = require('yargs')
    .usage('Usage: $0 -f <file> -r <revisions>')
    // .example('benchmarko -f benchmarks/string-concat')
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
    .version(VERSION)
    .alias('v', 'version')
    .argv;

main(argv);
