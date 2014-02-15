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

Add a file named test.js (or whatever you want) to the root of your project with the following text:

    var testRunner = require('path/to/MyTestRunner.js');
    testRunner.runTests(__dirname, process.argv[2]);

Now you can run all your tests with:

	node test.js

Or, run a specific test with:

	node test.js /path/to/test/file.js