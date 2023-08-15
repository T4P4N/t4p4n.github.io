---
layout: post
title: "Feature flags 🏁"
description: Feature flags explained
summary: what are feature flags
tags: [devops, cloud, feature flags]
---

##### What is feature flag?

Its like toggle switch in app which enable let developers to turn on/off a particular feature in the whole application. Some common ones are you might have used is maybe [chrome://flags/](chrome://flags/) and and maybe also developers settings in android smartphones

##### Here's a real-world scenario:

At StoreTools, we recently released a new feature that allows us to restrict the maximum number of orders a user can print based on their subscribed plan. However, after the release, we discovered that many merchants were already exceeding their plan's order limit. The main issue arose from the fact that we were displaying an error in JSON format, but we weren't effectively parsing and presenting this error as a user-friendly banner.

Consequently, several merchants contacted us, reporting the error they were facing. As a quick solution, we had to temporarily comment out the code responsible for enforcing the order limit. This process, including deployment, took us around 30 minutes.

This situation could have been optimized by utilizing feature flags. By implementing feature flags, we could have easily disabled the specific feature causing the issue. While I have not yet incorporated feature flags into a production environment in a proper manner, I believe that using them could have resolved this problem within a matter of seconds.
s

- Read more about them:
  - [IBM's Video on Feature flags](https://www.youtube.com/watch?v=AJa2B-twtG4)
  - [Launch Darkly](https://launchdarkly.com/pricing/) a Saas providing products implementing feature flags in enterprises application
