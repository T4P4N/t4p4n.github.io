---
layout: post
title: Rails active resource link helper
description: Implementing active resource link helper function in rails 
summary: Learn how to implement active resource link helper function
tags: [ rails, active resource link, ruby on rails, ror ]
---

There are many snippets on stack overflow around this topic but  
those are mostly dealing with a specific link to a page or a resource e.g. about page or blogs page
if you haven't tried those snippets, you can try this one out:

- File: `app/helpers/application_helper.rb`  
```ruby
module ApplicationHelper

    def current?(key, path)
      "#{key}" if current_page? path 
      # We use string interpolation "#{key}" here to access the CSS classes we are going to create.
    end

end
```

- File `views/layout/application.html.erb`
```html
<a
    href="<%= url_for(admin_posts_path) %>"
    class="<%= "#{current? "sample_active_link_class", admin_posts_path}" %> normal_class"
    > Posts </a>
```

This works using the current_page function provided by rails action view url helper.
Read more about it [here](https://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-current_page-3F)

Basically this current functions takes two arguments which are  
key in our case the `sample_active_link_class` And path  
which we have here as `admin_posts_path` , and returns the key (classname)   

if the current_page is matches the given path/url (i.e. admin_posts_path). 
Else it returns nothing and we fall back to normal_class_name

The above code is sufficient if we're working with a simple navbar which have doesn't need   
"dynamicness" if lets say we have a navbar & content page like this

```
T4P4N  | [ ...search ]         |
_______________________________|
Posts* | Hello world           |
       | [first_post, new_tag] |
_______| by t4p4n              |
Tags   | edit | delete         |
       |                       |
_______|_______________________|
```

\* represents active state^
if we click on edit this \*
will disappear as we're no longer no the index page
but we're still working with a post resource so it needs
to be in active state. This is where we need the snippet below:


- File: `app/helpers/active_resource_helper.rb`
```ruby
module ActiveResourceHelper

    def on_posts_index_show_edit?
        in_posts? && (action_name == "index" || action_name == "show" || action_name == "edit")
    end
    


    private

    def in_posts?
        return true ? controller_path.split("/")[1] == "posts" : false
    end    
end
```

### How does it work?  
here we're working with just two variables provided by rails to help us in
these kind of scenarios, first one is : `action_name`
which as the name suggests, have the value of current action   
on the specific page that we're rendering. 

And second one is 
`controller_path` which simply returns anything after the base url
that is in our case `admin/posts`, which then split by `/` and  
we get the second item from array returned by split function, and check if its  
the same as we want to be.


- File: `views/layout/application.html.erb` 
- or any template file where you want to display links & highlight currently active link.

```html
<a
    href="<%= url_for(admin_posts_path) %>"
    class="<%= "#{"sample_active_link_class" if on_posts_index_show_edit?}" %> normal_link_class "
    > Posts </a>
```

This is useful when we are creating a navbar for a admin panel   
where we need to list all available resources of our application 
& have actions associated with them like index, create, edit,
 show, delete etc.

#### Thanks for reading! 