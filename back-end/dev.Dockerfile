# FROM ubuntu:latest
FROM python:latest
ENV DEBIAN_FRONTEND=noninteractive

# COPY ./badproxy /etc/apt/apt.conf.d/99fixbadproxy

RUN apt-get clean && apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get install -y default-libmysqlclient-dev libpq-dev postgresql
RUN pip3 install --upgrade pip

COPY . usr/src/backend
COPY requirements.txt usr/src/backend/requirements.txt

WORKDIR /usr/src/backend

RUN pip3 install -r requirements.txt
RUN pip install black

EXPOSE 80

ENTRYPOINT ["python3"]
CMD ["app.py"]
