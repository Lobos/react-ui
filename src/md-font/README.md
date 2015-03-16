# [Material Design Iconic Font v1.1.1](http://zavoloklom.github.io/material-design-iconic-font)
#### Material Design Iconic Font and CSS toolkit

[![Material Design Iconic Font](http://zavoloklom.github.io/material-design-iconic-font/images/Material-Design-Iconic-Font.png)](http://zavoloklom.github.io/material-design-iconic-font/)

Material Design Iconic Font is a full suite of material design icons (created and maintained by [Google](https://github.com/google/material-design-icons)) for easy scalable vector graphics on websites.

Material Design Icons are the official open-source [icons](http://www.google.com/design/spec/resources/sticker-sheets.html#sticker-sheets-components) featured in the Google [Material Design](http://www.google.com/design/spec) specification.

Get started at [http://zavoloklom.github.io/material-design-iconic-font](http://zavoloklom.github.io/material-design-iconic-font)

Download: [v1.1.1 (ZIP)](https://github.com/zavoloklom/material-design-iconic-font/releases/download/v1.1.1/material-design-iconic-font.zip)

##Install
**Bower:**       `bower install material-design-iconic-font`

##Getting started
####BASIC: Default CSS
Use this method to get the default Material Design Iconic Font CSS.
- Download latest version of Material Design Iconic Font.
- Unpack the entire `material-design-iconic-font` archive into your project.
- In the <head> of your html, reference the location to your material-design-iconic-font.min.css.
`<link rel="stylesheet" href="path/to/material-design-iconic-font/css/material-design-iconic-font.min.css">`
- Check out the [Examples pages](http://zavoloklom.github.io/material-design-iconic-font/examples.html) to start using Material Design Iconic Font!

####PRO: Custom LESS/SCSS
Use this method to customize Material Design Iconic Font using LESS or SCSS.
- Download latest version of Material Design Iconic Font.
- Unpack the entire `material-design-iconic-font` archive into your project.
- Open your project's `path/to/material-design-iconic-font/less/variables.less` or `path/to/material-design-iconic-font/scss/_variables.scss` and edit the `@md-font-path` variable to point to your font directory.

> @md-font-path:   "../font";

- You can change prefix `md` to something else by editing `@md-css-prefix` in `path/to/material-design-iconic-font/less/variables.less` or `path/to/material-design-iconic-font/scss/_variables.scss`

> @md-css-prefix:       md;

- Re-compile your LESS if using a static compiler.
- Check out the [Examples pages](http://zavoloklom.github.io/material-design-iconic-font/examples.html) to start using Material Design Iconic Font!

## Licence
The full details of how Material Design Iconic Font is licensed and 'Thanks to' section: [License page](http://zavoloklom.github.io/material-design-iconic-font/license.html).

## Changelog
- v1.1.1 - add bower support and [Cheatsheet page](http://zavoloklom.github.io/material-design-iconic-font/cheatsheet.html)
- v1.1.0 - add SCSS support (thanks to @davidkpiano)
- v1.0.1 - fix bug with battery, charging-battery and wi-fi icons (device section)
- v1.0.0 - add all available icons from [Google](https://github.com/google/material-design-icons)

## Versioning
Material Design Iconic Font will be maintained under the Semantic Versioning guidelines as much as possible. Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* New icons from Google or changes that breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions, including new non-Google icons, without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit http://semver.org.

## Author
- Email: s.kupletsky@gmail.com
- Twitter: https://twitter.com/zavoloklom
- GitHub: https://github.com/zavoloklom/
- CodePen: http://codepen.io/zavoloklom/
- Dribble: https://dribbble.com/zavoloklom (waiting for invite)