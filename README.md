# jDoms

An interactive Javascript library for DOM manipulations and most regulars functions related with DOM

## Features

* Major browsers compatible ( like* Chrome, Firefox, Opera, Safari, Micrsoft Edge, IE>=9 etc )

* NodeJS compatible

* Easy to use and short coding

* Small sizes (less than 47KB)

* Powerfull DOM selector

* Easy and powerfull DOM manipulation functions

* Event Listener and Event Remover

* Event Trigger

* Ajax function with customizable and event catchers

* URL Parser, Date Parser, HTML Parser,  JSON Parser,  XML Parser

* Most regular functions
  
  * Type Checker
  
  * Document Ready
  
  * Size(Length) Checker(All type of variables)
  
  * Trim (Object, Array, String in one function)
  
  * Merge(Object and Array)
  
  * Unique(Array, Sring and Number in one function)
  
  * Encode String
  
  * DecodeString
  
  * Encode Base64 data
  
  * Decode Base64 data
  
  * Stringify
  
  * Delay
  
  * Set Cookie
  
  * GetCookie
  
  * Remove Cookie
  
  * Geo Location



## Installations and Usage

jDoms is available on [npmjs](https://www.npmjs.com/package/jdoms) (using semantic versioning), and can install via npm command.

```
npm install jdoms
```

```
npm save jdoms
```

Or you can use CDN in your HTML file-

```html
<script src="https://cdn.jsdelivr.net/npm/jdoms@1.0.0/src/jdoms-v1.0.0.min.js""></script>
```

Or you can use locally downloaded file in your HTML file-

```html
<script src="./pathname/src/jdoms-v1.0.0.min.js"></script>
```



Then, you can use, like-

```html
<script>

//select all 'div' tags and add class 'active'
jDoms("div").addClass("active");

//select first 'span' tags and add set HTML 'myhtml'
//jDoms("span").domIndex(0).setHtml("myhtml");
jDoms("span:first-child").setHtml("myhtml");

</script>
```



## Documentation

Check the [documentations here.]([Home · mamedul/jdoms Wiki · GitHub](https://github.com/mamedul/jdoms/wiki))



## License

jDoms javascript library is Licensed under the [MIT license]([jdoms/LICENSE at main · mamedul/jdoms · GitHub](https://github.com/mamedul/jdoms/blob/master/LICENSE)).



## Contributing

  The library is develpoed by [MAMEDUL ISLAM](https://mamedul.github.io). But here it's true that some codes are come from developer's forum ()like-StackOverflow).
