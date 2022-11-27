import os
import time
import json
import requests
import codecs
from PIL import Image
from io import BytesIO
from datetime import datetime, timedelta
from utils.constants import *
from repository import Repository

repository = Repository()

def handleDirectory(input, query):
    rootPath = os.getcwd()
    imagePath = os.path.join(rootPath, IMAGES_PATH)
    inputPath = os.path.join(rootPath, IMAGES_PATH, input)
    queryPath = os.path.join(inputPath, query)

    if not os.path.isdir(imagePath):
        os.mkdir(imagePath)

    if not os.path.isdir(inputPath):
        os.mkdir(inputPath)

    if not os.path.isdir(queryPath):
        os.mkdir(queryPath)
    else:
        for file in os.listdir(queryPath):
            os.remove(os.path.join(queryPath, file))

    return queryPath

def getImages(query, number):
    headers = {"Authorization": API_KEY}
    response = requests.get(f"{URL}?query={query}&size=small&per_page={number}", headers=headers)
    response = json.loads(response.content)

    imageUrls = []
    if response['total_results']:
        images = response['photos']
        for image in images:
            imageUrls.append(image['src'][f'{IMAGE_SIZE}'])

    return imageUrls

def downloadImages(dirPath, images):
    imagePaths = []

    for i in range(0, len(images)): 
        imgFile = Image.open(BytesIO(requests.get(images[i]).content))
        imgName = f"{i}.{IMAGE_EXTENSION}"
        imgPath = os.path.join(dirPath, imgName)
        imgFile.save(imgPath)
        imgSrc = f".{imgPath.split('web')[1]}"
        imagePaths.append(imgSrc)

    return imagePaths

def registerLog(input, query, number):
    if (input == "" or input is None or query == "" or query is None or number == 0 or number is None):
        return
    
    timestamp = int(time.time())
    repository.insertLog(input, query, number, timestamp)

def getConvertedLogs():
    convertedLogs = []
    logs = repository.getLogs()

    for log in logs:
        fullDate = datetime.utcfromtimestamp(log[0])
        fullDate = fullDate - timedelta(hours=3)
        date = f"{fullDate.day:02}/{fullDate.month:02}/{fullDate.year:04}"
        hour = f"{fullDate.hour:02}:{fullDate.minute:02}:{fullDate.second:02}"
        input = log[1]
        query = log[2]
        number = log[3]

        convertedlog = [date, hour, input, query, number]
        convertedLogs.append(convertedlog)
        
    return convertedLogs

def downloadConvertedLogs(logs):
    fileName = f"{int(time.time())}{TXT_FILE_NAME}"
    path = os.path.join(OUTPUT_PATH, fileName)

    with codecs.open(path, "w", "utf-8") as file:
        for log in logs:
            file.writelines(f"Dia: {log[0]} | Horário: {log[1]} | Arquivo: {log[2]} | Item: {log[3]} | Quantidade: {log[4]}\n")

    path = f"output/{fileName}"
    return [path, fileName]
