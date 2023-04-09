const chalk = require('cli-color');

Object.defineProperty(global, '__stack', {
  get: function () {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };
    var err = new Error();
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  },
});

Object.defineProperty(global, '__line', {
  get: function () {
    return __stack[1].getLineNumber();
  },
});

Object.defineProperty(global, '__function', {
  get: function () {
    return __stack[1].getFunctionName();
  },
});


function logGreen(message, func, line) {
  console.log(
    chalk.green(`${message}, function called from: ${func}, line: ${line} `)
  );
}

function logBlue(message, func, line) {
  console.log(
    chalk.blue(`${message}, function called from: ${func}, line: ${line} `)
  );
}

function logRed(message, func, line) {
  console.log(
    chalk.red(`${message}, function called from: ${func}, line: ${line} `)
  );
}

module.exports = { logBlue, logGreen, logRed };
