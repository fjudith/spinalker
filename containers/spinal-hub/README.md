# Spinal Hub

This folder containers contains resources to build the local IoT nerve center _(a.k.a spinal-hub )_ container

**Warning**: The SpinalCom nerve center is a licensed 

### Building

Due to the repository structure The build must run from the root directory for the `spinal-viewer`.

```bash
./buid/spinal-hub.sh
```

### Running

Once the container image succesfully built, run the following to spawn a `spinal-hub` instance.

```bash
docker container run --rm --name spinal-hub \
-p "8088:8088" \
-p "8089:8089" \
-p "8090:8090" \
docker.io/fjudith/spinal-hub
```

## Environement variables and related command arguments

| Variable                 | Argument                       | Description                                                                         | Default value                          |
|--------------------------|--------------------------------|-------------------------------------------------------------------------------------|----------------------------------------|
| HUB_BASE_DIR             | `-b`, `--base-dir`             | base directory of files to be served (/ in http requests)                           | `html`                                 |
| HUB_ADMIN_DIR            | `-a`, `--admin-dir`            | **or** admin directory of files to be served (/ in http requests)                   | `admin`                                |
| HUB_DB_FILE              | `--db-file`                    | file name of the database                                                           | `memory/dump.db`                       |
| HUB_DB_DIR               | `--db-dir`                     | name of the database file directory (for bulk data)                                 | `memory/data.db`                       |
| HUB_VERBOSE              | `-v`, `--verbose`              | enable detailed execution informations (`true|false`)                               | `false`                                |
| HUB_LAUNCH_BROWSER_SUPER | `-L`, `--launch-browser-super` | after the server start, launch a browser on the supervision page (`true|false`)     | `false`                                |
| HUB_LAUNCH_BROWSER       | `-l`, `--launch-browser`       | after the server start, launch a browser on the public page (see -s) (`true|false`) | `false`                                |
| HUB_LAUNCH_COMMAND       | `-C`, `--launch-command`       | after the server start, launch a command                                            | _None_                                 |
| HUB_START_PAGE           | `-s`, `--start-page`           | start page for the browser on the public data                                       | `/`                                    |
| HUB_TITLE_PAGE           | `-t`, `--title-page`           | title of the page used for xdotool (default='')                                     | _None_                                 |
| HUB_PORT                 | `-p`, `--port`                 | http port for supervision                                                           | `8888`                                 |
| HUB_SUPER_PORT           | `-P`, `--super-port`           | http port for supervision                                                           | `8889`                                 |
| HUB_SODA_PORT            | `-q`, `--soda-port`            | port for binary public communication                                                | `8890`                                 |
| HUB_ADMINPASS            | `-x`, `--adminpass`            | password for admin user with write/read permissions                                 | `JHGgcz45JKilmzknzelf65ddDadggftIO98P` |
| HUB_SUPERPASS            | `-w`, `--superpass`            | password for user with write/read permissions                                       | `4YCSeYUzsDG8XSrjqXgkDPrdmJ3fQqHs`     |
| HUB_PASS                 | `-r`, `--pass`                 | password for user with read permissions                                             | `LQv2nm9G2rqMerk23Tav2ufeuRM2K5RG`     |
| HUB_MODIFY_PASSWORDS     | `-m`, `--modify-passwords`     | modify the passwords (`true|false`)                                                 | _n/a_                                  |

### Buil specifics
| Variable                 | Argument                       | Description                                                                         | Default value      |
|--------------------------|--------------------------------|-------------------------------------------------------------------------------------|--------------------|
| HUB_COMPILATION_DIR      | `-c`, `--compilation-dir`      | compilation dir (generation for static pages, ...)                                  | `compilations`     |
| HUB_SIPE_BINARY          | `--sipe-executable`            | path to the sipe binary                                                             | `.//ext/Sipe/sipe` |
| HUB_CXX_BINARY           | `--cxx`                        | path to the compiler binary                                                         | `g++`              |
| HUB_LD_BINARY            | `--cxx`                        | path to the linker binary                                                           | `g++`              |
| HUB_OBJCOPY_BINARY       | `--objcopy`                    | path to the objcopy utility binary                                                  | `objcopy`          |
| HUB_OBJ_FORMAT           | `--obj-format`                 | object format (used by objcopy)                                                     | `elf64-x86-64`     |
| HUB_TIMEOUT_CHAN         | `--timeout-chan`               | timeout in seconds to respawn push channels (if no websocket)                       | `elf64-x86-64`     |
