import os
import time
from PIL import Image
from io import BytesIO
import json
import requests
from utils.constants import *
from repository import *

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
    insertLog(input, query, number, timestamp)

