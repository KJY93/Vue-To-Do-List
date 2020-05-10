# Source code adapted from: https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/#gunicorn

# pull official base image
FROM python:3.8.0-alpine

# set work directory in Docker Container
WORKDIR /usr/src/app

# set environment variables
# PYTHONDONTWRITEBYTECODE: Prevents Python from writing pyc files to disc 
ENV PYTHONDONTWRITEBYTECODE 1 

# PYTHONUNBUFFERED: Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# copy entrypoint.sh file to the work directory in Docker Container
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

# after pip install, copy everything to the work directory in Docker Container
COPY . /usr/src/app/

# run entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]