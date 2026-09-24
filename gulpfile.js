const { src, dest, series, parallel, watch } = require("gulp");
const twig = require("gulp-twig");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const del = require("del");
const browserSync = require("browser-sync").create();

function html() {
  return src("src/templates/pages/*.twig")
    .pipe(twig({ base: "src/templates" }))
    .pipe(dest("dist"));
}

function scss() {
  const plugins = [autoprefixer()];
  return src("src/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest("dist/css"));
}

function clean() {
  return del("dist");
}

const build = series(clean, parallel(html, scss));

function reload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  watch(["src/templates/**/*.twig"], series(html, reload));
  watch(["src/scss/**/*.scss"], series(scss, reload));
}

function serve() {
  browserSync.init({ server: { baseDir: "dist" } });
  watchFiles();
}

exports.html = html;
exports.scss = scss;
exports.build = build;
exports.watchFiles = watchFiles;
exports.serve = serve;
