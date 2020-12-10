# ISA - Issue Speech Assistant

ISA is a speech assistant for issue creation. With ISA product owners and developers can speak freely into the web application and structured issues are created automatically.

ISA was developed as part of a Bachelor's Thesis at the University of Stuttgart.

The Application is currently deplodey under

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

Build CoreNLP Model

```
cd nlp
./build-model.sh
```

Build CoreNLP API war

```

```

Start CoreNLP API

```
cd nlp/corenlpApi
docker-compose up
```

## Deployment

The application can be easily deployed by running the following command:

```
./deploy.sh
```

## NLP

### Cornlp

https://stanfordnlp.github.io/CoreNLP/tutorials.html

### Java Project

use gradle clean package to build war files

http://localhost:8080/api/corenlp?text="test"

### Training Data

https://nlp.stanford.edu/software/crf-faq.html

https://thoughtbot.com/blog/named-entity-recognition

### Training Data GEN

- have training sentices
- tokenize and pre lable with predicted entity classes from current model
- then just fix up errors

### Example Text

- create new issue with title bug in database binding. add labels bug and prio high. assign Peter. the weight is 4

- Titlebar should be green, add lables design and assign Jake
- Create Backup script for Mongo db, assign Leon

- Create a new issue for the component backend with the title:
  Add SSO Support Add the labels user story, and feature request Assign
  Fabio

- Change the color of the registration button in the component frontend, assign Max

- Add a monitoring system to our server. The administrators should receive notifications if we have issues. This is for components payment-service and auth-service. Assign Fabio, add labels enhancement. The weight is 7 and the priority is high.

- The login button is hidden on the mobile page. Add the labels bug and UI. The components are frontend. Assign Jake.

## Speech

### Kaldi

https://github.com/jcsilva/docker-kaldi-gstreamer-server

## Integrations

### Github

https://developer.github.com/v3/issues/#create-an-issue

const PERSONAL_ACCESS_TOKEN = '3ab1627652c24972dc7ca525885fa9943af7733f';
const owner = 'FabioSchmidberger';
const repo = 'se_172_enterprise_software_assignments';

# Issues

## Lables

bug, documentation, duplicate, enhancement, good first issue, help wanted, invalid, question, won't fix

at
the
labours
design

## Deployment

For the deployment a ubuntu 20.04 VM with docker-compose is used.

Run the following on the server to allow more ssh connections, which is required for docker-compose:

`echo "MaxSessions 500" >> /etc/ssh/sshd_config`

### Let's Encrypt Certs

`./certbot certonly --manual -d 'issues.fabioschmidberger.de' -d '*.issues.fabioschmidberger.de' --preferred-challenges dns`

## components

Have service as second part of their name

# Thesis Notes

Recognition Pipeline: trigram Matching
