## Expected Behavior

- When I use the nyc.exclude option defined in the package.json
- And in my tests, I use esprima in order to parse javascript string
- The result of esprima.parse still should be correct

## Observed Behavior

- I use [ava](https://www.npmjs.com/package/ava) for some tests
- I run the command nyc ava
- I have a test.js file which contain the following content

```javascript
//test.js

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
*/
```

## Bonus Points! Code (or Repository) that Reproduces Issue

[https://github.com/AlexisTessier/bug-reproduction-nyc-exclude-change-esprima-parsing-result](https://github.com/AlexisTessier/bug-reproduction-nyc-exclude-change-esprima-parsing-result)

```
npm i //will install ava, nyc and esprima
```

Then use or not the nyc.exclude option in the package.json and :

```
npm run bug //it's just => nyc ava
```

If the bug isn't just on my machine, you should see different logs for the same value,
depending if you active or not the option

Also, ava will throw an error because test.js doesn't contains ava tests, but this one is normal.

## Forensic Information

**Operating System:** macOS Sierra Version 10.12.3
**Environment Information:**
- node v6.9.1
- npm v3.10.8

1. run the following script:

sh -c 'node --version; npm --version; npm ls' > output.txt

2. share a gist with the contents of output.txt.

[https://gist.github.com/AlexisTessier/17bd56cd789c6fac95941c7676df68c6](https://gist.github.com/AlexisTessier/17bd56cd789c6fac95941c7676df68c6)
