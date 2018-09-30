# About EasyPharma
A user friendly web based inventory and purchase management system for pharmacies, comes along with an API that supports connecting external parties to the system for sharing useful information.

## Installation

```bash
$ git clone https://github.com/easyweb-lk/easypharma.git
$ cd easypharma
$ npm install
```

**Adding settings.json**

Add a settings.json file to the root folder following the structure of settings.json.example file.

**Running the server**

```bash
$ meteor run --settings settings.json
```

**Creating an system administrator**

Call this route with appropriate parameters to create an admin. Remember to use a working email as it is necessary receive the enrollment email in order to set a password and login.

```bash
localhost:3000/api/config/create-admin/{email}/{first name}/{last name}
```

