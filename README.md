# benchmarko
Run benchmark between revisions

INSTALL
---
```
npm i -D benchmarko
```

USAGE
---
```
Usage: benchmarko -f <file> -r <revisions>

Options:
  -f, --file       Path to file which return test function            [required]
  -r, --revisions  Revisions                [array] [default: ["HEAD","HEAD~1"]]
  -h, --help       Show help                                           [boolean]
  -v, --version    Show version number                                 [boolean]
```

CHANGELOG
---
See changes in [CHANGELOG.md](CHANGELOG.md) file.

TODO
---
* Setting threshold
* Skip error throw
* Attach by reflect metadata
* --tags
