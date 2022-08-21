---
layout: post
title: Reverse a Array
description: Reverse a array of given items 
summary: Learn how to reverse array using python.
tags: [ reverse array, array, reverse, algorithms ]
---
```python
def reverse_array(arr):
	i, j = 0, len(arr) - 1
	while i < j:
		arr[i], arr[j] = arr[j], arr[i]
		i += 1
		j -= 1
	return arr

arr = [0,1,2,3,4,5,6,7,8,9,10]
reverse_arr(arr)
# [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

- Code is fairly simple to understand give it a try
- Else just Google it. 

##### Thanks for reading :)
