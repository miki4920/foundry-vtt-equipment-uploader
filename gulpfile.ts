const gulp = require('gulp');
const tsPipeline = require('gulp-webpack-typescript-pipeline');

tsPipeline.registerBuildGulpTasks(
    gulp,
    {
        entryPoints: {
            'offlineViewerBundle': __dirname + "/scripts/index.ts"
        },
        outputDir: __dirname + "/dist"
    }
);