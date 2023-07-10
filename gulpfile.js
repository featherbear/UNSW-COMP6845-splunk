const { watch, src, dest, task, symlink, parallel, series } = require('gulp')
const newer = require('gulp-newer')

function setupCopier(srcGlob, destPath) {
    let runner = function (next) {
        src(srcGlob)
            .pipe(newer(destPath))
            .pipe(dest(destPath))
        return next()
    }
    runner.displayName = "Copy " + srcGlob
    return runner
}

function setupWatcher(srcGlob, destPath) {
    return watch(
        srcGlob,
        { ignoreInitial: false },
        setupCopier(srcGlob, destPath)
    )
}

exports.start = task('start', (next) => {
    const { spawn } = require('child_process');
    const path = require('path')

    let proc = spawn(path.normalize("./node_modules/.bin/vite" + (process.platform === 'win32' ? '.cmd' : '')), { cwd: 'base' })
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe((process.stderr))
    proc.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString());
        next()
    });
})

exports.watch = task('watch', () => {
    setupWatcher('content/recordings/**', 'base/public/asciinema/recordings/')
    setupWatcher('content/sections/images/**', 'base/public/images/')
    setupWatcher('content/sections/*.svx', 'base/src/sections/')
    setupWatcher('content/pages.ts', 'base/src/pages.ts')
})

exports.copy = task('copy', series(
    setupCopier('content/recordings/**', 'base/public/asciinema/recordings/'),
    setupCopier('content/sections/images/**', 'base/public/images/'),
    setupCopier('content/sections/*.svx', 'base/src/sections/'),
    setupCopier('content/pages.ts', 'base/src/pages.ts'))
)

exports.default = parallel('watch', 'start')

