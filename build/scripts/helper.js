

/* Helpers for JS DOM manipulation
 * Inspired by Robin Nixon's Book "Learning PhP, MySQL & JavaScript"
 */
const O = i => typeof i == 'object' ? i : document.getElementById(i);
const S = i => O(i).style;
const C = i => document.getElementsByClassName(i);

/* URL Query Parser
 * Converts the query string of the current URL into an object such that
 * {FieldName : FieldValue}
 */
function parseUrlQueryString() {

    var queries = window.location.search.substring(1).split('&');
    var query = {};

    for (var i = 0; i < queries.length; i++) {

        var q = queries[i].split('=');

        query[`${q[0]}`] = q[1];

    }

    return query;

}