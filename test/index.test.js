import * as babel from '@babel/core';
import myPlugin from '../src/index';

test('test', () => {
  const code = 'const test = a.b.c.d';
  const result = babel.transform(code, {
    plugins: [
      myPlugin
    ]
  })
});