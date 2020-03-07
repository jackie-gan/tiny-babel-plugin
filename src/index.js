import * as t from '@babel/types';

export default function() {
  return {
    name: 'tiny-babel-plugins',
    visitor: {
      MemberExpression(path) {
        console.log('MemberExpression');
      }
    }
  }
}