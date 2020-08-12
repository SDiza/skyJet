const path = require('path');
const setProcessEnv = require('../env');

// Добавление ENV переменных в конфигурацию
setProcessEnv(path.join(__dirname, `../../.env.${process.env.NODE_ENV}`));

module.exports = {
  data: (context) => {
    const globalData = path.join(__dirname, `../../${process.env.FOLDER_PRIVATE_BASE}/index.json`);
    const env = { ...process.env };
    context.addDependency(globalData); // Force webpack to watch file
    const data = context.resourcePath.replace('.twig', '.json');
    context.addDependency(data); // Force webpack to watch file
    const mergingData = Object.assign(
      context.fs.readJsonSync(globalData, {throws: false}) || {},
      context.fs.readJsonSync(data, {throws: false}) || {},
      env || {},
      );
    return mergingData;
  },
  namespaces: {
    'App': path.join(__dirname, `../../${process.env.FOLDER_PRIVATE_BASE}`),
  },
  functions: {
    repeat(value, times) {
      return new Array(times + 1).join(value);
    },
    setting() {
      return {};
    },
    path(pathText) {
      return '#';
    },
    checkActiveLink(value) {
      return false;
    },
    knp_pagination_render(value) {
      return 0;
    }
  },
  filters: {
    backwords(value) {
      return value.split(' ').reverse().join(' ');
    },
    trans(value) {
      return value;
    }
  },
  tests: {
    theAnswer(value) {
      return value === 42;
    }
  },
  extend(Twig) {
    Twig.exports.extendTag({
      type: 'echo',
      regex: /^echo\s+(.+)$/,
      next: ["endecho"],
      open: true,
      compile: function (token) {
        var expression = token.match[1];

        token.stack = Twig.expression.compile.apply(this, [{
          type: Twig.expression.type.expression,
          value: expression
        }]).stack;

        delete token.match;
        return token;
      },
      parse: function (token, context, chain) {
        output = Twig.parse.apply(this, [token.output, context]);
        return {
          chain: false,
          // output: Twig.expression.parse.apply(this, [token.stack, context])
          output: output
        };
      }
    });
    Twig.exports.extendTag({
      type: "endecho",
      regex: /^endecho$/,
      next: [],
      open: false
    });
    Twig.exports.extendTag({
      type: 'trans',
      regex: /^trans\s+(.+)$/,
      next: ["endtrans"],
      open: true,
      compile: function (token) {
        // var expression = token.match[1];
        // token.stack = Twig.expression.compile.apply(this, [{
        //     type: Twig.expression.type.expression,
        //     value: expression
        // }]).stack;

        delete token.match;
        return token;
      },
      parse: function (token, context, chain) {
        output = Twig.parse.apply(this, [token.output, context]);
        return {
          chain: false,
          output: output
        };
      }
    });
    Twig.exports.extendTag({
      type: "endtrans",
      regex: /^endtrans$/,
      next: [],
      open: false
    });
    Twig.exports.extendTag({
      type: 'path',
      regex: /^path\s+(.+)$/,
      next: [],
      open: true,
      compile: function (token) {
        var expression = token.match[1];

        token.stack = Twig.expression.compile.apply(this, [{
          type: Twig.expression.type.expression,
          value: expression
        }]).stack;

        delete token.match;
        return token;
      },
      parse: function (token, context, chain) {
        output = Twig.parse.apply(this, [token.output, context]);
        return {
          chain: false,
          // output: Twig.expression.parse.apply(this, [token.stack, context])
          output: output
        };
      }
    });
  },
};
