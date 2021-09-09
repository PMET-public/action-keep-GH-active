# Description
This project attempts to keep a GH repo active so workflows will continue to work after 60 days.

## Background
Currently, [workflows are disabled after 60 days of inactivity](https://github.community/t/no-notification-workflow-disabled-after-60-days/182169). However, there are many legitimate use cases to continue workflows even when your project is not actively being developed.
For example, when your project relies on 3rd party code that may be updated at any time and subsequently cause yours to break. Having a periodic build workflow can notify you quickly that something is wrong.

## Solution?
So can we keep a project "active" past 60 days automatically? Well, it depends on GH and what counts as ["active"](https://github.community/t/no-notification-workflow-disabled-after-60-days/182169/7). In this GH action, we try to keep a project active with minimum activity and permission. We start by creating a new GH token and granting it the `repo:status` scope to [prevent access to the code](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps), but hopefully, it's enough to keep the project active.

## Reference
https://github.com/actions/javascript-action