/**
 * Created by Zoltan_Biro on 1/5/2016.
 */

var gulp = require('gulp');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('copyresources', function() {
   gulp.src(['./bower_components/Chartjs/Chart.js','./bower_components/jquery/dist/jquery.js'])
   .pipe(gulp.dest('./web/resources/'));
});