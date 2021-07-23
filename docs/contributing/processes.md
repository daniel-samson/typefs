---
title: Processes
sidebar_label: Processes
---

TypeFS is released in [semantic](https://semver.org) versions, to ensure that users can keep backwards compatibility with the DiskDriver API. Allowing you to build applications with stable versions of TypeFS.


## Planning Process

Before any development takes place, future versions of TypeFS are planned in advance. Each Major, Minor, and Patch version is associated with a [project](https://github.com/daniel-samson/typefs/projects). Over time, the community will create tickets as a bug, an enhancement, or a documentation request on the [issue](https://github.com/daniel-samson/typefs/issues) tracker. These tickets are then planned into a projects (or versions). Projects are then prioritized by urgency. So Patch versions will be worked on first before Minor versions. Minor patches are worked on before Major versions. Sometimes tickets will be moved back into a future version, depending on the resource available and how urgent a ticket is. The projects are also referred to as the road map.

## Development Process

When work has started on the next version of TypeFS, the tickets on the associated project will be assigned to contributors. These tickets are then taken from the TODO column and place into the progress column. This signifies that the work is being carried out. The assigned code contributors are expected to create a new branch from the main branch. The branch must be named with the 'feature/' or 'fix/' prefix. For the sake transparency, a pull request should be created while working on a ticket but it is not strictly required to create a pull request while working on a ticket. A pull request must be labeled as work in progress and do not merge during development. When the a work on a ticket has been completed, all labels should be removed. 

Before a pull request can be merged into the code base, it must be reviewed by a trusted contributor, and it must pass automated checks. It is expected that code contributors provide automated tests to cover 100% of the new code which they have introduced. However, other code contributor may help to provide automated tests.

Once a pull request has passed all the required checks, it will be merged into the project. Then the associated ticket in the project must taken from the in progress column into the done column.

## Quality Assurance Process
When all tickets are in the done column, a manual test will be conducted to verify that most of the key features of TypeFS are working. If any issues are found, then bug tickets should be made on the issue tracker and then added to project. The version will not be ready for release until such issues are addressed.

## Release Process
Releases are managed by the [Release](https://github.com/daniel-samson/typefs/actions/workflows/release.yml) github workflow. Which automatically creates github releases and publishes to npm. The following check list must be carried out during the release process:


### Check list
1. Project tickets are in the done column
2. Ensure that automated tests cover 100% of the code in the project
3. Ensure that manual test must be run to ensure that all features are stable
4. Update .gitignore (if applicable)
5. Update .npmignore (only the package.json, package-lock.json and the dist folder should allowed in the npm package)
6. Update CHANGELOG, follow the [how to keep a changelog](https://keepachangelog.com/en/1.0.0/) guide.
7. Create a release branch eg major/v1.2.3, minor/v1.2.3, or patch/v1.2.3 from the "main" branch
8. Create a pull request and name it the after the project name. Set the base branch to "main" branch
9. Label the pr either Major, Minor, Path
10. Wait for the release pull request to pass all checks
11. Merge release pull request 
12. Ensure that CHANGELOG for said version is in the release notes
13. Close project
14. Celebrate!!!

## Documentation Process

Changes to documentation are typically done after the release of a new version of TypeFS. The documentation site is built automatically, when pull requests are merged into the documentation branch. The following is how to contribute documentation:

- [Request documentation](https://github.com/digitonic/perform-application/issues/new?assignees=&labels=documentation&template=documentation.md&title=Needs+Documentation%3A+)
- Edit the [documentation](https://github.com/daniel-samson/typefs/tree/documentation) branch
- Create a PR referencing the documentation request


