var brows;

try {
    brows = browser;
} catch (e) {
    brows = chrome;
}