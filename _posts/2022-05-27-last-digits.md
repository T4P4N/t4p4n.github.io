---
layout: post
title: Last digit !!!??
description: Last Digit
summary: find the last one digit in a string.
tags: last_digits, string, algorithms
---
## Get last digit from a string

- Example string: "Get 10% off on minimum cart value of $199"
- Try to get only the last digit i.e. 9

```python
s1 = "Get 10% off on minimum cart value of $199"

def last_digit(s1):
	# (1)
	digits = [x for x in s1 if x.isdigit()]

	# (2)
	ld = digits[-1]

	# (3)
	print(ld)

last_digit(s1)
```

### How it works
- (1) use list comprehension to get all the digits from string
- (2) get last element from list using string slicing with negative index.
- (3) finally print the last digit 

##### Thanks for reading :)
