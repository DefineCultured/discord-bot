"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.withCommas = void 0;
function withCommas(number) {
    let parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}
exports.withCommas = withCommas;
function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
exports.capitalize = capitalize;
//# sourceMappingURL=helpers.js.map