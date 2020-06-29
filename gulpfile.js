var gulp = require('gulp');
var util = require('util');
var clear = require('clear');
var spawn = require('child_process').spawn;
var fs = require('fs');
var parseString = require('xml2js').parseString;

function coverageReport(done) {
  fs.readFile('/tmp/coverage.xml', 'utf8', function(err, data) {
    if (err) return done(err);
    parseString(
      data,
      function(err, result) {
        try {
          if (err) return console.error(err);
          const classes = [];

          function onClass(x) {
            const { name } = x.$;
            if('Database\\__HACK_DB__' == name) return;

            const metrics = x.metrics[0].$;
            classes.push({name, ...metrics});
          }

          function onFile(x) {
            x.class.forEach(onClass);
          }

          function onPackage(x) {
            x.file.forEach(onFile);
          }
          const packages = result.coverage.project[0].package;
          packages.forEach(onPackage);

          function topClassesBy(name, reversed=false) {
            reversed = reversed ? -1 : 1;
            classes.sort((a, b) => (a[name] - b[name]) * reversed);
            console.log(`Top classes by ${name}:`);
            classes.slice(0, 5).forEach(x => {
              console.log(`${x.name}\t\t${x[name]}`);
            })
          }
          topClassesBy('coveredelements');
          console.log(' ');
        } finally {
          done();
        }
      }
    );
  });
}

gulp.task('phpunit', function(cb) {
  clear();
  spawn('composer', ['dump-autoload', '-o'], {stdio: "inherit"}).on('close', _ => {
    spawn('./vendor/bin/phpunit', ['phptests'], {stdio: "inherit"})
      .on('close', _ => {
        coverageReport(() => cb(null));
      });
  });
});

gulp.task('jest', function(cb) {
  clear();
  spawn('./node_modules/.bin/jest', [], {stdio: "inherit"}).on('close', _ => cb(null));
});

gulp.task('eslint', function(cb) {
  spawn('./node_modules/.bin/eslint', ['./src/'], {stdio: "inherit"}).on('close', _ => cb(null));
});

gulp.task('default', function() {
    gulp.watch(['public/**/*.php', 'phptests/**/*.php'], { debounceDelay: 500 }, gulp.series('phpunit'));
    gulp.watch(['src/**/*.js'], { debounceDelay: 500 }, gulp.series('jest'));
});

coverageReport(()=>{});
