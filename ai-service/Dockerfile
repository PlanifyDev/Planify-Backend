FROM python:3.9.13 

WORKDIR /app

# copy the requirements.txt file to the working directory
COPY requirements.txt .

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN pip3 install -r requirements.txt

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 -y

# copy the rest of the files to the working directory
COPY . .

# EXPOSE port 5000 to allow communication to/from server
EXPOSE 5000

CMD ["python3", "app.py"]
