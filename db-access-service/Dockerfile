FROM node:18

RUN pip install requests jsonpickle redis flask minio

COPY ./rest-server.py /app/rest-server.py

WORKDIR /app

EXPOSE 5000

ENTRYPOINT [ "python3", "-m", "flask", "--app", "rest-server.py", "run", "--host=0.0.0.0" ]