# VS Auto Header

**Version:** v1.0.10

## Description

This extension inserts an header in a new file or an existing file.

### Supported languages

- JavaScript
- C++
- C
- C#
- CSS
- Go
- Groovy
- Java
- Less
- Objectiv C
- Objectiv C++
- Razor
- SCSS
- SQL
- Swift
- TypeScript
- Makefile
- Dockerfile
- CoffeeScript
- Yaml
- HTML
- Jade
- XML
- Python

## Table of contents

1. [Usage](#usage)
2. [Configure](#configure)
3. [Futur implementations](#futur-implementations)
4. [Release notes](#release-notes)
5. [Known bugs](#known-bugs)
6. [How to contribute?](#how-to-contribute)
7. [Contributors](#contributors)
8. [License](#license)

## Usage

When a new file is created and has code inside, VS Code will be able to detect which langage you are using and the extension will display a confirmation box (see below) to insert an header. In addition, if you open a file with code inside but which has no header, the extension will detect it and ask you if you want to insert one.

<p align="center">
  <img src="https://github.com/appi-solutions/vs-auto-header/raw/master/docs/img/confirmation.png" />
</p>

## Configure

### Global scope

1. Go to `Preferences` > `Settings`

<p align="center">
  <img src="https://github.com/appi-solutions/vs-auto-header/raw/master/docs/img/preferences.png" />
</p>

2. Search by extension name in search bar

<p align="center">
  <img src="https://github.com/appi-solutions/vs-auto-header/raw/master/docs/img/search.png" />
</p>

3. Modify extension settings

<p align="center">
  <img src="https://github.com/appi-solutions/vs-auto-header/raw/master/docs/img/settings.png" />
</p>

### Project scope

You can also override global configuration using a file `.vsconfig` at the root directory of your project. It has to respect JSON format and implement the following variables:

```json
{
  "fileheader": {
    "Author": "APPI",
    "Email": "support@appi-conseil.com",
    "Copyrights": "GPL-3.0"
  }
}
```

### Example

```javascript
/**
 * @author APPI <xxxx@your-company.com>
 * @file Description
 * @desc Created on 2019-08-28 12:18:44 pm
 * @copyright APPI SASU
 */
```

## Future implementations

_Feel free to propose new ideas by opening new issues ! :rocket:_

- [x] Customized settings per project (v1.0.10)

## Release notes

**v1.0.10**

- Add per project configuration using `.vsconfig`
- Add `python` support

**v1.0.9**

- Fixed vulnerabilities

**v1.0.8**

- New header format
- Remove update date from header

**Previous versions**

- Inserts an header in new/existing file
- Asks for permission to insert
- Enter / Escape macros

## How to contribute?

**Contributions are most welcome! :smile:**

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Added some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## Contributors

- [Nicolas Boulogne-Curriez](https://github.com/iXtazia)
- [Guillaume Robin](https://github.com/cesumilo)

## License

See [license.txt](license.txt).
