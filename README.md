# grunt-psi-html-report

> Creates html report of Google's PageSpeed Insights scores for multiple urls.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-psi-html-report --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-psi-html-report');
```

## The "psi_html_report" task

### Overview
In your project's Gruntfile, add a section named `psi_html_report` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  psi_html_report: {
    default_options: {
        options: {
          urls:["https://www.google.com","https://www.youtube.com"]
        }, 
      }
  },
});
```

### Options

#### options.urls
Type: `Array`
Default value: `["https://www.google.com"]`

An array of urls on which PageSpeed Insights psi command is to be run.


### Usage Examples

#### Default Options
In this example, there are two urls in array. Results can be seen in screenshot below.

```js
grunt.initConfig({
  psi_html_report: {
    default_options: {
        options: {
          urls:["https://www.youtube.com","https://www.twitter.com"]
        }, 
      }
  },
});
```
![HTML Report](/assets/example-report.png?raw=true "Report Example")


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
