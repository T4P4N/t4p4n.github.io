---
layout: post
tags: [memory, nodejs, oom, programming, debugging]
categories: [memory, nodejs, programming, debugging]
title: "Debugging high memory usage"
---

## Step 1: Identify Where It's Happening

- The first step is to figure out where the memory issue is occurring.
- It could be due to anything, e.g. an internal library, queues, or your own code.

Here’s what I did:

- Add logs everywhere to track the flow of function calls.
- Perform some potentially heavy actions (e.g., processing large amounts of data). In my case, it was report generation.
- If you still haven’t found the action causing the memory leak, look elsewhere:
  - Check production logs and metrics.
  - Observe the timeline for when memory usage spikes.
- Repeat this process until you've pin pointed the action that causes the memory leak or server crash. Then move to Step 2.

## Step 2: Track Function Calls and Memory Usage

- Once you've found the problematic action, trace the function calls involved.
- Add more logging and monitor memory usage closely.
  - You can log memory stats to a file along with timestamps.
- Document the steps needed to reproduce the issue consistently.

## Step 3: Inspect further

- Check if you’re adding too many items to arrays. If so, consider using batching or chunking to avoid (OOM) errors.
- Inspect any streams or buffers in use.
- Review filesystem related operations (e.g., `fs.read`, `fs.write`) to ensure they’re being used correctly.
- Take note of idle memory usage (when OOM is _not_ happening) for comparison.

## Step 4: Optimize the Root Cause

- At this point, you’ve narrowed the issue down to a specific function or section of code. Now it's time to optimize it.
- Optimization is usually subjective and comes with trade offs.
  - Discuss with your team to find a good balance between memory usage and performance.

In my case, the culprit was **SheetJS**, which caused memory leaks when reading a huge file. I replaced it with **ExcelJS** using streaming writes. I also implemented an **async generator function** to further reduce memory usage while reading a large the JSONL file, which i use to generate the report.

Most of your time will likely be spent on debugging. Once the issue is found and reliably reproducible, resolving it becomes much easier.

That's it for this one!

Thanks for reading, and happy debugging! 😊
