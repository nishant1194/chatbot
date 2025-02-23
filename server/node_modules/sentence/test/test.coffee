do require("../src").globals

catch_it = (fn) ->
  try
    do fn
  catch e
    return String e
  throw new Error "No error thrown."

describe "sentence", ->

  it "equal", ->
    expect(1) to equal 1
    expect(-> expect(2) to equal 1) to error

    # the label
    expect(catch_it -> expect(2) to equal 1) to equal "Error: expected 2 to equal 1"

  it "eql/deep_equal", ->
    expect([1, 2, 3]) to eql [1, 2, 3]
    expect(-> expect([1, 2, 3]) to eql [2, 3, 4]) to error

    # the label
    expect(catch_it -> expect([1, 2, 3]) to eql [2, 3, 4]) to equal "Error: expected [2,3,4] to deep equal [1,2,3]"

  xit "not_equal", ->
    expect(1) to not_equal 2
    expect(-> expect(1) to nt equal 1) to error

  it "greater", ->
    expect(2) to be greater than 1
    expect(-> expect(1) to be greater than 2) to error
    expect(greater) to equal gt
    expect(greater) to equal greater_than

    # the label
    expect(catch_it -> expect(1) to be greater than 2) to equal "Error: expected 1 to be greater than 2"

  it "less", ->
    expect(1) to be less than 2
    expect(-> expect(2) to be less than 1) to error
    expect(less) to equal lt
    expect(less) to equal less_than

    # the label
    expect(catch_it -> expect(2) to be less than 1) to equal "Error: expected 2 to be less than 1"

  it "contain/include", ->
    expect("abcde") to include "bcd"
    expect(-> expect("abcde") to include "xyz") to error

    expect([1, 2, 3]) to include 2
    expect(-> expect([1, 2, 3]) to include 4) to error

    # the alias
    expect include to equal contain

    # the label
    expect(catch_it -> expect([1]) to include 2) to equal "Error: expected [1] to contain 2"


  it "length", ->
    o = length: 5
    a = [1, 2, 3, 4, 5]
    expect(a) to have length 5
    expect(o) to have length 5
    expect(-> expect(a) to have length 6) to error
    expect(-> expect(o) to have length 6) to error

    # the label
    expect(catch_it -> expect([]) to have length 1) to equal "Error: expected [] to have `length` 1"

  it "match", ->
    expect("hello") to match /ell/
    expect(-> expect("heyo") to match /ell/) to error

    # the label
    expect(catch_it -> expect("heyo") to match /ell/) to equal "Error: expected \"heyo\" to match /ell/"

  it "have", ->
    o = prop: "val"
    expect(o) to have("prop") "val"
    expect(-> expect(o) to have("prop") "nope") to error

    # the label
    expect(catch_it -> expect({}) to have("prop") "nope") to equal "Error: expected property \"prop\" of {} to equal \"nope\""

  it "error", ->
    expect(-> expect(1) to equal 2) to error

    # the label
    expect(catch_it -> expect(->) to error) to equal "Error: expected function to throw an error"

  it "ok", ->
    expect(true) to be ok
    expect(-> expect(false) to be ok) to error

    # the label
    expect(catch_it -> expect(false) to be ok) to equal "Error: expected false to be truthy"

  it "exist", ->
    expect(-> expect(null) to exist) to error
    expect(-> expect(undefined) to exist) to error
    expect(1) to exist

    # the label
    expect(catch_it -> expect(null) to exist) to equal "Error: expected null to exist"

  it "empty", ->
    expect([]) to be empty
    expect({}) to be empty
    expect(-> expect([1]) to be empty) to error
    expect(-> expect(a: "b") to be empty) to error

    # the label
    expect(catch_it -> expect([1, 2]) to be empty) to equal "Error: expected [1,2] to be empty"

  it "a/an", ->
    expect([]) to be an Array
    expect([]) to be an Object
    expect(->) to be a Function
    expect("") to be a String
    expect(true) to be a Boolean
    expect(20) to be a Number
    expect(/x/) to be a RegExp
    expect(-> expect("") to be an Object) to error
    class Thing and expect(new Thing()) to be a Thing

    # the label
    expect(catch_it -> expect("x") to be an Object) to equal "Error: expected \"x\" to be an instance of Object"

  describe "nt", ->
    it "nt have", ->
      expect([1]) to nt have length 0
      expect(-> expect([]) to nt have length 0) to error

      # the label
      expect(catch_it -> expect([]) to nt have length 0) to equal "Error: did not expect [] to have `length` 0"

    it "nt include", ->

      expect("abc") to nt include "z"
      expect(-> expect("abc") to nt include "a") to error

      # the label
      expect(catch_it -> expect("abc") to nt include "a") to equal "Error: did not expect \"abc\" to contain \"a\""




