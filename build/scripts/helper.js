

// Helpers for JS DOM manipulation
// Inspired by Robin Nixon's Book "Learning PhP, MySQL & JavaScript"
const O = i => typeof i == 'object' ? i : document.getElementById(i);
const S = i => O(i).style;
const C = i => document.getElementsByClassName(i);