---
layout: post
title: Palindrome !?
description: Palindrome detection using python
summary: Palindrome simply reverse of string/numbers matches to thier orignal form.
tags: [ palindrome, detection, string, algorithms ]
---
## Rotavator
![Rotavator](https://img2.exportersindia.com/product_images/bc-full/dir_10/289726/rotavator-1512462441-3497789.jpeg "a rotavator")

## Palindrome? What is it !?
- Its just a fancy term for saying something like this:
- string/integer matches to their reverse.
- Example: POP equals to POP(reverse of pop)
- Another example: madam equals to madam(reverse of madam)
- Yet another example: Rotavator equals to rotvatoR(reverse of rotavator)


- non-examples aka false statements:
- "Hello world" equals to "dlrow olleH"
- "definetly not" equals to "ton yltenifed"


- Python code for this type of program

```python
data = input("Enter something: ")

def is_palindrome(data):
    reverse = data[::-1]
    if data == reverse:
        print("Yes")
        return True
    print("Nope")
    return False

is_palindrome(data)
```


- suggested improvements:
- we can use manual function for string reversal 
- instead of using python slicling magic.

### Hope you learned something today atleast i did for sure.
### Thanks for reading :)

