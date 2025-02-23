# sentence [![Build Status](https://travis-ci.org/nickb1080/sentence.svg?branch=master)](https://travis-ci.org/nickb1080/sentence)

Beautiful assertions for CoffeeScript. See the test file for examples.

Looks like this:

```coffeescript
expect(a) to equal b

expect(c) to exist

expect(d) to nt equal e

expect([]) to have length 0
```

This assertion DSL is designed to take advantage of CoffeeScript's largely parenthesis-free syntax. Don't use it with plain JS unless you want assertions that look like this

```js
expect({})(to(nt(be(an(Array)))));
```

In many cases CoffeeScript's terse syntax is especially great for writing unit tests, since there tends to be lots of boilerplate and repeated code, and tons of `it` and `describe` blocks to close. Even for projects written in regular JS, testing with CoffeeScript is excellent. While not as full-featured as libraries like Chai, `sentence` provides a basic set of assertions that will cover most use cases. 

Admittedly, I've focused on keeping the code itself as pretty as possible. A number of features are infeasible with the current approach.

#### `equal`
```coffeescript
expect(1) to equal 1
```
Assert that two values are equal.

#### `eql`/`deep_equal`
```coffeescript
expect(a: "b", c: "d") to eql a: "b", c: "d"
```
Assert that two values are deeply equal. Uses the [`deep-equal`](https://github.com/substack/node-deep-equal) package, with the **strict** option **enabled**.

#### `greater`
```coffeescript
expect(2) to be greater than 1
```
Assert that a value is greater than another value.

#### `less`
```coffeescript
expect(1) to be less than 2
```
Assert that a value is less than another value

#### `contain`
```coffeescript
expect("hello there") to contain "hello"
```
Assert that one value contains another value (using `indexOf`). Supports strings and arrays.

#### `have`
```coffeescript
expect(name: "Nick") to have("name") "Nick"
```
Assert that an object has a property equal to a value.

#### `match`
```coffeescript
expect("hello there") to match /hello/
```
Assert that a string satisfies a regular expression.

#### `an` `a`
```coffeescript
expect([]) to be an Array
expect("") to be a String
expect(true) to be an Object # fails
```
Assert that an object is an instance of a constructor. Doing `expect(x) to nt be an Object` tests if `x` is a primitive value (i.e. string, number, boolean, symbol)

#### `exist`
```coffeescript
expect(0) to exist
```
Assert that a value is not `null` or `undefined`


#### `empty`
```coffeescript
expect({}) to be empty
```

Assert that an object has no own enumerable keys, or if an array that it's length is zero.

#### `ok`
```coffeescript
expect(1) to be ok
```
Assert that a value is truthy

#### `error`
```coffeescript
expect(-> throw new Error) to error
```
Assert that a function throws an error when called

#### `length`
```coffeescript
expect([1,2,3]) to have length 3
```
Special function for "has" in the common case of checking an object's length


#### `nt` ('not' is a reserved word in CoffeeScript)
```coffeescript
# these all pass
expect(false) to nt be ok
expect(null) to nt exist
expect([1]) to nt be empty
expect({}) to nt be an Array
expect([1]) to nt have length 2
expect([]) to nt contain 1
expect(->) to nt error
expect("a") to nt match /b/
expect(x: "y") to nt have("x") "z"
```

Reverse an assertion chain
