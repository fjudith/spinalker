# Change log


## Unreleased

## 2021-03-13 0.0.2

## Added

* Entrypoint script to define `spinalhub` command arguments from environment variables
* Addded README with container buid and launch instructions

### Changed

* Dependency on the `spinalhub.js`

### Removed

* Dependency on the `spinalhub.js`

## 2021-03-13 0.0.1 _Not working_

### Added

* Initial version based on SpinalCom's `spinalhub` Node.JS launcher.
* Use Rync to aggregate **nerve-center** and **browser_organs** directories in the container build context
* Work from /usr/share/app/nerve-center directory
* Added .gitignore to exclude **nerve-center** and **browser_organs** from source code commits