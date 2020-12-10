FROM openjdk:16-jdk-alpine3.12 as corenlp-builder

RUN apk add --update \
  curl unzip\
  && rm -rf /var/cache/apk/*

RUN curl -O -L https://nlp.stanford.edu/software/stanford-corenlp-full-2018-10-05.zip \
  && unzip stanford-corenlp-full-2018-10-05.zip \
  && rm stanford-corenlp-full-2018-10-05.zip
ENV CORE_NLP_PATH="/stanford-corenlp-full-2018-10-05/*"

WORKDIR /build
COPY . .
# Build model
RUN time java -Xmx2g -cp "$CORE_NLP_PATH" edu.stanford.nlp.ie.crf.CRFClassifier -prop ner.model.props
RUN ls -al

FROM maven:3.6-openjdk-8 as war-builder
# create app folder for sources
RUN mkdir -p /build
WORKDIR /build
COPY corenlpApi/corenlp/pom.xml /build
#Download all required dependencies into one layer
RUN mvn -B dependency:resolve dependency:resolve-plugins
#Copy source code
COPY corenlpApi/corenlp/src /build/src

RUN mvn clean package

# Install Tomcat & openjdk 8 (openjdk has java and javac)
FROM tomcat:jdk8-openjdk as production-stage
# Copy source files to tomcat folder structure

COPY --from=war-builder /build/target/* /usr/local/tomcat/webapps/api/
COPY --from=corenlp-builder /build/ner.model.ser.gz /usr/local/models/

# Serve Tomcat
EXPOSE 8080
CMD ["catalina.sh", "run"]