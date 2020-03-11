/**
 * 替换字符串 
 */
function transformOptionValue(value) {
  return value.replace(/\$\$$/, '');
}

/**
 * 递归构造新节点
 */
function recursiveLogicalExpression(types, options, members) {
  const node = members.pop();
  if (members.length >= 1) {
    if (options.indexOf(node) > -1) {
      return types.logicalExpression('&&', node, recursiveLogicalExpression(types, options, members));
    } else {
      return recursiveLogicalExpression(types, options, members);
    }
  } else {
    return node;
  }
}

export default function({ types }) {
  return {
    name: 'babel-plugin-tiny--optional-chaining',
    visitor: {
      MemberExpression: {
        enter(path) {
          if (types.isIfStatement(path.parent)) {
            let currentNode = path.node;
            const members = [];
            const options = [];

            // 先将所有的 $$ 转换好
            while(types.isMemberExpression(currentNode)) {
              if (types.isLiteral(currentNode.property)) {
                const literalNode = currentNode.property;
                if (literalNode.value.endsWith('$$')) {
                  const value = transformOptionValue(literalNode.value);
                  literalNode.value = value;
                  literalNode.raw = value;
                  options.push(currentNode);
                }
              } else if (types.isIdentifier(currentNode.property)) {
                const identifierNode = currentNode.property;
                if (identifierNode.name.endsWith('$$')) {
                  const name = transformOptionValue(identifierNode.name);
                  identifierNode.name = name;
                  options.push(currentNode);
                }
              }

              members.push(currentNode);

              currentNode = currentNode.object;
            }

            if (types.isIdentifier(currentNode) && currentNode.name.endsWith('$$')) {
              const name = transformOptionValue(currentNode.name);
              currentNode.name = name;

              options.push(currentNode);
            }

            members.push(currentNode);

            // 存在 optional chaining
            if (options.length > 0) {
              const root = recursiveLogicalExpression(types, options, members);

              path.replaceWith(root);
            }
          }
        }
      }
    }
  }
}