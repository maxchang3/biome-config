# @maxchang/biome-config

<!-- automd:badges color="yellow" license name="@maxchang/biome-config" -->

[![npm version](https://img.shields.io/npm/v/@maxchang/biome-config?color=yellow)](https://npmjs.com/package/@maxchang/biome-config)
[![npm downloads](https://img.shields.io/npm/dm/@maxchang/biome-config?color=yellow)](https://npm.chart.dev/@maxchang/biome-config)
[![license](https://img.shields.io/github/license/maxchang3/biome-config?color=yellow)](https://github.com/maxchang3/biome-config/blob/main/LICENSE)

<!-- /automd -->
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![code style](https://img.shields.io/badge/Max_Chang-black?style=flat&logoColor=black&label=Code%20Style)](https://github.com/maxchang3/biome-config) <sup><s>(Is that really a thing?)</s></sup>

## Convention

- Based on [recommended rules](https://biomejs.dev/linter/rules/#recommended-rules) from Biome
- Using spaces as indentation, default 4 spaces for JS/TS
- Sorted imports, dangling commas
- Single quotes, semicolons as needed

## Features

- Automatic import organization
- Git integration, respects `.gitignore` by default
- Customizable TypeScript, JavaScript, and JSON rules
- Predefined ignore patterns for common files/directories
- [Partial support](https://biomejs.dev/internals/language-support/#html-super-languages-support) for `.vue`, `.svelte`, and `.astro` files

## Usage

Not sure how to set up Biome? Take a look at the [Getting Started](https://biomejs.dev/guides/getting-started/) guide from the official docs.

<!-- automd:pm-install name="@maxchang/biome-config" dev -->

```sh
# ✨ Auto-detect
npx nypm install -D @maxchang/biome-config

# npm
npm install -D @maxchang/biome-config

# yarn
yarn add -D @maxchang/biome-config

# pnpm
pnpm add -D @maxchang/biome-config

# bun
bun install -D @maxchang/biome-config

# deno
deno install --dev npm:@maxchang/biome-config
```

<!-- /automd -->

Extend the config in your `biome.json` file:

<!-- automd:pkg file=./package.json -->

<!-- template
```json
{
  "$schema": "https://biomejs.dev/schemas/{{ devdeps."@biomejs/biome" }}/schema.json",
  "extends": ["{{ name }}"],
}
```
-->
```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.13/schema.json",
  "extends": ["@maxchang/biome-config"],
}
```

<!-- /automd -->

Add the following scripts to your `package.json`:

<!-- automd:pkg file=./package.json -->

<!-- template
```json
"scripts": {
  "lint": "{{ scripts.lint }}",
  "lint:fix": "{{ scripts.lint:fix }}"
}
```
-->
```json
"scripts": {
  "lint": "biome check",
  "lint:fix": "biome check --write ."
}
```

<!-- /automd -->


## Recipes

### VS Code Settings

If you use VS Code, here is a reference [`settings.json`](./.vscode/settings.json), with automatic formatting on save and Biome as the default formatter for languages needed.

<!-- automd:file src=".vscode/settings.json" code -->

```json [settings.json]
{
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[css]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

<!-- /automd -->

### Sort `package.json` keys

Since Biome [has no plans](https://github.com/biomejs/biome/discussions/941#discussioncomment-7715731) to implement something like [prettier-plugin-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson) and currently lacks equivalent rules such as [`jsonc/sort-keys`](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-keys.html)<sup>*</sup>, you can use [sort-package-json](https://github.com/keithamus/sort-package-json) as a workaround.

<!-- automd:pm-x version="latest" name="sort-package-json" -->

```sh
# npm
npx sort-package-json@latest

# pnpm
pnpm dlx sort-package-json@latest

# bun
bunx sort-package-json@latest

# deno
deno run -A npm:sort-package-json@latest
```

<!-- /automd -->


<sub>
* While Biome provides an assist action like <a href="https://next.biomejs.dev/assist/actions/use-sorted-keys/#how-to-configure">useSortedKeys</a>, it does not allow customization to sort keys in a specific order.
</sub>

### Git Hooks
I recommend using [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) with [lint-staged](https://github.com/okonet/lint-staged) to run Biome checks before committing code.

Install the required dependencies:

```sh
# ✨ Auto-detect
npx nypm install -D simple-git-hooks lint-staged

# npm
npm install -D simple-git-hooks lint-staged

# yarn
yarn add -D simple-git-hooks lint-staged

# pnpm
pnpm add -D simple-git-hooks lint-staged

# bun
bun install -D simple-git-hooks lint-staged

# deno
deno install --dev npm:simple-git-hooks lint-staged
```

Add the following configuration to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*": "biome check --no-errors-on-unmatched --files-ignore-unknown=true"
  }
}
```

then initialize the git hooks:

<!-- automd:pm-x version="latest" name="simple-git-hooks" -->

```sh
# npm
npx simple-git-hooks@latest

# pnpm
pnpm dlx simple-git-hooks@latest

# bun
bunx simple-git-hooks@latest

# deno
deno run -A npm:simple-git-hooks@latest
```

<!-- /automd -->

## References

- [stacksjs/biome-config](https://github.com/stacksjs/biome-config)
- [antfu/eslint-config](https://github.com/antfu/eslint-config)
- [maxchang3/eslint-config](https://github.com/maxchang3/eslint-config)

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
