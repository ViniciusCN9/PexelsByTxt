from utils.dbcontext import DbConnection
from utils.constants import *

class Repository():
    def __init__(self):
        self.connection = DbConnection(HOST, USER, PASSWORD, DATABASE)

    def getLogs(self):
        self.connection = DbConnection(HOST, USER, PASSWORD, DATABASE)
        logs = self.connection.query(f"SELECT * FROM {LOG_TABLE}")
        return logs

    def insertLog(self, input, query, number, timestamp):
        self.connection = DbConnection(HOST, USER, PASSWORD, DATABASE)
        self.connection.insert(f"INSERT INTO {LOG_TABLE} ({LOG_TABLE_FIELDS}) VALUES ('{timestamp}', '{input}', '{query}', '{number}')")