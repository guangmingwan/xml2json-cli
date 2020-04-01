# xml2json-cli

> A command line interface to the [xml2json][xml2json] NPM package.


## Install

```sh
$ npm install -g xml2json-cli
```


## Usage

```sh
$ xml2json -i file.json
$ xml2json -j '{ value0: 42, value1: "fish fingers and custard" }'
```

##### Options

```
-h, --help                        Output usage information
-V, --version                     Output the tool's version number
-i, --input-file <jsonFilePath>   Input JSON file path
-j, --json <json>                 Input JSON
-o, --out <outFilePath>           Output XML file path (default: 'out.xml')
-k, --key <attributesKey>         Key for reading attributes from JSON (see xml2json docs for more details)
--header                          Adds standard XML header to output file (see xml2json docs for more details)
```


## License

The MIT License (MIT)

Copyright (c) 2016 Brandon Sara (http://bsara.github.io/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



[xml2json]: https://www.npmjs.com/package/xml2json "xml2json NPM Package"
