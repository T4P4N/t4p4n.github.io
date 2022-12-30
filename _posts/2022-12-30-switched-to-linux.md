---
layout: post
title: Switched to linux
description: Switched to linux
summary: migrating from windows 11 to linuxmint
tags: [ migration, linux]
---

### Linux Mint to be specific
i was waiting for this to happen. I've made plans for it way back in August i believe,
i never liked windows, but had to use it because it wasn't my own laptop, I brought
this new mid range machine that is acer aspire 7
i5 12th gen(1240p) 12 cores, 16 threads, 4.4ghz max turbo (Well enough for most use cases)
8GB Ram (enough for linux, very low for windows 11 especially if you work with VMs/WSL)
512GB (pcie gen 4 nvme SSD, good for me, cause i only hoard m4a & mp3s music files.)
NVIDIA GTX1650 (good entry level gpu, but i dont do gaming lols)

##### So how was the experience?

it wasn't great at first, cause i initially 
broke my first linux mint installation because of nvidia drivers :(
now, i'm running without nvidia drivers, and its working pretty fine thanks to xfce.

##### Why linux mint?

I dont really like distro hopping, i needed something stable, cause i use this laptop as my personal laptop.
After a bit of research i found linux mint to beginner friendly as well as easy to install & configure.

Fast forward ->>>
Linux mint cinnamon was laggy atleast for me, i dont know why.
even youtube playback for 720p video dropped frames a lot.
Did some googling can't find anything useful, so i decided to switch to xfce DE
configured xfce-panel, whisker menu, installed & configured xfce goodies etc.
This took me while like 4-5 hours

i mainly had experience with linux commandline, thanks to termux & arch arm
before this i've only tried like 2 two times, that is once in virtual box & once in native machine
didn't really liked the experience with VMs which is due to my old low spec laptopm (i have HP notebook from 2016, i3 5th, 4Gb ram, 1TB HDD).

But when it comes to commandline on windows, i never liked powershell for node or python devlopment cause i really hate their
lack of auto-completion & very long commands to do simple things like opening up a port & bypassing the firewall for incoming connections etc. I always liked linux cli with zsh & tmux, its ultimate combo if you're a power user/developer.


some annoying things are linux i found/ not figured out yet!
are as follows:
- weird theming with chrome(probably caused by GTK)
- inconsistent font size (maybe caused by misconfiguration from my side)
- scaling (XFCE bug/feature) only 1, or 2 not like 1.25 etc
- xfce terminal* (took 5 hours to replicate my setup from wsl2 ubuntu & windows terminal)
- Bluetooth GUI was not showing my dell mouse, but bluectl found it, still connects & disconnects like every 2s.
- webcam is not working!!!! thanks to acer & no drivers for it in linux
- mouse wheel scroll is very slow, third party stuff makes it worse (lookin at you imwheel)
- Way too much time taking to configure all these things.

i'm a perfectionist (kinda) and i think my machine is now close to perfection (atleast for me)
i can bear the pain for small things to get some freedom from windows 11.
Btw really proud of xfce terminal & i configured it with these features:
- select to copy
- crtl + v to paste
- tmux mouse support
- unicode support
- cmus
- cava
- lsd, bat, git-delta
- oh my zsh (can't live without this one!)

btw replicating the same setup on macOS is way easier then linux. Because community & consistency of macOS
things are stable & preconfigured in macOS, mostly its just download application & run it (in a nutshell it works. But man copy pasting & selecting text is real pain in macOS thanks weird command key obbession).

###### Screenshots
[![https://imgur.com/rKcezq1.png](https://imgur.com/rKcezq1.png)](https://imgur.com/rKcezq1.png)

[![https://imgur.com/Cfh2pSl.png](https://imgur.com/Cfh2pSl.png)](https://imgur.com/Cfh2pSl.png)

[![https://imgur.com/xEeCl22.png](https://imgur.com/xEeCl22.png)](https://imgur.com/xEeCl22.png)
