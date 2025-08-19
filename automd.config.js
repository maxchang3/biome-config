import fs from 'node:fs/promises'
import { defineGenerator } from 'automd'

/** @type {import("automd").Config} */
export default {
    file: 'README.md',
    generators: {
        pkg: pkgGenerator(),
    },
}

/**
 * Package.json specialized template generator
 *
 * Features:
 * - Top-level fields: {{ name }}, {{ version }}, etc.
 * - Dependencies: {{ deps.lodash }}, {{ devdeps.typescript }}
 * - Scoped packages: {{ devdeps."@biomejs/biome" }}
 * - Scripts: {{ scripts.build }}, {{ scripts."build:dev" }}
 * - Automatically removes ^ or ~ prefix from version strings
 *
 */
function pkgGenerator() {
    return defineGenerator({
        name: 'pkg',
        async generate({ args, block }) {
            if (!args.file) throw new Error('file is required')

            const pkg = JSON.parse(await fs.readFile(args.file, 'utf-8'))

            // Extract only the content between `<!-- template` and `-->`
            const match = block.contents.match(/<!-- template([\s\S]*?)-->/)
            if (!match) throw new Error('Template markers <!-- template ... --> not found')
            const templateStr = match[1]

            // Generate processed template
            const generated = template(templateStr, pkg)

            return {
                contents: `<!-- template${templateStr}-->${generated}\n`,
            }
        },
    })
}

/**
 * Simple template replacement
 * @param {string} str - Template string
 * @param {object} pkg - Parsed package.json object
 */
function template(str, pkg) {
    const regex = /\{\{\s*([^}]+)\s*\}\}/g
    return str.replace(regex, (_, path) => {
        const val = getPkgValue(pkg, path)
        return val != null ? val : ''
    })
}

/**
 * Retrieve a value from package.json by path
 * Supports deps/devdeps/scripts with quoted keys for scoped packages or special names
 * @param {object} obj - Parsed package.json object
 * @param {string} path - Path string like "devdeps.\"@biomejs/biome\"" or "scripts.start"
 * @returns {string|undefined} - Value at path or undefined
 */
function getPkgValue(obj, path) {
    path = path.trim()
    if (path.startsWith('deps.')) path = 'dependencies.' + path.slice(5)
    if (path.startsWith('devdeps.')) path = 'devDependencies.' + path.slice(8)

    // Split path by dot, respecting quoted keys
    const parts = path.match(/(?:[^."']+|"(?:[^"]+)"|'(?:[^']+)')/g)?.map((k) => k.replace(/^['"]|['"]$/g, '')) || []

    let val = parts.reduce((acc, key) => acc?.[key], obj)
    if (typeof val === 'string') val = val.replace(/^[\^~]/, '') // Remove ^ or ~ prefix
    return val
}
