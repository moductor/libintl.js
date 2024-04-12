# libintl

JavaScript bindings for [GetText](https://www.gnu.org/software/gettext/) implementations.

---

`libintl` provides a JavaScript bindings for the C GetText API.

## Usage

First of all you need to have one of the GetText implementing libraries installed on your system. `libintl` doesn't ship any by default.

When the library is initialized, it's automatically looking for `glib`, `libintl` and `libc` in the known paths. You can also specify the path to the shared library manually.

### Initialization

First of all the library needs to be initialized:

```javascript
import { init } from "libintl";

init();
```

The lirary is initialized automatically, so this is optional, if you don't need to specify the shared library path manually. If yes, you need to run the function with the shared library path as an argument:

```javascript
import { init } from "libintl";

init("/usr/lib64/libc.so.6");
```

If loading of the library fails, `Error` is thrown.

### Initial configuration

Next, you need to initialize the locale data:

```javascript
import {
  setLocale,
  bindTextDomain,
  bindTextDomainCodeset,
  textDomain,
  LC,
} from "libintl";

setLocale(LC.all, "");
bindTextDomain("my_text_domain", "/usr/share/locale");
bindTextDomainCodeset("my_text_domain", "UTF-8");
textDomain("my_text_domain");
```

For more information you can check the links bellow:

- https://www.gnu.org/software/gettext/manual/html_node/Triggering.html
- https://docs.gtk.org/glib/i18n.html

### Marking strings as translatable

The most common use case could look similar to this:

```javascript
import format from "@stdlib/string-format";
import {
  setLocale,
  bindTextDomain,
  bindTextDomainCodeset,
  textDomain,
  gettext as _,
  gettext,
  ngettext,
  LC,
} from "libintl";

setLocale(LC.all, "");
bindTextDomain("my_text_domain", "/usr/share/locale");
bindTextDomainCodeset("my_text_domain", "UTF-8");
textDomain("my_text_domain");

console.log(_("Hello, GetText!"));

console.log(gettext("You can also use the `gettext` function directly."));

const count = 10;
console.log(
  format(
    ngettext(
      "The directory contains %d file.",
      "The directory contains %d files.",
      count,
    ),
    count,
  ),
);
```

## String extraction

Fortunately, JavaScript is natively supported by the official `xgettext` program.

### Using `xgettext`

The program can be run with the `xgettext` command.

The most common usage could look like:

```bash
xgettext --from-code=UTF-8 -F my_source_file.js -o my_text_domain.pot --package-name=my_text_domain
```
