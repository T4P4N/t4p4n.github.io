---
layout: post
tags: [Wifi vs Ethernet, LAN Cable, Data Transfer, wireless vs wired]
description: 'Data transfer between two computers'
title: 'Data migration from old to new laptop'
---

Last sunday, i tried to transfer files from my old hp notebook(i3 5th gen, 4GB, 1TB HDD) 
to my acer aspire 7 laptop(i5 12th gen, 8GB 512 GB pcie gen4 ssd)

After doing all the typical morning routine stuff,
i'm ready to rock, not really cause frustration ahead :( 

First thing i did was setting up openssh on windows 10 (native i,e not wsl) and it was painful tbh, took me 1.5 hrs
I already wsl2 ubuntu setup on my old laptop 
it could have great since i consider myself already good with linux.

But some issues with WSL2 Ubuntu
its with IP assigned to WSL2 (btw wsl2 is a vm) each time network switches, The IP of wsl2  machine changes to some random IP, 
which then needs to be forwarded via port proxy (powershell cmd) so that it exposed To LAN. 

This is why i choose windows 10 native openssh server although it wasn't a good experience due to lack of documentation from Microsoft side. 

This was the network diagram after setting up openssh server:
 


```
Old laptop <---> My Phone <---> New Laptop
```


i used my phone as wifi hotspot to connect both devices & Winscp(scp client) on new laptop. 

if you're wondering why i used my phone?
it's because our router is a bit far away from my room, not mention that it may slow down others internet(LAN) too, 
since its a cheap router like 10 bucks or 800rs. And also probably would have caused speed issues due to lack of network coverage in my roon. 

But even with my phone sitting in between two laptops (and i mean technically & literally both here) and 
bummer i got like 3-4 MB data transfer speed :( and not only that ii was fluctuating cause of number of files i was transferring about 10GB
and an average about 3 MB per file

So i left it on for a while & slept for like 1 hr
and i woke at 2:30pm i guess & it was still in progress `-_-` anyhow i let it run, there's also another issue with wireless transfer, 
when i turned on Bluetooth to connect my wireless earphones to my phone, And then speed suddenly went down to like 949 kbps `-_-`

This was happening due to air traffic between 2.4 ghz wifi & 2.4ghz Bluetooth using same frequency band.

that was my situation i can't even use my phone for anything & laptops are already busy transferring data, 
If you remember i was using my phone as wifi hotspot, and both laptops were connected to it. 
There's also one problem with it was my phone didn't had any internet pack available, 
so i was completely offline for like 3 hrs straight & without any entertainment lols

That was probably why i fell asleep XD


Fast forward to 3:30pm after transfer was complete i messaged my friend ben, 
and i informed him about the situation i was struggling with and asked for alternatives.

He sent a photo of LAN Cable, and said it will useful in these scenarios & 
i asked few question about if we could connect two laptops directly without any switch or router, and he said yes, after a while 
I remembered my brother had one LAN cable, which came in the tenda router box. I went to upstairs for tea break, and got the cable.

Connected the cable from old laptop to new laptop, And this was my first experience with a LAN Cable, 
I started searching the internet for sharing files with a lan cable, found some articles
did the typical network & file sharing setup in windows 10 & did test transfer of like 10GB
of my music collection, about roughly 2100+ audio files
and it just took less than 15mins.

I got like 10MBps or 100mbps and this time it was almost consistent 10MBps, And also i was to able to use my Bluetooth earphones & internet(wifi) freely. 
