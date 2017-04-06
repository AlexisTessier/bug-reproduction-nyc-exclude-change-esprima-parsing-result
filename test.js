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
*        argument: [Object],
*        prefix: true },
*      Literal { type: 'Literal', value: 'option', raw: '\'option\'' } ] }
*/