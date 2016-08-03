(function () {

  'use strict';

  /**
   * ===========================================================================
   * UNDERSCORE
   * ===========================================================================
   */
  window._ = {};

  /**
   * UTILITIES
   * ===========================================================================
   * Utility functions that are used in other functions
   * ===========================================================================
   */

  /**
   * @name isString
   * @description Checks whether or not the value is of type String.
   *
   * @param {Object} value to check if its a string.
   *
   * @returns {Boolean} true or false .
   */
  _.isString = (value) => {
    return typeof value === 'string';
  }

  /**
   * @name isFunction
   * @description Checks whether or not the value is of type Function.
   *
   * @param {Object} value to check if its a Function.
   *
   * @returns {Boolean} true or false .
   */
  _.isFunction = (value) => {
    return typeof value === 'function';
  }

  /**
   * @name isBoolean
   * @description Checks whether or not the value is of type Boolean.
   *
   * @param {Object} value to check if its a Boolean.
   *
   * @returns {Boolean} true or false .
   */
  _.isBoolean = (value) => {
    return typeof value === 'boolean';
  }

  /**
   * @name isNumber
   * @description Checks whether or not the value is of type Number.
   *
   * @param {Object} value to check if its a Number.
   *
   * @returns {Boolean} true or false .
   */
  _.isNumber = (value) => {
    return typeof value === 'number';
  }

  /**
   * @name isUndefined
   * @description Checks whether or not the value is undefined.
   *
   * @param {Object} value to check if its undefined.
   *
   * @returns {Boolean} true or false .
   */
  _.isUndefined = (value) => {
    return typeof value === 'undefined';
  }

  /**
   * @name isDefined
   * @description Checks whether or not the value is defined.
   *
   * @param {Object} value to check if its defined.
   *
   * @returns {Boolean} true or false .
   */
  _.isDefined = (value) => {
    return typeof value !== 'undefined';
  }

  /**
   * @name isArray
   * @description Checks whether or not the value is of type Array.
   *
   * @param {Object} value to check if its an Array.
   *
   * @returns {Boolean} true or false .
   */
  _.isArray = Array.isArray;

  /**
   * @name identity
   * @description  Returns whatever value is passed as the argument. This
   * function doesn't seem very useful, but remember it--if a function needs to
   * provide an iterator when the user does not pass one in, this will be handy.
   *
   * @param {Object} value to be returned
   *
   * @returns {Object} the object that was passed in .
   */
  _.identity = function(value) {
    return value;
  };

  /**
   * COLLECTIONS
   * ===========================================================================
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.   *
   * ===========================================================================
   */

  /**
   * @name first
   * @description Return an array of the first n elements of an array. If n is
   * undefined, return just the first element.
   *
   * @param {Array} array source from which numbers to be extracted.
   * @param {Number} n number of elements to return from the the array.
   *
   * @returns {Array} containing the first n number of elements of array .
   */
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  /**
   * @name last
   * @description  Like first, but for the last elements. If n is undefined,
   * return just the last element.
   *
   * @param {Array} array source from which numbers to be extracted.
   * @param {Number} n number of elements to return from the the array.
   *
   * @returns {Array} containing the last n number of elements of array .
   */
  _.last = function(array, n) {
    if (_.isUndefined(n)) {
      return array.pop();
    } else if (n === 0) {
      return [];
    } else {
      return array.slice(-n);
    }
  };

  /**
   * @name each
   * @description Call iterator(value, key, collection) for each element of
   * collection. Accepts both arrays and objects.
   * ===========================================================================
   * NOTE:_.each does not have a return value, but rather simply runs the
   * iterator function over each item in the input collection.
   * ===========================================================================
   *
   * @param {Object} collection an array or an object on whose elements the
   * iterator will be called on.
   * @param {Function} iterator to be called on each element.
   *
   * @returns {undefined} It does not return anything .
   */
  _.each = function(collection, iterator) {
    if (collection !== null) {
      if (Array.isArray(collection)) {
        for (let i = 0, size = collection.length; i < size; ++i) {
          iterator(collection[i], i, collection);
        }
      } else {
        if (typeof collection === 'object') {
          let keys = Object.keys(collection);
          for (let i = 0, size = keys.length; i < size; ++i) {
            if (collection.hasOwnProperty(keys[i])) {
              iterator(collection[keys[i]], keys[i], collection);
            }
          }
        }
      }
    }
  };

  /**
   * @name indexOf
   * @description Returns the index at which value can be found in the array,
   * or -1 if value is not present in the array.
   *
   * @param {Array} array to check if target is an element of.
   * @param {Object} target is the value whose index we are trying to find.
   *
   * @returns {Number} -1 if the element is not in array , else the index where
   * the target can be found in the array.
   */
  _.indexOf = function(array, target) {
    let result = -1;

    _.each(array, (item, index) => {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  /**
   * @name filter
   * @description Returns all elements of an array that pass a truth test.
   *
   * @param {Object} collection an array or an object on whose elements the
   * test will be called on.
   * @param {Function} test predicate to use on each element of collection.
   *
   * @returns {Array} containing all the elements that pass the test.
   */
  _.filter = function(collection, test) {
    let result = [];

    _.each(collection, (value, index, list) => {
      if (test(value)) {
        result.push(value);
      }
    });

    return result;
  };

  /**
   * @name reject
   * @description Returns all elements of an array that don't pass a truth test.
   *
   * @param {Object} collection an array or an object on whose elements the
   * test will be called on.
   * @param {Function} test predicate to use on each element of collection.
   *
   * @returns {Array} containing all the elements that failed the test.
   */
  _.reject = function(collection, test) {

    return _.filter(collection, (value, index, list) => {
      return !test(value);
    });
  };

  /**
   * @name uniq
   * @description Produce a duplicate-free version of the array.
   *
   * @param {Array} array whose duplicate-free version will be created.
   * @param {Boolean} isSorted should be set to true if the array is sorted.
   * @param {Function} iterator to be used with a sorted array.
   *
   * @returns {Array} an array that holds all the unique elements of the input
   * array. Input array does not get modified.
   */
  _.uniq = function(array, isSorted = false, iterator = _.identity) {
    let result = [],
      size = array.length;

    if (isSorted) {
      let j = 0;
      result[j] = array[j];
      for (let i = 1; i < size; i++) {
        if (array[i] !== iterator(result[j])) {
          continue;
        } else {
          result[++j] = array[i];
        }
      }
    } else {
      _.each(array, (value, index, array) => {
        if (_.indexOf(result, value) === -1) {
          result.push(value);
        }
      });
    }
    return result;
  };

  /**
   * @name map
   * @description returns the results of applying an iterator to each element.
   *
   * @param {Object} collection an array or an object on whose elements the
   * iterator will be called on.
   * @param {Function} iterator to be applied on each element in collection.
   *
   * @returns {Array} containing all the elements after iterator being applied.
   */
  _.map = function(collection, iterator) {
    let results = [];

    _.each(collection, (value, index, list) => {
      results.push(iterator(value));
    });

    return results;
  };



  /**
   * @name pluck
   * @description Takes an array of objects and returns an array of the values
   * of a certain property in it. E.g. take an array of people and return an
   * array of just their ages
   *
   * @param {Object} collection an array or an object from whose elements the
   * property will be retrived.
   * @param {String} key whose value will be extracted from each object in
   * collection.
   *
   * @returns {Array} containing the retrived values.
   */
  _.pluck = function(collection, key) {

    return _.map(collection, function(item) {
      return item[key];
    });
  };

  /**
   * @name reduce
   * @description Reduces an array or object to a single value by repetitively
   * calling iterator(accumulator, item) for each item. accumulator should be
   * the return value of the previous iterator call.
   *
   * NOTE: You can pass in a starting value for the accumulator as the third
   * argument to reduce. If no starting value is passed, the first element is
   * used as the accumulator, and is never passed to the iterator. In other
   * words, in the case where a starting value is not passed, the iterator is
   * not invoked until the second element, with the first element as its second
   * argument.
   *
   * Example:
   * ===========================================================================
   *   let numbers = [1,2,3];
   *   let sum = _.reduce(numbers, function(total, number){
   *     return total + number;
   *   }, 0); // should be 6
   *
   *   let identity = _.reduce([5], function(total, number){
   *     return total + number * number;
   *   }); // should be 5, regardless of the iterator function passed in
   *          No accumulator is given so the first element is used.
   * ===========================================================================
   *
   * @param {Object} collection an array or an object on whose elements the
   * iterator will be called on.
   * @param {Function} iterator to be called on each item.
   * @param {Object} accumulator intial value of accumulator.
   *
   * @returns {Object} With the result of reduction.
   */
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, (value, index, list) => {
      accumulator = (_.isUndefined(accumulator)) ? value : iterator(accumulator, value);
    });

    return accumulator;
  };

  /**
   * @name contains
   * @description Determine if the array or object contains a given value
   * (using `===`).
   *
   * @param {Object} collection an array or an object whose elements is to be
   * checked for target.
   * @param {Object} target whose existence is being checked in the collection.
   *
   * @returns {Array} containing the retrived values.
   */
  _.contains = function(collection, target) {

    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  /**
   * @name every
   * @description Determine whether all of the elements match a truth test.
   *
   * @param {Object} collection an array or an object on whose elements the
   * iterator will be called on.
   * @param {Function} iterator the truth test for each element.
   *
   * @returns {Boolean} true or false.
   */
  _.every = function(collection, iterator = _.identity) {

    return _.reduce(collection, (accumulator, value) => {
      return accumulator && !!iterator(value);
    }, true);
  };

  /**
   * @name some
   * @description Determine whether any of the elements pass a truth test. If
   * no iterator is provided, provide a default one.
   *
   * @param {Object} collection an array or an object on whose elements the
   * iterator will be called on.
   * @param {Function} iterator the truth test for each element.
   *
   * @returns {Boolean} true or false.
   */
  _.some = function(collection, iterator = _.identity) {

    return !_.every(collection, (value) => {
      return !iterator(value);
    });
  };


  /**
   * OBJECTS
   * ===========================================================================
   * In this section, we'll look at a couple of helpers for merging
   * objects.
   * ===========================================================================
   */

  /**
   * @name extend
   * @description Extend a given object with all the properties of the passed in
   * object(s).
   *
   * Example:
   * ===========================================================================
   *  let obj1 = {key1: "something"};
   *  _.extend(obj1, {
   *    key2: "something new",
   *    key3: "something else new"
   *  }, {
   *    bla: "even more stuff"
   *  }); // obj1 now contains key1, key2, key3 and bla
   * ===========================================================================
   *
   * @param {Object} destination object to be extended.
   * @param {Array} sources objects whose properties to be put in into
   * destination.
   *
   * @returns {Object} destination object containing all the source objects
   * properties.
   */
  _.extend = function(destination, ...sources) {
    _.each(sources, (source, index, allSources) => {
      _.each(source, (value, key, sourceObject) => {
        destination[key] = sourceObject[key];
      });
    });

    return destination;
  };

  /**

   */

  /**
   * @name defaults
   * @description Like extend, but doesn't ever overwrite a key that already
   * exists in obj
   *
   * @param {Object} destination object to be extended.
   * @param {Array} sources objects whose properties to be put in into
   * destination.
   *
   * @returns {Object} destination object containing all the source objects
   * properties.
   */
  _.defaults = function(destination, ...sources) {
    _.each(sources, (source, index, allSources) => {
      _.each(source, (value, key, sourceObject) => {
        if (!destination.hasOwnProperty(key)) {
          destination[key] = sourceObject[key];
        }
      });
    });

    return destination;
  };

  /**
   * DECORATORS:
   * ===========================================================================
   * Now we're getting into function decorators, which take in any
   * function and return out a new version of the function that works somewhat
   * differently
   * ===========================================================================
   */

  /**
   * @name once
   * @description Returns a function that can be called at most one time.
   * Subsequent calls should return the previously returned value.
   *
   * @param {Function} func to be decorated.
   *
   * @returns {Function} resulting function after decoration.
   */
  _.once = function(func) {
    let alreadyCalled = false,
      result;

    return () => {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }

      return result;
    };
  };

  /***
   * @name memoize
   * @description Memorize an expensive function's results by storing them.
   * You may assume that the function only takes primitives as arguments.
   * memoize could be renamed to oncePerUniqueArgumentList; memoize does the
   * same thing as once, but based on many sets of unique arguments.
   *
   * NOTE: _.memoize should return a function that, when called, will check if
   * it has already computed the result for the given argument and return that
   * value instead if possible.
   *
   * @param {Function} func to be memoized.
   *
   * @returns {Function} resulting function after being memoized.
   */
  _.memoize = function(func) {
    let memo = {};

    return (...params) => {
      return (params in memo) ? memo[params] : memo[params] = func.apply(this, params);
    }
  };

  /***
   * @name delay
   * @description Delays a function for the given number of milliseconds, and
   * then calls it with the arguments supplied.
   *
   * NOTE: The arguments for the original function are passed after the wait
   * parameter. For example _.delay(someFunction, 500, 'a', 'b') will
   * call someFunction('a', 'b') after 500ms
   *
   * @param {Function} func whose calls is to be delayed.
   * @param {Number} wait teh delay after which the function to be called.
   * @param {Array} rest arguments to be provided to the func.
   */
  _.delay = function(func, wait, ...rest) {
    setTimeout(function() {
      func.apply(this, rest);
    }, wait);
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ===========================================================================
   * Advanced operations to be done to collections.
   * ===========================================================================
   */

  /**
   * @name shuffle
   * @description Randomizes the order of an array's contents.
   *
   * @param {Array} array whose elements to be randomized.
   *
   * @returns {Array} containing radomized content of the input array.
   */
  _.shuffle = function(array) {
    let copy = array.slice(),
      size = copy.length;

    for (let i = size - 1; i > 0; --i) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      let temp = copy[randIndex];

      copy[randIndex] = copy[i];
      copy[i] = temp;
    }

    return copy;
  };

  /**
   * EXTRA CREDIT
   * ===========================================================================
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   * ===========================================================================
   */

  /**
   * @name invoke
   * @description Calls the method named by functionOrKey on each value in the
   * list.
   *
   * @param {Object} collection an array or an object on on whose values the
   * the method will be called.
   * @param {Object} functionOrKey a function object or the name of a function
   * to call on each element of the collection.
   * @param {Object} args to be passed to the function when calling it on each
   * element.
   *
   * @returns {Array} containing the resulting values of each element after
   * the function being called on them.
   */
  _.invoke = function(collection, functionOrKey, args) {

    return _.map(collection, (value, index, list) => {

      return (_.isString(functionOrKey)) ? value[functionOrKey].apply(value, args) : functionOrKey.apply(value, args);
    });
  };

  /**
   * @name sortBy
   * @description Sort the object's values by a criterion produced by an iterator.
   * If iterator is a string, sort objects by that property with the name
   * of that string. For example, _.sortBy(people, 'name') should sort
   * an array of people by their name.
   *
   * @param {Object} collection to be sorted using the the criterion.
   * @param {Function} iterator the criterion to be used in sort compare.
   *
   * @returns {Array} the input array sorted.
   */
  _.sortBy = function(collection, iterator) {
    if (_.isString(iterator)) {
      return collection.sort((a, b) => {
        return a[iterator] - b[iterator];
      });
    } else {
      return collection.sort((a, b) => {
        return iterator(a) - iterator(b);
      });
    }
  };

  /**
   * @name zip
   * @description Zip together two or more arrays with elements of the same index
   * going together.
   *
   * Example:
   * ===========================================================================
   * _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2],['c',3],
   * ['d',undefined]]
   * ===========================================================================
   *
   * @param {Array} inputArrays an array of arrays.
   *
   * @returns {Array} the resulting zipped array.
   */
  _.zip = function(...inputArrays) {
    let zippedArray = [],
      numberOfArrays = inputArrays.length;

    let maxLength = _.reduce(inputArrays, (currentMax, value) => {
      return (value.length > currentMax) ? value.length : currentMax;
    }, inputArrays[0].length);

    for (let i = 0; i < numberOfArrays; ++i) {
      for (let j = 0; j < maxLength; ++j) {
        if (_.isUndefined(zippedArray[j])) {
          zippedArray[j] = [];
        }
        zippedArray[j].push(inputArrays[i][j]);
      }
    }
    return zippedArray;
  };

  /**
   * @name flatten
   * @description Takes a multidimensional array and converts it to a
   * one-dimensional array.The new array should contain all elements of the
   * multidimensional array.
   *
   * @param {Array} nestedArray to be flattened.
   * @param {Array} where the result will to be stored.
   *
   * @returns {Array} the flattened array.
   */
  _.flatten = function(nestedArray, result = []) {

    return _.reduce(nestedArray, (accumulator, item) => {
      return (!_.isArray(item)) ? accumulator.concat(item) : _.flatten(item, accumulator);
    }, result);
  };

  /**
   * @name intersection
   * @description Takes an arbitrary number of arrays and produces an array
   * that contains every item shared between all the passed-in arrays.
   *
   * @param {Array} inputArrays an array of arrays.
   *
   * @returns {Array} the intersection of inputArrays.
   */
  _.intersection = function(...inputArrays) {
    let lookUpTable = {},
      result = [],
      size = inputArrays.length;

    _.each(inputArrays, (array, index, list) => {
      _.each(_.uniq(array), (value, elmIndex, elmArray) => {
        if (_.isUndefined(lookUpTable[value])) {
          lookUpTable[value] = 1;
        } else {
          lookUpTable[value]++;
        }
        if (lookUpTable[value] === size) {
          result.push(value);
        }
      });
    });

    return result;
  };

  /**
   * @name difference
   * @description Take the difference between one array and a number of other
   * arrays. Only the elements present in just the first array will remain.
   *
   * @param {Array} car the first array
   * @param {Array} rest of the arrays to differentiate the first array.
   *
   * @returns {Array} an array containing the result of the difference.
   */
  _.difference = function(car, ...cdr) {

    return _.reduce(cdr, (accumulator, item) => {
      return _.filter(accumulator, (elm, index, list) => {
        return !_.contains(_.intersection(accumulator, item), elm);
      });
    }, car);
  };

  /**
   * @name throttle
   * @description Returns a function, that, when invoked, will only be
   * triggered at most once during a given window of time.
   *
   * @param {Function} func The input function to be throttleed.
   * @param {Number} wait the amount of time for which function should be
   * throttleed.
   *
   * @returns {Function} that gets called only once within 'wait'.
   */
  _.throttle = function(func, wait) {
    let last, deferTimer;

    return () => {
      let now = +new Date,
        args = arguments;

      if (last && now < last + wait) {
        clearTimeout(deferTimer);

        deferTimer = setTimeout(() => {
          last = now;
          func.apply(this, args);
        }, wait);
      } else {
        last = now;
        func.apply(this, args);
      }
    };
  };
}());
