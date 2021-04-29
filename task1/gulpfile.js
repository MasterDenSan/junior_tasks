let project_folder = "dist"
let source_folder = "src"

//Основные пути
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/**/*.{ttf,eot,otf,svg,TTF,woff,woff2}",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browser_sync = require("browser-sync").create(),
    file_include = require("gulp-file-include"),
    del = require("del"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify_es = require("gulp-uglify-es").default,
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    svg_sprite = require('gulp-svg-sprite')


function browserSync() {
    browser_sync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

// создание финального html
function html() {
    return src(path.src.html)
        .pipe(file_include())
        .pipe(dest(path.build.html))
        .pipe(browser_sync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browser_sync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(concat('all.js'))
        .pipe(dest(path.build.js))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(
            uglify_es()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browser_sync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3,
            svgoPlugins: [
                {
                    removeViewBox: false
                }
            ]
        }))
        .pipe(dest(path.build.img))
        .pipe(browser_sync.stream())
}


function sprite() {
    return gulp.src([source_folder + '/icon_sprite/*.svg'])
        .pipe(svg_sprite({
                mode: {
                    stack: {
                        sprite: '../sprites/sprite.svg',
                        example: true
                    }
                },
            }
        ))
        .pipe(dest(path.build.img))
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}

// вотчер изменений
function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clianer() {
    return del(path.clean);
}


//Сценарий выполнения
let build = gulp.series(clianer, gulp.parallel(css, html, js, images, sprite, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fonts = fonts;
exports.sprite = sprite;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
