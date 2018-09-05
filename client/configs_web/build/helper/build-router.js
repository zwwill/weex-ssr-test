// Add template to watchers
// this.options.build.watch.push(src)
// Render template to dst
const { remove, readFile, writeFile, mkdirp, existsSync } = require('fs-extra')
const hash = require('hash-sum')
const serialize = require('serialize-javascript')
const _ = require('lodash')
const router = require('../../src/router')
const { relative, resolve, sep } = require('path')

function relativeToBuild(path) {
    return relativeTo(resolve(__dirname, '..'), path)
}

const isWindows = (exports.isWindows = /^win/.test(process.platform))

const getChunkName = (exports.getChunkName = function getChunkName(route) {
    /* istanbul ignore if */
    let paths = route.component.split('/')
    if (!paths.length) return ''
    let fileName = paths[paths.length - 1]

    if (fileName.indexOf('.') !== -1) {
        let fileNameArr = fileName.split('.')
        if (fileNameArr.length > 2) {
            fileNameArr.splice(fileNameArr.length - 1, 1)
            fileName = fileNameArr.join('.')
        } else {
            fileName = fileNameArr[0]
        }
    }

    let p = 'pages/' + fileName
    if (isWindows) {
        return p.replace(/\//g, '_')
    }
    return p
})

const wp = (exports.wp = function wp(p = '') {
    /* istanbul ignore if */
    if (isWindows) {
        return p.replace(/\\/g, '\\\\')
    }
    return p
})

const reqSep = /\//g
const sysSep = _.escapeRegExp(sep)
const normalize = string => string.replace(reqSep, sysSep)

const r = (exports.r = function r() {
    let args = Array.prototype.slice.apply(arguments)
    let lastArg = _.last(args)

    if (lastArg.indexOf('@') === 0 || lastArg.indexOf('~') === 0) {
        return wp(lastArg)
    }

    return wp(resolve('src/router', ...args.map(normalize)))
})


const relativeTo = (exports.relativeTo = function relativeTo() {
    let args = Array.prototype.slice.apply(arguments)
    let dir = args.shift()

    // Resolve path
    let path = r(...args)

    // Check if path is an alias
    if (path.indexOf('@') === 0 || path.indexOf('~') === 0) {
        return path
    }

    // Make correct relative path
    let rp = relative(dir, path)
    if (rp[0] !== '.') {
        rp = './' + rp
    }
    return wp(rp)
})

let src = resolve(__dirname, './router-template.js')

module.exports = async function () {

    const fileContent = await readFile(src, 'utf8')
    let content
    try {
        const template = _.template(fileContent, {
            imports: {
                serialize,
                hash,
                getChunkName,
                relativeToBuild: relativeToBuild,
                uniqBy: _.uniqBy
            }
        })
        content = template({
            router
        })
    } catch (err) {
        /* istanbul ignore next */
        throw new Error(`Could not compile template ${src}: ${err.message}`)
    }
    // Write file
    let writePath = resolve(__dirname, '../router.js')
    await writeFile(writePath, content, 'utf8')
}
