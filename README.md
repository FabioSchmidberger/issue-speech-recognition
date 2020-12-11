# ISA - Issue Speech Assistant

ISA is a speech assistant for issue creation. With ISA product owners and developers can speak freely into the web application and structured issues are created automatically.

ISA was developed as part of a Bachelor's Thesis at the University of Stuttgart.

The application is currently deployed under https://issues.fabioschmidberger.de.

Here you can try it out yourself and experiment with the speech recognition. In the settings menu you can connect your personal Github repositories or a Gropius system.
The deployed version will be available at least until 31.03.2021.

## Overview

### App

React Web Application with the UI of the application.

### DeepSpeech

DeepSpeech Microservice for automatic speech recognition. Currently not in use, due to poor recognition accuracy of DeeeSpeech. Web Speech API is used instead.

### CoreNLP API

Microservice to annotate text, written in Java.
(in the folder ./nlp/cornenlpApi)

Note: The first request after startup to the corenlp container takes up to 2 min for a response. Future requests will be much faster.

## Development

### Start Application

Start App

```
cd app
yarn start
```

Start CoreNLP API

```
cd nlp
docker-compose up
```

This command runs a 3 stage docker build where the nlp model is build, the war file of the HttpServelet is build and the results are then assembled in a production container which is started.

## Deployment

The application can be easily deployed by running the following command:

```
./deploy.sh
```

The `.env` file needs to be configured.

### Host

For the deployment a ubuntu 20.04 VM with docker-compose is used.

Run the following on the server to allow more ssh connections, which is required for docker-compose:

`echo "MaxSessions 500" >> /etc/ssh/sshd_config`

### Let's Encrypt Certs

`./certbot certonly --manual -d 'issues.fabioschmidberger.de' -d '*.issues.fabioschmidberger.de' --preferred-challenges dns`

## Additional Readings / Resources

### Cornlp

https://stanfordnlp.github.io/CoreNLP/tutorials.html

#### Training Data

https://nlp.stanford.edu/software/crf-faq.html

https://thoughtbot.com/blog/named-entity-recognition

### Example Text

- Bug in database binding. add labels bug and prio high. assign Peter. the weight is 4
- Titlebar should be green in the Component frontend. add labels design and assign Jake.
- Create Backup script for Mongo database, assign Leon. The priority is high

- Add SSO Support to backend and frontend components. Add the labels user story, and feature request Assign Fabio

- Change the color of the registration button in the component frontend, assign Max. The priority is low.
- Add a monitoring system to our server. The administrators should receive notifications if we have issues. This is for components payment-service and logging. Assign Fabio, add labels enhancement. The weight is 7 and the priority is high.
- The login button is hidden on the mobile page. Add the labels bug and UI. The components are frontend. Assign Jake. The priority is high and the weight is 3.

## Integrations

### Github

https://developer.github.com/v3/issues/#create-an-issue

const PERSONAL_ACCESS_TOKEN = '3ab1627652c24972dc7ca525885fa9943af7733f';
const owner = 'FabioSchmidberger';
const repo = 'se_172_enterprise_software_assignments';

# Issues

## Labels

- bug
- documentation
- enhancement
- question
- user story
- design
- feature

## Components

- frontend
- backend
- logging
- payment
- api
