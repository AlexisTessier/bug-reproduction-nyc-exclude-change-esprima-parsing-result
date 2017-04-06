## Expected Behavior

- When I use the nyc.exclude option defined in the package.json
- And in my tests, I use esprima in order to parse javascript string
- The result of esprima.parse still should be correct

## Observed Behavior

```javascript
'use strict';

const esprima = require('esprima');

function mockFunction({
	option = 'option'
} = {}){};

const parsed = esprima.parse(mockFunction.toString()).body[0];

const ObjectPatternProperties = parsed.params[0].left.properties;

/*
* We expect from the following lines to log the same results,
* no matter if we use the exclude option or not, but:
*/

console.log('------------------------------------');
console.log(ObjectPatternProperties[0].value.right);
console.log('------------------------------------');

/*
* ----------------------
* Without exclude option
* ----------------------
* 
* ObjectPatternProperties[0].value.right => Literal { type: 'Literal', value: 'option', raw: '\'option\'' }
*
* -------------------
* With exclude option
* -------------------
* 
* ObjectPatternProperties[0].value.right => SequenceExpression {
*   type: 'SequenceExpression',
*   expressions: 
*    [ UpdateExpression {
*        type: 'UpdateExpression',
*        operator: '++',
*        argument: [Object],∏
*        prefix: true },
*      Literal { type: 'Literal', value: 'option', raw: '\'option\'' } ] }
*/javascript
```

## Bonus Points! Code (or Repository) that Reproduces Issue



## Forensic Information

**Operating System:** the operating system you observed the issue on.
**Environment Information:** information about your project's environment, see instructions below:

1. run the following script:

sh -c 'node --version; npm --version; npm ls' > output.txt

2. share a gist with the contents of output.txt.
