---
layout: post
tags: [git, linux, bash]
categories: [git, linux, bash]
title: "Switch git user like a ninja"
---

- Sometimes it feels weird when you accidentally committed from work user to a personal repo.
  But no more now you can use this quick snippet to switch users with ease.

```bash
git-user-switch(){
	user1="T4P4N"
	email1="tapank415@gmail.com"

	user2="tapan-storetools"
	email2="tapan@storetools.io"


	echo "Select a Git user:"
	echo "1. $user1"
	echo "2. $user2"
	echo -n " "
	read choice

	if [ "$choice" -eq 1 ]; then
	    git config --global --replace-all user.name "$user1"
	    git config --global --replace-all user.email "$email1"
	    echo "Git user set to $user1"
	elif [ "$choice" -eq 2 ]; then
	    git config --global --replace-all user.name "$user2"
	    git config --global --replace-all user.email "$email2"
	    echo "Git user set to $user2"
	else
	    echo "Invalid choice. Please choose 1 or 2."
	fi
}

```

Still what about existing commits?
No worries use this git cmd to own your commit:

`git commit --amend --reset-author --no-edit`
