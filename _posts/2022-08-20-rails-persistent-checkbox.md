---
layout: post
title: Persistent Checkbox Rails
description: Implementing persistent using ruby on rails 
summary: Learn how to implement checkbox using rails
tags: [ rails, checkbox, ruby on rails, ror ]
---

### Whats the problem  
The default form helper for checkbox gives us weird mess of options to work with    
And i found them very very annoying to a beginner like me, the issue    
is when you submit a form with your checked checkboxes, they goto server as  
usual params (with "0" and "1", definetly not good for html we gonna need render next page)   
  

```ruby
{
	"is_mad"=>"1", 
	"q"=>"rails is fcked up", 
	"commit"=>"Search"
	}
```  
  
but when you render the you try with input checkbox 

```ruby 
value=params[:is_mad]
```  

and you get 1  
which doesnt represents the checked state of checkbox so here's the solution  

```ruby
<%= form.check_box :is_mad, checked: true ? params[:is_mad].to_i == 1 : false, class:"bs-sucks" %>
```

- And this works as expected you get desired state of checkbox, entered by user.
- Dunno why this isn't posted anywhere on the internet all i see broken checkboxs

* Examples: 
	- [Bad Programming Hub](https://betterprogramming.pub/build-a-smart-filter-for-your-rails-5-application-using-simple-form-and-acts-as-tattable-afac128e4159)
	- [Reddit post](https://www.reddit.com/r/rails/comments/c201oc/issue_with_using_checkboxes_and_retaining_checked/)

##### Thanks for reading :)  
