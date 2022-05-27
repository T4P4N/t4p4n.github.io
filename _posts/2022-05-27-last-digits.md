---
layout: post
title: Last digit !!!??
description: Last Digit
summary: find the last one digit in a string.
tags: last_digits, string, algorithms
---
s1 = "contains 2 or more digit like 108 and maybe nothing more"
we try get only the last digit i.e. 8

```python
s1 = "contains 2 or more digit like 108 and maybe nothing more"

def last_digit(s1):
	digits = [x for x in s1 if x.isdigit()]
	ld = digits[-1]
	print(ld)

last_digit(s1)
```

### Thanks for reading :)
