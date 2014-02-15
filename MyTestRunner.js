var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var opts = {'reporter': 'spec'};
var mocha = new Mocha(opts);

exports.runTests = function(directory, testToRun) {

    if (testToRun) {
        mocha.addFile(directory + '/' + testToRun);
    } else {
        add_test_files(mocha, directory);
    }

    mocha.run(function(failures){
        process.on('exit', function () {
            process.exit(failures);
        });
    });
};

var add_test_files = function(mocha, directory) {
    if (!is_directory(directory)) {
        return;
    }

    if (is_test_directory(directory)) {
        add_all_tests(mocha, directory);
        return;
    }

    var subdirs = get_subdirectories(directory);
    subdirs.forEach(function(subdir) {
        add_test_files(mocha, directory + '/' + subdir);
    });
};

var add_all_tests = function (mocha, directory) {

    var filenames = fs.readdirSync(directory);
    filenames.forEach(function(file) {
        if (name_ends_with(file, 'test.js') || name_ends_with(file, 'Test.js')) {
            mocha.addFile(directory + '/' + file);
        } else if (is_directory(directory + '/' + file)) {
            add_all_tests(mocha, directory + '/' + file);
        }
    });
};

var get_subdirectories = function(directory) {
    var filenames = fs.readdirSync(directory);
    var subdirs = [];
    filenames.forEach(function(file) {
        if (!name_ends_with(file, "node_modules") && !file.indexOf('.') == 0) {
            subdirs.push(file);
        }
    });

    return subdirs;
};

var is_test_directory = function(directory) {
    if (name_ends_with(directory, "test") || name_ends_with(directory, "testcases")) {
        return is_directory(directory);
    }
    return false;
};

var is_directory = function(directory) {
    var stat = fs.statSync(directory);
    return stat.isDirectory();
};

var name_ends_with = function(directory, ending) {
    return directory.indexOf(ending, directory.length - ending.length) !== -1;
};
