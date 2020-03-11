import * as babel from '@babel/core';
import myPlugin from '../src/index';

describe('plugin test', () => {
  it('test case 1', () => {
    const code = 'const test = a.b.c.d';
    const result = babel.transform(code, {
      plugins: [
        myPlugin
      ]
    });

    expect(result.code).toBe('const test = a.b.c.d;');
  });

  it('test case 2', () => {
    const code = 'if (a$$.b$$.c.d$$.e) {}';
    const result = babel.transform(code, {
      plugins: [
        myPlugin
      ]
    });

    expect(result.code).toBe('if (a && a.b && a.b.c.d && a.b.c.d.e) {}');
  });

  it('test case 3', () => {
    const code = 'if (a.b.c.d.e) {}';
    const result = babel.transform(code, {
      plugins: [
        myPlugin
      ]
    });

    expect(result.code).toBe('if (a.b.c.d.e) {}');
  });
});