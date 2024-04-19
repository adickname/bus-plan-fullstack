const gulp = require("gulp");
const { exec } = require("child_process");

// Zadanie do instalacji zależności
function installDependencies(cb) {
  exec("npm install", (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
}

function runTests(cb) {
  exec("npm test", (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
}

const build = gulp.series(installDependencies, runTests);

exports.build = build;
