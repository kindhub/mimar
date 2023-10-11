"use strict";

const gulp = require("gulp"),
	rollup = require('gulp-rollup'),
	concat = require('gulp-concat'),
	svgstore = require('gulp-svgstore'),
	rename = require('gulp-rename'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),
	path = require('path'),
	fs = require('fs'),
	pug = require('gulp-pug'),
	classprefix = require('gulp-class-prefix'),
	htmlclassprefix = require('gulp-html-prefix'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	browsersync = require("browser-sync");

const dist = "./dist/",
	src = "./src/",
	isPage = true;

let getTemplateType = () => isPage ? "page" : "vacancy";

gulp.task("concat-html", () => {
	let files = [
		src + "template/" + getTemplateType() + "/template-start.html"
	];
	if(fs.existsSync(dist + "icons.svg")){
		files.push(dist + "icons.svg");
	}
	files = files.concat([
		dist + "index.html",
		src + "template/" + getTemplateType() + "/template-end.html"
	]);

	return gulp
		.src(files)
		.pipe(concat('index.html'))
		.pipe(gulp.dest(dist))
		.pipe(browsersync.stream())
		.on("end", browsersync.reload);
});

gulp.task("compile-html", () => {
	return gulp
		.src(src + "index.pug")
		.pipe(pug({
			data: {
				"templateType": getTemplateType()
			}
		}))
		.pipe(htmlclassprefix('tmpl-hh__'))
		.pipe(gulp.dest(dist));
});

gulp.task("svg-min", () => {
	return gulp
		.src(src + "icons/*.svg")
		.pipe(rename({
			prefix: 'tmpl-hh__icon-'
		}))
		.pipe(cheerio({
			run: function ($, file) {
				if($('svg').attr('save-fill') === undefined){
					$('[fill]').each(function (index, object) {
						if ($(object).attr('save-fill') === undefined) {
							$(object).removeAttr('fill');
						}
					});
				}
				$('[style]').removeAttr('style');

				let filename = path.basename(file.relative, path.extname(file.relative));
				let replaceUrl = function(object, attribute){
					let newUrl = object.attr(attribute).replace(/url\(#(.+)\)/g, 'url(#' + filename + '_$1)');
					object.attr(attribute, newUrl);
				};
				$('[clip-path]').each(function (index, object) {
					replaceUrl($(object), 'clip-path');
				});
				$('[fill^="url("]').each(function (index, object) {
					replaceUrl($(object), 'fill');
				});
				$('[filter^="url("]').each(function (index, object) {
					replaceUrl($(object), 'filter');
				});

				$('[id]').each(function (index, object) {
					let newId = filename + "_" + $(object).attr('id');
					$(object).attr('id', newId);
				});
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(svgmin({
			cleanupIDs: {
				minify: true
			},
			js2svg: {
				pretty: true
			}
		}))
		.pipe(svgstore({
			inlineSvg: true,
			formatting: {
				indent_size: 10
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('svg').attr({
					style: 'display: block !important; height: 0 !important; width: 0 !important;',
					width: '0',
					height: '0'
				});
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(replace(/(<svg[^>]+>)\s*/g, '$1\n'))
		.pipe(replace(/(<\/.*>)\s*(<symbol[^>]+>|<\/svg>)/g, '$1\n$2'))
		.pipe(gulp.dest(dist))
		.on("end", browsersync.reload);
});

gulp.task("copy-js-libs", () => {
	return gulp
		.src(src + 'js/libs/**/*.js')
		.pipe(gulp.dest(dist + 'js/libs'));
});

gulp.task("copy-template-css", () =>{
	return gulp
		.src(src + 'template/css/*')
		.pipe(gulp.dest(dist + 'css/template'))
});

gulp.task("build-js", () => {
	return gulp
		.src(src + "js/script.js")
		.pipe(rollup({
			allowRealFiles: true,
			input: src + 'js/script.js',
			format: 'iife'
		}))
		.pipe(gulp.dest(dist + 'js'))
		.on("end", browsersync.reload);
});

gulp.task("copy-images", () => {
	return gulp
		.src(src + "images/**/*.*")
		.pipe(gulp.dest(dist + "images"))
		.on("end", browsersync.reload);
});

gulp.task("watch", () => {
	gulp.watch(src + "**/*.pug", gulp.series("compile-html", "concat-html"));
	gulp.watch(src + "images/**/*.*", gulp.parallel("copy-images"));
	gulp.watch(src + "js/**/*.js", gulp.parallel("build-js"));
	gulp.watch(src + "js/libs**/*.js", gulp.parallel("copy-js-libs"));
	gulp.watch(src + "css/**/*.scss", gulp.parallel("build-css"));
	gulp.watch(src + "icons/**/*.svg", gulp.series("svg-min", "compile-html", "concat-html"));

	browsersync.init({
		server: dist,
		port: 4000,
		notify: true
	});
});

gulp.task("build-css", () => {
	return gulp
		.src([
			src + "css/" + getTemplateType() + "/main.scss",
			src + "css/" + getTemplateType() + "/media.scss"
		])
		.pipe(sass())
		.pipe(classprefix('tmpl-hh__', {
			ignored: [/.?\.b-vacancy-desc/]
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest(dist + 'css'))
		.on("end", browsersync.reload);
});

gulp.task("build", gulp.series("svg-min", "copy-template-css", "compile-html", "concat-html", "copy-images", "build-js", "build-css", "copy-js-libs"));
gulp.task("default", gulp.parallel("watch", "build"));