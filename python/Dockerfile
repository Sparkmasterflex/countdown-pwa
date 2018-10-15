FROM python:3.7

ADD . /server
WORKDIR /server

RUN pip install pipenv
RUN pipenv install --system

COPY . /server
COPY countdown.py /server/

ENV PYTHONUNBUFFERED 1

EXPOSE 5000

RUN cd /server
CMD [ "python", "countdown.py" ]

