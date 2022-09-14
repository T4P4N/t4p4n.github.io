---
layout: post
title: Ruby on rails active storage custom key or path
description: rails active storage custom key or path 
summary: rails active storage custom key or path
tags: [ rails, active storage, ruby on rails, ror, aws, s3 ]
---


- Chances are if you came to this post, you're probably looking for this snippet:

```ruby 
image_file = params[:image]
user.profile_pic.attach(
io:  File.open(image_file),
filename:  "#{image_file.original_filename}",
key:  "images/#{user.id}/#{image_file.original_filename}",
)
user.save
```
Okay so what it does actually, 
first we get the uploaded file from params 
and then we attach the image with model_object.attach method
You can read more about it  [here](https://github.com/rails/rails/commit/4dba136c83cc808282625c0d5b195ce5e0bbaa68)
and then just call the save method.

Basic idea is we have to treat images or files separately 
if we want to use custom key, Otherwise it will generate keys like this:  `pv8xs3kdz4aohenj9znjgrhpgty8`, `zem3wx1hmiyh9q4ahyuav1ooj4j9`
which is definitely worse than these : `images/420/my_pic.jpg` , `images/420/oYUcPwegJppnAK4UJmv52e3xpNXf`

In the long run when we want to migrate/remove our data, we can do 
`rm -rf images/` on the other hand if we use auto generated keys we need to figure out which one are images 
or videos or documents etc. 

Since auto generated keys doesn't have extensions. 
We can't really check them without opening the files, 
and not to mention that we also don't have directories 
(which is essentially just keys separated by backslashes). 

But there's one issue this approach  if we use `original_filename` in the key like this:
```ruby
image_file = params[:image]
user.profile_pic.attach(
io:  File.open(image_file),
filename:  "#{image_file.original_filename}",
key:  "images/#{user.id}/#{image_file.original_filename}",
########################## Here^
)
```
##### The issue we need to face is Duplicate Key Error which will be caused if user tries to upload a image with same name. so let's look what is it & how to deal with it?
#### Error
```ruby
ActiveRecord::RecordNotUnique (PG::UniqueViolation: ERROR:  duplicate key value violates unique constraint "index_active_storage_blobs_on_key"
DETAIL:  Key (key)=(user/420/profile_pic.jpg) already exists.
)
```
#####  The deal
```ruby
require  'securerandom'
# important^

class UsersController < ApplicationController
	def create
		image_file = params[:image]
		user.profile_pic.attach(
		io:  File.open(image_file),
		filename:  "#{image_file.original_filename}",
		key:  "images/#{user.id}/#{SecureRandom.base58(28)}",
		########################## Use This^
		user.save
	end
end
)
```
Explanation: we import the the secure random module with  `require  'securerandom'` you can read more about it [here](https://ruby-doc.org/stdlib-1.9.2/libdoc/securerandom/rdoc/SecureRandom.html)
PS: it generates secure and also random strings/numbers/hex/bytes etc.
 this module is also used by rails active storage evidence [here](https://api.rubyonrails.org/classes/ActiveRecord/SecureToken/ClassMethods.html#method-i-generate_unique_secure_token) and [here](https://apidock.com/rails/ActiveStorage/Blob/key)
 also i checked both keys one(auto-gen by rails) by one(our patch above)
 both have same length (28 chars) 
 
 just so that we don't have to worry about potential security issues introduced by our own patches.
 
 Anyways that's it for this one!
 if you want  to support me! just me hit up!  via [here](https://t4p4n.github.io/contact/)
 
##### Thanks for reading :)  
