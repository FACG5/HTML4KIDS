var test = require('tape');

const filterJson  = require('./logic');

test('handlers - filterJson #0', function(t) {
    const searchQuerySanitized = 'h';

    const arr = ['html', 'h1','body' ,'head'];
    
    const expected = ['html', 'h1', 'head'];
  
    t.deepEqual(filterJson( arr, searchQuerySanitized), expected);
    t.end();
  });

  test('handlers - filterJson #1', function(t) {
    const searchQuerySanitized = '';

    const arr = ['html', 'h1','body' ,'head'];
    
    const expected = ['html', 'h1','body' ,'head'];
  
    t.deepEqual(filterJson( arr, searchQuerySanitized), expected);
    t.end();
  });


  test('handlers - filterJson #2', function(t) {
    const searchQuerySanitized = 'h';

    const arr = ['section', 'footer','main' ,'body'];
    
    const expected = [];
  
    t.deepEqual(filterJson( arr, searchQuerySanitized), expected);
    t.end();
  });


  test('handlers - filterJson #3', function(t) {
    const searchQuerySanitized = ' ';

    const arr = ['section', 'footer','main' ,'body'];
    
    const expected = [];
  
    t.deepEqual(filterJson( arr, searchQuerySanitized), expected);
    t.end();
  });

  test('handlers - filterJson #4', function(t) {
    const searchQuerySanitized = '$';

    const arr = ['section', 'footer','main' ,'body'];
    
    const expected = [];
  
    t.deepEqual(filterJson( arr, searchQuerySanitized), expected);
    t.end();
  });

  test('handlers - filterJson #5', function(t) {
    const searchQuerySanitized = {};

    const arr = ['section', 'footer','main' ,'body'];
    
    const expected = [];
  
    t.deepEqual(filterJson( arr, searchQuerySanitized), expected);
    t.end();
  });

  test('handlers - filterJson #6', function(t) {
    const searchQuerySanitized = undefined;

    const arr = ['section', 'footer','main' ,'body'];
    
    const expected = [];
  
    t.deepEqual(filterJson( arr, searchQuerySanitized), expected);
    t.end();
  });
