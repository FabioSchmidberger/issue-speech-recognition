# Install Tomcat & openjdk 8 (openjdk has java and javac)
FROM tomcat:jdk8-openjdk
# Copy source files to tomcat folder structure
COPY ./corenlp/target/* /usr/local/tomcat/webapps/api/
COPY ./models/* /usr/local/models/

# -cp, Adding compile time classpath as Tomcat's /lib/servlet-api.jar file.
# - d, destination output location.

# Serve Tomcat
EXPOSE 8080
CMD ["catalina.sh", "run"]