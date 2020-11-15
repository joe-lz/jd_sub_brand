const path = require("path");
const gulp = require("gulp");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const handleErrors = require("./scripts/handleErrors");

console.log(path.resolve(__dirname + "/"));
const alias = require(path.resolve(__dirname + "/config/alias"));
// 删除request
delete alias["@_gen"];
const newAlias = {};
Object.keys(alias).map((aliasKey) => {
  newAlias[aliasKey] = `./${alias[aliasKey]}`;
});

const projectConfig = require(path.resolve(__dirname + "/project.config.json"));
const plugins = {
  less: require("gulp-less"),
  sass: require("gulp-sass"),
  rename: require("gulp-rename"),
  newer: require("gulp-newer"),
};
const compileJsTask = {
  compileTs: {
    path: path.resolve(__dirname + "/**/*.ts"),
    suffix: ".ts",
  },
  compileTsx: {
    path: path.resolve(__dirname + "/**/*.tsx"),
    suffix: ".tsx",
  },
  compileJs: {
    path: path.resolve(__dirname + "/**/*.js"),
    suffix: ".js",
  },
  compileJsx: {
    path: path.resolve(__dirname + "/**/*.jsx"),
    suffix: ".jsx",
  },
};

const compileJs = {};
Object.keys(compileJsTask).forEach(function (taskName) {
  compileJs[taskName] = function () {
    const item = compileJsTask[taskName];
    return gulp
      .src([item.path, `!${path.resolve(__dirname + "/src/app.*")}`, `!${path.resolve(__dirname + "/src/_gen/**/**")}`])
      .pipe(plumber(handleErrors))
      .pipe(
        babel({
          parserOpts: {
            plugins: ["jsx", "typescript", "classProperties", "decorators-legacy", "dynamicImport"],
          },
          plugins: [
            [
              "global-define",
              {
                _SUB_MODULE_NAME: projectConfig.projectname,
              },
            ],
            [
              "module-resolver",
              {
                root: ["./"],
                alias: newAlias,
              },
            ],
          ],
        })
      )
      .pipe(rename({ extname: item.suffix }))
      .pipe(gulp.dest(path.resolve(__dirname, `../${projectConfig.projectname}`)));
  };
});

function compilePageScss() {
  return gulp
    .src([
      path.resolve(__dirname + "/**/*.scss"), 
      `!${path.resolve(__dirname + "/src/_gen/**/**")}`,
      `!${path.resolve(__dirname + "/src/app.scss")}`,
      ])
    .pipe(plumber(handleErrors))
    .pipe(plugins.sass())
    .pipe(rename({ extname: ".scss" }))
    .pipe(gulp.dest(path.resolve(__dirname, `../${projectConfig.projectname}`)));
}

function copyOtherToDist() {
  return gulp
    .src([
      path.resolve(__dirname + "/**/*"),
      `!${path.resolve(__dirname + "/**/*.less")}`,
      `!${path.resolve(__dirname + "/**/*.scss")}`,
      `!${path.resolve(__dirname + "/**/*.js")}`,
      `!${path.resolve(__dirname + "/**/*.ts")}`,
      `!${path.resolve(__dirname + "/**/*.tsx")}`,
      `!${path.resolve(__dirname + "/**/*.jsx")}`,
      `!${path.resolve(__dirname + "/index.html")}`,
      `!${path.resolve(__dirname + "/**/*.md")}`,
      `!${path.resolve(__dirname + "/src/_gen/**/**")}`
    ])
    .pipe(gulp.dest(path.resolve(__dirname, `../${projectConfig.projectname}`)));
}

exports.build = gulp.parallel(copyOtherToDist, compilePageScss, compileJs.compileTs, compileJs.compileTsx, compileJs.compileJs, compileJs.compileJsx);
