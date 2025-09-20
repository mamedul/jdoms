# Changelog

All notable changes to this project will be documented in this file.

_\[ The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). \]_


## [1.1.1] - 2025-09-20

This release focuses on significant bug fixes and major stability improvements, particularly in event handling, utility functions, and AJAX requests.

### Changed

-   **AJAX Function (`_ajax`)**: Completely overhauled the `_ajax` method to be more robust and feature-rich.
    -   Improved payload construction for `GET`, `PUT`, and `POST` requests.
    -   Added default credential handling based on URL domain.
    -   Expanded support for more XHR event callbacks, including `onloadstart`, `onloadend`, `ontimeout`, and `onprogress`.
    -   Wrapped the `send()` call in a `try...catch` block for better error handling.
-   **Object Merging (`_merge`)**: The `_merge` utility function was rewritten for more reliable deep merging of objects.
-   **Project URLs**: Updated the project and repository URLs in the file header comments to their new locations.
-   **Type Checking (`_isArray`)**: Refactored the `_isArray` polyfill to be safer by wrapping property access in a `try...catch` block.

### Fixed

-   **Event Handling (`on`/`off`)**: The entire event handling system has been rewritten to fix critical bugs. The new implementation reliably adds and removes multiple direct and delegated event listeners on elements without conflicts.
-   **Type Checking (`_isSymbol`)**: Corrected the `_isSymbol` utility, which was previously checking for `undefined` instead of `symbol`.
-   **Empty Check (`_isEmpty`)**: Fixed the `_isEmpty` utility to correctly detect empty arrays and objects. The previous implementation used an incorrect reference check (`=== []`).
-   **Class Check (`hasClass`)**: The `hasClass` method was fixed. It previously only checked the first element in a collection and used an inefficient method. It now correctly checks all elements and prioritizes using the native `element.classList.contains()` for better performance.
-   **Value Setter (`setVal`)**: Fixed the `setVal` alias, which was incorrectly calling `getValue` instead of `setValue`.
-   **HTML Parsing (`_htmlParse`)**: Corrected the fallback loop for moving child nodes, making the function more stable in older environments.
-   **Variable Declarations**: Fixed a minor bug in the `_decodeBase64` helper where a variable was used before being formally declared.
-   **DOM Manipulation (`setHtml`)**: Fixed a bug in the `outerHTML` fallback where an undefined variable was referenced during element removal.variable.
-   **DOM Clone**: Fixed a bug in the `clone` node method.
-   **DOM Property**: Fixed a bug in the `prop`, `` & `css` method.
-   **DOM Selection**: Fixed a bug in the `closest` method to be safer by wrapping property access in a `try...catch` block.


## [1.1.0] - 2022-01-23

* Fix object checking everywhere( `Object.hasOwnProperty` )
* Fix and extended ajax function( `jDoms.ajax` )
* Fix buildQuery function( `jDoms.buildQuery` )
* Fix buildQuery function( `jDoms.buildFormData` )
* Add a alias function( `jDoms.isDefined(variable)` alias of `jDoms.isSet(variable)` )
* Add a function( `jDoms.isInteger(variable)` )
* Add a function( `jDoms.isUnique(variable)` )
* Deprecate a function( `jDoms.active()` )
* Add a function( `jDoms.activeDom()` )
* Add a alias function( `jDoms.domsReady()` alias of `jDoms.domReady()` )
* Fix minor other issues


## [1.0.1] - 2022-01-13

* Fix a function( `jDoms.isEmpty(variable)` )
* Add a function( `jDoms.isInt(variable)` )


## [1.0.0] - 2021-11-07 - Initial Release

* Upload and public release the initial version.
