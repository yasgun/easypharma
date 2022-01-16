# EasyPharma Pharmacy Management System
[![Build Status](https://travis-ci.org/yasgun/easypharma.svg?branch=master)](https://travis-ci.org/yasgun/easypharma)

EasyPharma is a web-based inventory and purchase management system focusing on giving pharmacies a free customizable point of sales system (POS).

The mission of EasyPharma is to improve the quality of pharmacies by coordinating a global community that creates a robust, scalable, user-driven, open source point of sales system.

#### Table of Contents

1. [Local Build](#local-build)
   1. [Prerequisites](#prerequisites)
   2. [Build Command](#build-command)
   3. [Deploy](#deploy)
2. [Navigating the repository](#navigating-the-repository)
3. [Demo](#demo)
4. [License](#license)

## Local Build

### Prerequisites

#### Meteor

EasyPharma is developed on Meteor framework which is why you need to install a [Meteor](https://www.meteor.com/install).

#### Git

Install the version control tool [git](https://git-scm.com/).

### Build Command

```bash
$ git clone https://github.com/yasgun/easypharma.git
$ cd easypharma
$ npm install
```

#### Settings

Add a `settings.json` file to the root folder following the structure of `settings.json.example` file.

### Deploy

```bash
$ meteor run --settings settings.json
```

#### Creating a System Administrator

Call this route with appropriate parameters to create an admin. Remember to use a working email as it is necessary to receive the enrollment email in order to set a password and login.

```bash
[ip-address]:[port]/api/config/create-admin/{email}/{first name}/{last name}
```

## Navigating the Repository

The project tree is set up as follows:

<table>
 <tr>
  <td>client/</td>
  <td>Source files for the web application client.</td>
 </tr>
 <tr>
  <td>client-tests/</td>
  <td>Tests for client side.</td>
 </tr>
 <tr>
  <td>collections/</td>
  <td>NoSQL database collections.</td>
 </tr>
 <tr>
  <td>lib/</td>
  <td>Route definitions and other libraries.</td>
 </tr>
 <tr>
  <td>public/</td>
  <td>Public folder for the web application.</td>
 </tr>
 <tr>
   <td>server/</td>
   <td>Source files for the web application server.</td>
  </tr>
</table>

## License

Copyright ©  2017 Yasas Gunarathne
