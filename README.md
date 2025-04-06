# @maxchang/biome-config

[![npm](https://img.shields.io/npm/v/@maxchang/biome-config?color=444)](https://npmjs.com/package/@maxchang/biome-config)

Max Chang's Biome config preset.

## Convention

- Use recommended rules from [Biome](https://biomejs.dev/linter/rules/#recommended-rules)
- Using spaces as indentation
- Sorted imports, dangling commas
- Single quotes, semicolons as needed

## Features

- Git integration
- Automatic import organization
- Customizable TypeScript, JavaScript, and JSON rules
- Predefined ignore patterns for common files/directories
- [Partial support](https://biomejs.dev/internals/language-support/#html-super-languages-support) for `.vue`, `.svelte`, and `.astro` files

## Usage

Not sure how to set up Biome? Take a look at the [Getting Started](https://biomejs.dev/guides/getting-started/) guide from the official docs.

```bash
pnpm i -D @maxchang/biome-config
```

```bash
yarn add -D @maxchang/biome-config
```

```bash
npm i @maxchang/biome-config --save-dev
```

Extend the config in your `biome.json` file:

```diff
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
+  "extends": ["@maxchang/biome-config"]
}
```

Add the following scripts to your `package.json`:

```json
"scripts": {
  "lint": "biome check",
  "lint:fix": "biome check --write ."
}
```


If you use VS Code, here is a reference [`settings.json`](./.vscode/settings.json), with automatic formatting on save and Biome as the default formatter for languages needed.

## Recipes

### Sort `package.json` keys

Since Biome [has no plans](https://github.com/biomejs/biome/discussions/941#discussioncomment-7715731) to implement something like [prettier-plugin-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson) and currently lacks equivalent rules such as [`jsonc/sort-keys`](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-keys.html)<sup>*</sup>, you can use [sort-package-json](https://github.com/keithamus/sort-package-json) as a workaround.

```bash
pnpx sort-package-json
```

```bash
npx sort-package-json
```

<small>
* While Biome provides an assist action like [useSortedKeys](https://next.biomejs.dev/assist/actions/use-sorted-keys/#how-to-configure), it does not allow customization to sort keys in a specific order.
</small>


## References

[stacksjs/biome-config](https://github.com/stacksjs/biome-config)
