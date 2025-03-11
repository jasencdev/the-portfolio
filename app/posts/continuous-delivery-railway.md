---
title: "Continuous Delivery with Railway: Keeping the Vitepress Branch Always Deployable"
date: 2025-03-11
---

## Continuous Delivery with Railway: Keeping the Vitepress Branch Always Deployable

During the development of my new portfolio site, I wanted to ensure that my work was always in a deployable state. This article details how I set up continuous delivery using Railway to keep my development branch production-ready at all times.

## The Challenge of Feature Branches

When developing a new version of a website, there's always the risk of creating code that works locally but breaks in production. Traditional approaches might involve:

1. Developing locally until "ready" for production
2. Pushing changes to a staging environment
3. Fixing unforeseen issues
4. Finally deploying to production

This workflow often leads to integration problems and deployment delays. I wanted a better approach.

## Enter Railway and Continuous Delivery

For my portfolio site rebuild using VitePress, I decided to implement a true continuous delivery pipeline:

1. Created a dedicated `vitepress` branch for the new site version
2. Set up Railway to automatically deploy this branch to a live environment
3. Configured the deployment to happen on every commit

This approach provided several immediate benefits:

- **Instant Feedback**: Every change was automatically deployed, revealing any issues immediately
- **Always Deployable**: The branch remained in a working state throughout development
- **Real Environment Testing**: I could test in a production-like environment, not just locally
- **Confidence Building**: Each successful deployment increased confidence in the new implementation

## Setting Up the Pipeline

The process of configuring continuous delivery with Railway was surprisingly straightforward:

### Step 1: Creating the Feature Branch

```bash
# Create and switch to a new branch
git checkout -b vitepress
```

This branch would contain all the changes related to migrating my site to VitePress.

### Step 2: Connecting Railway to GitHub

I connected my GitHub repository to Railway and configured it to:

1. Watch the `vitepress` branch specifically
2. Automatically deploy on any new commits
3. Use the same build process that would eventually be used in production

### Step 3: Configuring Build Settings

In Railway's dashboard, I set up the build configuration:

```
BUILD_COMMAND=npm run docs:build
START_COMMAND=./server
```

This ensured that Railway would build the static VitePress site and then start my Go server to serve it.

### Step 4: Environment Configuration

I replicated all necessary environment variables from my production setup to ensure parity:

- API keys
- Service connections
- Runtime configurations

## The Development Workflow

With continuous delivery in place, my development workflow became much more streamlined:

1. Make changes locally and test
2. Commit and push to the `vitepress` branch
3. Railway automatically deploys the changes
4. Review the live deployment to verify everything works
5. Repeat until the feature is complete

This process eliminated the fear of making changes, as I could immediately see the impact of each modification in a real environment.

## Benefits Realized

This approach paid dividends throughout the development process:

1. **Eliminated Integration Surprises**: No more "it works on my machine" issues
2. **Shortened Feedback Loops**: Problems were discovered and fixed quickly
3. **Increased Development Velocity**: Confidence in the system allowed for faster iteration
4. **Simplified Final Deployment**: When ready, merging to main was trivial since everything was already proven to work
5. **Documentation by Practice**: The deployment process was thoroughly tested and documented through actual use

## Challenges and Solutions

The process wasn't without challenges:

1. **Initial Setup Time**: Configuring the proper build process took some experimentation
   - Solution: Invested time upfront to get it right, saving time later

2. **Resource Usage**: Continuous deployments consumed Railway resources
   - Solution: Railway's usage-based pricing meant this was still cost-effective

3. **Maintaining Branch Discipline**: Needed to ensure the branch stayed deployable
   - Solution: Adopted a personal rule to never push breaking changes

## Conclusion

Setting up continuous delivery with Railway for my VitePress branch transformed my development process. By ensuring my code was always deployable, I eliminated many of the traditional headaches associated with building and launching a new site version.

When it came time to launch the new version, the transition was seamless – I had been effectively "launching" with every commit throughout the development process.

For developers working on similar projects, I highly recommend this approach. The additional confidence and reduced stress are well worth the initial setup effort.