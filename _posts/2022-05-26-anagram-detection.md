---
layout: post
title: Anagrams !?
description: Anagrams detection using python
summary: Find if two strings are anagram.
tags: anagram, string, algorithms
---

![Listen](https://upload.wikimedia.org/wikipedia/commons/3/33/Anagram_Listen_%3D_Silent.gif)

## What is it !?
- Its just a fancy term for saying:
- letters from strings matches to letters of other string
- Some examples:
- seat eats 
- heart earth 
- shit hits 
- skin sink 
- altitude latitude
- Python code for this type of program

```python
def is_anagram(s1, s2):
    s1=s1.replace(" ", "").lower()
    s2=s2.replace(" ", "").lower()
    if sorted(s1) == sorted(s2):
        print("Yes")
    else:
        print("Nope")

s1=input("> ")
s2=input("> ")
```


#### External Links:
- [Ambigrams](https://en.wikipedia.org/wiki/Ambigram)


### Thanks for reading :)

