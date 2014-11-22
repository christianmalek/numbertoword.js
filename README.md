numbertoword
============

Converts numbers to words (german only). Works from zero to octillion (*in german Quadrilliarde*)

## demo
Take a look at this plunker to see the converter in action: [plunker][converter]

[converter]: http://plnkr.co/edit/9EcZyRchiXr1RMCeWMkP?p=preview

## 30s look
```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<!--add reference-->
	<script src="de/numbertoword.js"></script>
	<script>
	  var word = ntw(42); //convert a number to a word
	  console.log("The solution is " + word);
	</script>
</head>
</html>
```

[ntw]: https://github.com/Phisherman/numbertoword/blob/master/de/numbertoword.js
