# Contribution Guide
To make sure your project follows APPI's contribution rules, please read the following guidelines.

## Branches naming convention
### TLDR
- Use tokens (words) at the beginning of your branch names.
- Define and use short lead tokens to differentiate branches in a way that is meaningful to your workflow.
- Use slashes to separate parts of your branch names.
- Do not use bare numbers as leading parts.
- Avoid long descriptive names for long-lived branches.
Group tokens

### Tokens
Use one of the following tokens in front of your branch names to group it without a given category.

- `wip/`: Works in progress; stuff you know won't be finished soon
- `feat/`: Feature you're adding or expanding
- `bug/`: Bug fix
- `junk/`: trash branch created to experiment

### Do not use bare numbers
Do not use use bare numbers (or hex numbers) as part of your branch naming scheme. Inside tab-expansion of a reference name, git may decide that a number is part of a sha-1 instead of a branch name.

### Avoid long descriptive names
Long branch names can be very helpful when you are looking at a list of branches. But it can get in the way when looking at decorated one-line logs as the branch names can eat up most of the single line and abbreviate the visible part of the log.

## Commit convention
Each time you finished a part of your code which deserves to be described, you have to create a commit. In order to correctly write your commit message, use the following template.

```
<Short description>
Added:
Updated:
Fixed:
Removed: 
```

Between each part, you will describe what you've done. For example, if I've added a new route to the API, deleted a file named `useless.js` and fixed an existing bug, I will write the following commit message.

```
Route: add new customer
Added:
- New route to add a customer in the database
Updated:
Fixed:
- Bug #14
Removed: 
- file named 'useless.js' which is not relevant anymore
```

As you may have seen, in the `Fixed` part, you should always refer to an issue which is describing the bug. Furthermore, you have to separate your contributions using `-` on a new line.

## Merge request submission
In this repository, two merge request templates are provided in order to help you.`bug.md` has to be used when you're asking a merge request for a bug fix. On the other hand, `feature.md` has to be used to create a new merge request about a feature.

Warning! Your merge request will not be accepted if it doesn't follow the template or if it's incomplete.

## Issue submission
Same as the merge request, two issue templates are provided in order to help you in the writing process of your issue. There are two use-cases. First, when you want to identify a bug, you have to use the `bug.md` template to write your issue. Finally, in order to create a new feature, you have to follow the `feature.md` template.

If you don't follow these templates, your issue will be rejected.

## How to contribute?
As a developer, you will never be able to push on `master` and `dev` branches, as well as `production/*`.

- First, create a new branch (based on `dev`) with the correct token corresponding to your current task (see [Contribution Guide](#contribution-guide) for naming convention). For example, let say you want to add a new feature:

```bash
git fetch origin
git checkout dev
git checkout -b feat/new-feature
git push origin feat/new-feature
```

- Then, develop the stuff you need and remember to commit everytime you add a new mechanism to your code which deserves to be described (see [Contribution Guide](#contribution-guide) for commit convention).

- Finally, once you've finished your task and written all the unit tests, create a new merge request from your current branch to `dev` (<i>Tips: when you push, a link appears on your shell to create a new merge request using your web browser</i>).

