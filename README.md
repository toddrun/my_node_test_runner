my_node_test_runner
===================

Super simple test runner for locating and running node tests. This allows you to add directories to your node project,
each with their own test directory.

project
    a_directory
        AFile.js
        test
            AFileTest.js
    node_modules
    some_directory
        MyThing.js
        test
            MyThingTest.js


Usage:

Add a file to the root of your project with the following text:

    var testRunner = require('path/to/MyTestRunner.js');
    testRunner.runTests(__dirname);
