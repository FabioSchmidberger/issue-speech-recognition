# Install Tomcat & openjdk 8 (openjdk has java and javac)
FROM tomcat:jdk8-openjdk
# Copy source files to tomcat folder structure
COPY . /usr/local/tomcat/webapps/api

# -cp, Adding compile time classpath as Tomcat's /lib/servlet-api.jar file.
# - d, destination output location.
RUN ["javac", "-cp", ".:/usr/local/tomcat/lib/servlet-api.jar", "-d", "/usr/local/tomcat/webapps/api/WEB-INF/classes/", "/usr/local/tomcat/webapps/api/src/CorenlpServelet.java"]

# Serve Tomcat
EXPOSE 8080
CMD ["catalina.sh", "run"]