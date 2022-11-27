import os
import eel
from services import *
from utils.constants import *

eel.init("web")

@eel.expose
def uploadFile(data: str, name: str):
    with open(f"{INPUT_PATH}{name}", "w") as file:
        file.write(data)

@eel.expose
def inputComboOptions():
    options = []
    for root, dirs, files in os.walk(INPUT_PATH):
        options = files
    return options

@eel.expose
def searchComboOptions(fileName):
    options = []

    with open(f"{INPUT_PATH}{fileName}", "r") as file:
        lines = file.readlines()
        for line in lines:
            if not (line == ""):
                options.append(line)

    return options

@eel.expose
def loadImages(input:str, query:str, number):
    imagePaths = []
    input = input.lower().removesuffix(".txt")
    query = query.lower().removesuffix("\n")

    registerLog(input, query, number)
    dirPath = handleDirectory(input, query)
    imageUrls = getImages(query, number)

    if (imageUrls.count != 0):
        imagePaths = downloadImages(dirPath, imageUrls)

    return imagePaths

@eel.expose
def getLogs():
    logs = getConvertedLogs()
    return logs

@eel.expose
def downloadLogs():
    logs = getConvertedLogs()
    fileInfo = downloadConvertedLogs(logs)
    return fileInfo

eel.start("index.html")
