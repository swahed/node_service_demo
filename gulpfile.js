const gulp = require("gulp");
const LiveServer = require("gulp-live-server");
const browserSync = require("browser-sync");
const source = require("vinyl-source-stream");

gulp.task("live-server", function(){
	const server = new LiveServer("./server/main.js");
	server.start();
});

gulp.task("copy", function() {
	gulp.src([
		"bower_components/skeleton/css/*.css",
		"bower_components/jquery/dist/jquery.min.js"
		])
	.pipe(gulp.dest("./.tmp"));
});

gulp.task("serve", ["copy", "live-server"], function(){
	browserSync.init(null, {
		proxy: "http://localhost:7777/",
		port:9001
	});
});

