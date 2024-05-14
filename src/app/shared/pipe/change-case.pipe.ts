import { Pipe, PipeTransform } from '@angular/core';
import * as changeCase from 'change-case-all';
import { kebabCase } from 'lodash';
@Pipe({
  name: 'changeCase'
})
export class ChangeCasePipe implements PipeTransform {

  transform(value: any, caseType: any): any {
    if (value) {
      switch (caseType) {
        case 'camel':
          // Example: input value = 'hello world', output = 'helloWorld'
          return changeCase.camelCase(value);
        case 'capital':
          // Example: input value = 'hello world', output = 'Hello World'
          return changeCase.capitalCase(value).replace(/([a-z])([0-9])/g, '$1 $2');
        case 'constant':
          // Example: input value = 'hello world', output = 'HELLO_WORLD'
          return changeCase.constantCase(value);
        case 'dot':
          // Example: input value = 'hello world', output = 'hello.world'
          return changeCase.dotCase(value);
        case 'header':
          // Example: input value = 'hello world', output = 'Hello-World'
          return changeCase.headerCase(value);
        case 'no':
          // Example: input value = 'hello world', output = 'hello world'
          return changeCase.noCase(value);
        case 'param':
          // Example: input value = 'hello world', output = 'hello-world'
          return changeCase.paramCase(value);
        case 'pascal':
          // Example: input value = 'hello world', output = 'HelloWorld'
          return changeCase.pascalCase(value);
        case 'path':
          // Example: input value = 'hello world', output = 'hello/world'
          return changeCase.pathCase(value);
        case 'sentence':
          // Example: input value = 'hello world', output = 'Hello world'
          return changeCase.sentenceCase(value);
        case 'snake':
          // Example: input value = 'hello world', output = 'hello_world'
          return changeCase.snakeCase(value);
        case 'kebab':
          // Example: input value = 'hello world', output = 'hello-world'
          return kebabCase(value);
        default:
          return value;
      }
    }
    return value;
  }

}
