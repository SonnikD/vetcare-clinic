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

function images() {
  return src("src/img/**/*.{jpg,png,svg,gif,ico,webp,avif}", {
    encoding: false,
  }).pipe(dest("dist/img/"));
}

function js() {
  return src("src/js/**/*.js").pipe(dest("dist/js/"));
}

function clean() {
  return del("dist");
}

const build = series(clean, parallel(html, scss, images, js));

function reload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  watch(["src/templates/**/*.twig"], series(html, reload));
  watch(["src/scss/**/*.scss"], series(scss, reload));
  watch(
    ["src/img/**/*.{jpg,png,svg,gif,ico,webp,avif}"],
    series(images, reload),
  );
  watch(["src/js/**/*.js"], series(js, reload));
}

function serve() {
  browserSync.init({ server: { baseDir: "dist" } });
  watchFiles();
}

const dev = series(build, serve);

exports.html = html;
exports.scss = scss;
exports.js = js;
exports.build = build;
exports.dev = dev;
exports.watchFiles = watchFiles;
exports.serve = serve;
exports.default = dev;
