declare var require: (s: string) => any;
const css = require('./styles.css');


export function addOurStyles<T extends {}>(input: T): T {
  const res = { ...input as any };
  Object.keys(css).forEach(function(key) {
    res[key] = (res[key] || '') + ' ' + css[key];
  });
  return res;
};
