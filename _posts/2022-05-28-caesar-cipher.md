---
layout: post
title: Caesar Cipher
description: Implementing caesar cipher using python 
summary: Learn how to implement caesar cipher algorithm.
tags: [ caesar, cipher, string, algorithms ]
---
[![Siege-alesia-vercingetorix-jules-cesar](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Siege-alesia-vercingetorix-jules-cesar.jpg/512px-Siege-alesia-vercingetorix-jules-cesar.jpg)](https://commons.wikimedia.org/wiki/File:Siege-alesia-vercingetorix-jules-cesar.jpg "Lionel Royer
, Public domain, via Wikimedia Commons")

- Try to implement caesar cipher using plain python.

```python

def cipher(a_string, key):
    uppercase = ABCDEFGHIJKLMNOPQRSTUVWXYZ
    lowercase = abcdefghijklmnopqrstuvwxyz
    encrypt = ''
    for x in a_string:
        if x in uppercase:
            print(uppercase.index(x))

            # (1)
            new = (uppercase.index(x) + key) % 26

			# (2)
            encrypt += uppercase[new]
        elif x in lowercase:
            print(lowercase.index(x))
            new = (lowercase.index(x) + key) % 26
            encrypt += lowercase[new]
        else:
            encrypt += x
    print("Cipher text: ", encrypt)
    return encrypt

a_string = input("Enter a name")
key = input("Enter a key (must be integer) ")
cipher(a_string, int(key))
```

### How it works
- (1) if the letter is uppercase we get index of it and add key to it.
- (1.1) and then we use modulus operator(which return either 0 or remainder) with 26 as divisor
- (1.2) we treat new as new index of letter
- (2) then we append to encrypt variable with the new index of letter.


### Can't understand what i wrote here?
- Go ahead and look it on internet
- here some links to resources
- [Caesar Cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
- [Modolus Operator](https://en.wikipedia.org/wiki/Modulo_operation)

##### Thanks for reading :)
