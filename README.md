# jDoms: The Lightweight Vanilla JavaScript DOM Utility Library


[![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)](https://github.com/mamedul/jdoms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/mamedul/jdoms?style=social)](https://github.com/mamedul/jdoms/stargazers)
[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/mamedul/jdoms/badge)](https://www.jsdelivr.com/package/gh/mamedul/jdoms)

**jDoms** is a fast, powerful, and zero-dependency JavaScript library for modern DOM manipulation, traversal, event handling, and more. It provides an intuitive, jQuery-like syntax for common tasks, empowering you to write cleaner, more efficient vanilla JS without the overhead of larger frameworks. It is the perfect lightweight alternative to jQuery for any project.

<p style="text-align:center">
<img src="https://mamedul.github.io/jdoms/jdoms-banner.png" alt="jDoms" width="1200" height="311" style="max-width: 100%; height: auto;">
</p>

[![Examples](https://img.shields.io/badge/Examples-View-blue?style=flat-square)](https://mamedul.github.io/jdoms/examples/)
[![Browser Tests](https://img.shields.io/badge/Browser%20Tests-Run-green?style=flat-square)](https://mamedul.github.io/jdoms/browser-test.html)

---

## ✨ Why Choose jDoms?

- **💡 Zero Dependencies:** Pure, vanilla JavaScript. No external libraries needed. It just works.
- **⚡ Lightweight & Fast:** A minimal footprint ensures your projects are fast and responsive.
- **⛓️ Familiar Chainable API:** An elegant, jQuery-inspired syntax (`jDoms(...).parent().addClass(...)`) that is easy to learn and use.
- **🧭 Effortless DOM Traversal:** Easily navigate the DOM tree with methods like `.parent()`, `.child()`, `.closest()`, `.next()`, and `.find()`.
- **📢 Powerful Event Handling:** Simple and robust event management with `.on()` and `.off()`, including built-in support for **event delegation**.
- **📡 Built-in AJAX:** A straightforward `jDoms.ajax()` utility for handling asynchronous network requests.
- **🧰 Rich Utility Suite:** Includes dozens of helpers for type checking (`jDoms.isString`), parsing (`jDoms.jsonParse`), cookie management, and more.

---

## 🚀 Getting Started

### CDN
The easiest way to get started is to use the jsDelivr CDN. Just add this script tag to your HTML file before your main application script.

```html
<script src="https://cdn.jsdelivr.net/gh/mamedul/jdoms@main/src/jdoms-latest.js"></script>
```

### Direct Download

You can also download `jdoms-latest.js` from this repository and host it yourself.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jDoms Example Page</title>
</head>
<body>
    <div id="container">
        <p>Welcome to jDoms!</p>
    </div>

    <!-- Your scripts -->
    <script src="./src/jdoms-latest.js"></script>
    <script src="your-app.js"></script>
</body>
</html>
```

-----

## 📚 Full API Documentation

### Core Function: `jDoms()`

The `jDoms()` function is the entry point for almost all operations. It returns a `jDoms` instance, which is an array-like object of DOM elements with all the library methods attached to its prototype.

**Syntax:** `jDoms(selector, [context])`

  - `selector`: A CSS selector string, a DOM element, a NodeList, an HTML string, `window`, or `document`.
  - `context` (optional): A DOM element within which to search for the selector.

<!-- end list -->

```javascript
// Select elements by CSS selector
const primaryButtons = jDoms('button.primary');

// Select a single element by ID
const header = jDoms('#main-header');

// Wrap an existing DOM element
const myElement = document.getElementById('my-el');
const jDomsElement = jDoms(myElement);

// Select the window
const win = jDoms(window);
```

_Now you can see/ check some [examples](https://mamedul.github.io/jdoms/examples/ "null") & some [tests in browser](https://mamedul.github.io/jdoms/browser-test.html "null")_

-----

### DOM Traversal & Filtering

Navigate and filter the collection of elements.

| Method | Description | Example |
| :--- | :--- | :--- |
| **`.find(selector)`** | Gets the descendants of each element, filtered by a selector. | `jDoms('ul').find('li.active');` |
| **`.parent()`** | Gets the immediate parent of each element. | `jDoms('span').parent();` |
| **`.child()` / `.children()`** | Gets the children of each element, optionally filtered. | `jDoms('#list').children('a');` |
| **`.closest(selector)`** | Travels up the DOM tree to find the first ancestor that matches. | `jDoms(event.target).closest('tr');` |
| **`.next()`** | Gets the next sibling of each element. | `jDoms('li.current').next();` |
| **`.previous()`** | Gets the previous sibling of each element. | `jDoms('li.current').previous();` |
| **`.first()`** | Reduces the set to the first element. | `jDoms('li').first();` |
| **`.last()`** | Reduces the set to the last element. | `jDoms('li').last();` |
| **`.index(number)`** | Retrieves the raw DOM element at a specific index. | `jDoms('p').index(0); // returns <p>...` |
| **`.domIndex(number)`** | Retrieves a new jDoms instance containing the element at an index. | `jDoms('p').domIndex(0); // jDoms { 0: <p>... }` |
| **`.is(selector)`** | Checks if the first element matches the selector. Returns `true` or `false`. | `if (jDoms(el).is(':checked')) { ... }` |
| **`.not(selector)`** | Removes elements from the set that match the selector. | `jDoms('p').not('.intro');` |
| **`.match(selector)`** | Filters the current set to elements that also match a new selector. | `jDoms('div').match('.visible');` |

-----

### DOM Manipulation

Create, modify, and remove elements.

| Method | Description | Example |
| :--- | :--- | :--- |
| **`.html([content])`** | Gets the HTML of the first element or sets the HTML for all elements. | `jDoms('#box').html('<strong>New Content</strong>');` |
| **`.text([content])`** | Gets the text of the first element or sets the text for all elements. | `jDoms('h1').text('Welcome!');` |
| **`.append(content)`** | Inserts content at the end of each element. | `jDoms('ul').append('<li>Last Item</li>');` |
| **`.prepend(content)`** | Inserts content at the beginning of each element. | `jDoms('ul').prepend('<li>First Item</li>');` |
| **`.appendTo(selector)`** | Appends the current set of elements to the target selector. | `jDoms('h2').appendTo('#container');` |
| **`.prependTo(selector)`** | Prepends the current set of elements to the target selector. | `jDoms('p').prependTo('#container');` |
| **`.before(content)`** | Inserts content before each element. | `jDoms('#btn').before('<hr>');` |
| **`.after(content)`** | Inserts content after each element. | `jDoms('#btn').after('<p>Info</p>');` |
| **`.remove()`** | Removes all selected elements from the DOM. | `jDoms('.temporary').remove();` |
| **`.empty()`** | Removes all child nodes from the selected elements. | `jDoms('#results').empty();` |
| **`.clone([deep])`** | Creates a deep or shallow copy of the first element. `deep` is `true` by default. | `const clonedEl = jDoms('#original').clone();` |
| **`.create(tagName, [attributes])`** | Creates a new element. Must be called on an empty `jDoms()` instance. | `const newDiv = jDoms().create('div', {id: 'new'});` |

-----

### Attributes & Properties

| Method | Description | Example |
| :--- | :--- | :--- |
| **`.attr(name, [value])`** | Gets an attribute value or sets one or more attributes. | `jDoms('img').attr('src', 'new.jpg');` |
| **`.removeAttr(name)`** | Removes an attribute. | `jDoms('input').removeAttr('disabled');` |
| **`.prop(name, [value])`** | Gets a property value or sets one or more properties. | `jDoms('#check').prop('checked', true);` |
| **`.removeProp(name)`** | Removes (deletes) a property from an element. | `jDoms(el).removeProp('customData');` |
| **`.val([value])`** | Gets the value of the first form element or sets the value for all. | `const name = jDoms('#nameInput').val();` |

-----

### CSS, Styling & Dimensions

| Method | Description | Example |
| :--- | :--- | :--- |
| **`.css(prop, [val])` / `.style(...)`** | Gets a style value or sets one or more style properties. | `jDoms('.box').css('background-color', 'blue');` |
| **`.addClass(className)`** | Adds a CSS class. | `jDoms('p').addClass('highlight');` |
| **`.removeClass(className)`** | Removes a CSS class. | `jDoms('p').removeClass('highlight');` |
| **`.hasClass(className)`** | Checks if any element has the class. Returns `true` or `false`. | `if (jDoms('#box').hasClass('active')) { ... }` |
| **`.hide()`** | Hides elements by setting `display: none !important`. | `jDoms('.modal').hide();` |
| **`.show([displayType])`** | Shows elements. Defaults to `block`. | `jDoms('.modal').show('flex');` |
| **`.width([value])` / `.height([value])`**| Gets the width/height or sets it (in pixels). | `jDoms('#box').width(200);` |
| **`.innerWidth()` / `.innerHeight()`** | Gets the current computed inner width/height (including padding). | `const w = jDoms('#box').innerWidth();` |
| **`.outerWidth()` / `.outerHeight()`** | Gets the current computed outer width/height (including padding, border, and margin). | `const h = jDoms('#box').outerHeight();` |
| **`.offset()`** | Gets the coordinates of the first element relative to the document. Returns `{left, top}`. | `const pos = jDoms('#box').offset();` |
| **`.scrollTop()` / `.scrollLeft()`** | Gets the vertical/horizontal scroll position. | `const y = jDoms(window).scrollTop();` |
| **`.scrollTo(x, y)` / `.scrollBy(x, y)`**| Scrolls the element to a specific coordinate or by a certain amount. | `jDoms(window).scrollTo(0, 0);` |

-----

### Event Handling

| Method | Description | Example |
| :--- | :--- | :--- |
| **`.on(events, [sel], cb)`** | Attaches an event handler. Supports **event delegation**. | `jDoms('#list').on('click', 'li', myFunc);` |
| **`.off(events, [sel], cb)`** | Removes an event handler. | `jDoms('#list').off('click', 'li', myFunc);` |
| **`.trigger(event)`** | Executes all handlers for a given event. | `jDoms('#my-input').trigger('change');` |
| **`.click()`** | Triggers a `click` event on the element. | `jDoms('#login-btn').click();` |
| **`.focus()`** | Triggers a `focus` event. | `jDoms('#username').focus();` |
| **`.blur()`** | Triggers a `blur` event. | `jDoms('#username').blur();` |
| **`.select()`** | Triggers a `select` event. | `jDoms('textarea').select();` |

**Event Delegation Example:**
Event delegation allows you to attach a single event listener to a parent element that will fire for its descendants, even for elements added to the DOM *after* the listener was attached.

```javascript
// Instead of attaching a listener to every <li>...
// Attach ONE listener to the parent <ul>
jDoms('#dynamic-list').on('click', 'li', function(event) {
    // 'this' refers to the <li> that was clicked
    console.log('Clicked item:', jDoms(this).text());
    jDoms(this).addClass('clicked');
});
```

-----

### AJAX (Static Method)

The `jDoms.ajax()` method is a static utility on the main `jDoms` object.

**Syntax:** `jDoms.ajax(options)`

| Option | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | The URL to which the request is sent. |
| `method`| `string` | The HTTP method to use (e.g., `'GET'`, `'POST'`). Default is `'GET'`. |
| `data` | `object` or `string` | Data to be sent to the server. |
| `async` | `boolean` | Whether the request should be asynchronous. Default is `true`. |
| `onSuccess`| `function` | A function to be called if the request succeeds. Receives the `xhr` object. |
| `onError` | `function` | A function to be called if the request fails. Receives the `xhr` object or an error. |
| `onComplete`| `function` | A function to be called when the request finishes (after success or error). |
| `headers` | `object` | An object of key/value pairs to send as request headers. |
| `timeout` | `number` | A timeout in milliseconds. |

```javascript
jDoms.ajax({
    url: 'https://api.example.com/users',
    method: 'POST',
    data: {
        name: 'Mamedul Islam',
        role: 'Developer'
    },
    onSuccess: function(xhr) {
        const response = jDoms.jsonParse(xhr.responseText);
        console.log('User created:', response);
    },
    onError: function(xhr) {
        console.error('API Error:', xhr.status, xhr.statusText);
    }
});
```

-----

### Utilities (Static Methods)

Static methods are called directly on the `jDoms` object itself, not on a jDoms instance.

#### Document Ready

  - **`jDoms.ready(callback)`**: The classic document ready function. Executes the callback once the DOM is fully loaded and parsed.
    ```javascript
    jDoms.ready(function() {
        // DOM is ready, safe to manipulate
        jDoms('body').addClass('loaded');
    });
    ```

#### Type Checking

A comprehensive suite of functions to check the type of a variable.

  - `jDoms.isString(variable)`
  - `jDoms.isNumber(variable)`
  - `jDoms.isArray(variable)`
  - `jDoms.isObject(variable)`
  - `jDoms.isFunction(variable)`
  - `jDoms.isBoolean(variable)`
  - `jDoms.isUndefined(variable)`
  - `jDoms.isEmpty(variable)`: Returns `true` for `''`, `0`, `false`, `null`, `undefined`, `NaN`, or empty arrays/objects.

#### Parsing

  - **`jDoms.jsonParse(string)`**: Safely parses a JSON string into an object, returning an empty object on failure.
  - **`jDoms.xmlParse(string)`**: Parses an XML string into an XML Document.
  - **`jDoms.htmlParse(string)`**: Parses an HTML string into a DocumentFragment.

#### Cookies

  - **`jDoms.setCookie(name, value, expireTimeInMs)`**: Sets a browser cookie.
  - **`jDoms.getCookie(name)`**: Retrieves a cookie value by name.
  - **`jDoms.removeCookie(name)`**: Deletes a cookie.

#### Miscellaneous Utilities

  - **`jDoms.trim(string)`**: Removes leading and trailing whitespace from a string.
  - **`jDoms.unique(array)`**: Returns a new array with duplicate values removed.
  - **`jDoms.merge(obj1, obj2)`**: Merges the contents of two objects into the first object.
  - **`jDoms.now()`**: Returns the current timestamp in milliseconds.
  - **`jDoms.delay(callback, ms)`**: A debouncing function that invokes a callback after a specified delay.
  - **`jDoms.activeDom()`**: Returns the currently focused element as a jDoms instance.

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author & Hire

This extensible codes was created by [**Mamedul Islam**](https://mamedul.github.io/) and opened for [contribute](CONTRIBUTE.md) by anyone.

_As a passionate **web developer** with experience in creating interactive and user-friendly web components. Currently *available for freelance projects* or full-time opportunities._

_Helping businesses grow their online presence with custom web solutions. Specializing in **WordPress**, **WooCommerce**, and **Shopify**. Building modern, responsive, and high-performance scalable websites with custom made plugins, codes, customizations._

<p align="center">
  <a href="https://mamedul.github.io" title="Portfolio"><img src="https://img.shields.io/badge/Portfolio-38BDF8?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio"></a>
  <a href="https://wa.me/8801847406830?text=Hi%2C%20do%20you%20have%20time%20to%20develop%20or%20update%20my%20website%3F" title="WhatsApp"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"></a>
  <a href="https://www.fiverr.com/mamedul" title="Fiverr"><img src="https://img.shields.io/badge/Fiverr-4DBF43?style=for-the-badge&logo=fiverr&logoColor=white" alt="Fiverr"></a>
  <a href="https://www.linkedin.com/in/mamedul/" title="LinkedIn"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://www.x.com/mamedul" title="X (Twitter)"><img src="https://img.shields.io/badge/X-4020F0?style=for-the-badge&logo=x&logoColor=white" alt="X (Twitter)"></a>
  <a href="https://github.com/mamedul" title="GitHub"><img src="https://img.shields.io/badge/GitHub-238636?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
</p>

---
