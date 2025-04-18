
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import { ComponentData } from './themeConverter';

export interface AnalysisResult {
  components: string[];
  hooks: string[];
  dependencies: string[];
  stateVariables: string[];
  props: string[];
}

export const analyzeReactCode = (code: string): AnalysisResult => {
  const analysis: AnalysisResult = {
    components: [],
    hooks: [],
    dependencies: [],
    stateVariables: [],
    props: []
  };

  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });

    // Call traverse directly since it's imported as default
    traverse(ast, {
      ImportDeclaration(path) {
        analysis.dependencies.push(path.node.source.value);
      },
      CallExpression(path) {
        if (t.isIdentifier(path.node.callee) && path.node.callee.name.startsWith('use')) {
          analysis.hooks.push(path.node.callee.name);
        }
      },
      VariableDeclarator(path) {
        if (
          t.isArrayPattern(path.node.id) &&
          t.isCallExpression(path.node.init) &&
          t.isIdentifier(path.node.init.callee) &&
          path.node.init.callee.name === 'useState' &&
          path.node.id.elements[0] &&
          t.isIdentifier(path.node.id.elements[0])
        ) {
          // Make sure the first element exists and is an Identifier before accessing .name
          analysis.stateVariables.push(path.node.id.elements[0].name);
        }
      }
    });

    return analysis;
  } catch (error) {
    console.error('Code analysis error:', error);
    throw new Error('Could not analyze component code');
  }
};

export const generatePreview = (componentData: ComponentData): string => {
  const analysis = analyzeReactCode(componentData.code);
  
  return `
// Component Preview
import React from 'react';
${analysis.dependencies.map(dep => `import ${dep} from '${dep}';`).join('\n')}

const ${componentData.name} = () => {
  ${analysis.hooks.map(hook => `const ${hook.toLowerCase()} = ${hook}();`).join('\n')}
  
  return (
    <div className="preview">
      {/* Component Structure */}
    </div>
  );
};

export default ${componentData.name};
`.trim();
};
