# This is not finished!!! Don't attempt if you are seeing this.

# A cheap, moderate skill level setup for your personal website

### Table of Contents
- [Preview of tools](https://github.com/MasonChinkin/personal-website-tutorial#preview-of-tools-used)
1. [Set up required accounts](https://github.com/MasonChinkin/personal-website-tutorial#set-up-required-accounts)
2. [Setup Google Cloud Platform](https://github.com/MasonChinkin/personal-website-tutorial#setup-google-cloud-platform)
2. [Setup GitHub](https://github.com/MasonChinkin/personal-website-tutorial#setup-github)
3. [SSH into the instance and Do a one time only setup](https://github.com/MasonChinkin/personal-website-tutorial#ssh-into-the-instance-and-do-a-one-time-only-setup)
4. [Is it working?](https://github.com/MasonChinkin/personal-website-tutorial#is-it-working)
5. [Is CI/CD working?](https://github.com/MasonChinkin/personal-website-tutorial#is-cicd-working)

This tutorial spawned from my own quest to upgrade my personal website from a [GitHub Page](https://masonchinkin.github.io/) to [something more advanced](masonchinkin.com), using what I had learned since starting my career as a software engineer. At a high level, I had two MVPs for my website:

1. Commits pushed to github should be automatically tested and (if tests pass) deployed to the server.
2. It should serve independent apps from independent repos under subdirectories, allowing the freedom to explore different projects with no concern for dependencies or git histories. i.e. masonchinkin.com and masonchinkin.com/baseapp are seperate apps.

### Don't be scared!!!
I have done the advanced configuration for you in the repos you will fork, and you can learn that stuff in your own time. You can do it! Almost every tool you will use in this tutrial was completely new to me when I started this.

### Preview of tools used
This setup is typically called a "mutli-container" application. Each app is built into a `Docker` container. `Docker-Compose` will spin up all of the apps on your server, and use `Nginx` to direct traffic to those apps based on the url.

CI/CD uses `Google Cloud Build` and `Google Container Registry`

The server is hosted on `Google Compute Engine`, which is free the first year and dirt cheap after that.

This tutorial will use `Google Domain` for the dns, but any dns provider would work.

The repos you will be forking are built with `create-react-app`. Using a different foundation will require adjustments to `server.js` and `Dockerfile`. You will not need working React knowledge to complete this tutorial.

***

### Let's go!

#### Set up required accounts

You will need a gmail account and github account. Even though everything will be free initially (excluding buying a domain), you will be required to provide your credit card to enable the necessary `Google Cloud Platform` services.

#### Setup Google Cloud Platform
* Create a project named `portfolio`
  * [LINK](https://console.cloud.google.com/projectcreate)

* While logged into the project above, click `enable api` at the following links
  * [Cloud Build](https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com)
  * [Container Registry](https://console.cloud.google.com/apis/library/containerregistry.googleapis.com)
  * [Compute Engine](https://console.cloud.google.com/apis/library/compute.googleapis.com)

* Add a key-value pair to the `Compute Engine` meta-data
  * [LINK](https://console.cloud.google.com/compute/metadata)
  * Key: enable-oslogin
  * Value: TRUE

* Create the `Compute Engine` instance with the following settings
  * Machine Type: f1-micro (this is the free tier)
  * Boot Disk: Debian GNU/Linux 9 (should be the default)
  * checkmark allow http and https traffic

* Make the instance's IP Address static
  * By default, the IP address will change every time your server restarts
  * Make it static at this [LINK](https://console.cloud.google.com/networking/addresses) using the drop down under `Type`

* Give `Cloud Build` ssh access to the instance
  * [LINK](https://console.cloud.google.com/iam-admin/iam)
  * Give the accounts ending in `...@cloudbuild.gserviceaccount.com` and `...@gcp-sa-cloudbuild.iam.gserviceaccount.com` the following roles:
    * `Compute Instance Admin (v1)`
    * `Compute OS Admin Login`

* Set up the DNS with `Google Domains`
  * [LINK](https://domains.google/)
  * A `.com` url will cost $12/year
  * Go to [DNS Settings](https://domains.google.com/m/registrar/). Add 2 records under `Custom resource records` with your instance's static IP.

| name | type | TTL | data                    |
|------|------|-----|-------------------------|
| @    | A    | 1h  | Your Instance IP Address|
| www  | A    | 1h  | Your Instance IP Address|

#### Set Up GitHub
* Fork these 3 repos
  * [personal-website-base-app](https://github.com/MasonChinkin/personal-website-base-app)
  * [personal-website-tutorial](https://github.com/MasonChinkin/personal-website-tutorial)
  * [personal-website-tutorial-docker-compose](https://github.com/MasonChinkin/personal-website-tutorial-docker-compose)
  * **OPTIONAL:** Rename the repos, but remember which is which for the instructions below.

* Integrate `Cloud Build` into these repos
  * [LINK](https://github.com/marketplace/google-cloud-build)
  * Enable and give access to the 3 repos
  * Create default triggers when it takes you the [trigger configuration](https://console.cloud.google.com/cloud-build/triggers). The default trigger listens for any push to any branch. You can customize these triggers later.

* Prep the `personal-website-tutorial-docker-compose` repo
  * In `init-letsencrypt.sh`, change `EMAIL` and `DOMAIN` to reflect your domain name and email. This script makes it easy to secure an ssl certificate, giving your website the `s` in `https`.
  * In `docker-compose.yaml`, change `PROJECT` to reflect your `Google Cloud Platform` project name, which should be "portfolio-" + a number.

#### SSH into the instance and Do a one time only setup
* Set up docker compose
  * Install `Docker Compose` using a script provided by Docker
  * `sudo curl -fsSL https://get.docker.com -o get-docker.sh`
  * `sudo sh get-docker.sh`
  * `git pull` the fork of personal-website-tutorial-docker-compose
* `cd personal-website-tutorial-docker-compose`
* Set up ssl certificate
  * `chmod +x init-letsencrypt.sh && sudo init-letsencrypt.sh`
* `sudo docker-compose up -d'`
* Confirm that it containers are running with `sudo docker ps`

#### Is it working?
* Check your homepageurl.com and homepageurl.com/baseapp
* If it is not loading, double check that you followed all instructions above **EXACTLY**.
* If you definitely did everything right, make an issue and I'll try to help :)

#### Is CI/CD working?
* Make a change to the html in `CreateReactApp.jsx` and push to github
* Check that [Cloud Build](https://console.cloud.google.com/cloud-build) was triggered correctly, there should be a build in progress
* Watch the build go! Take a look at `cloudbuild.yaml` to understand what is behind it.