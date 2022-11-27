from utils.dbcontext import DbConnection
from utils.constants import *

def insertLog(input, query, number, timestamp):
    connection = DbConnection(HOST, USER, PASSWORD, DATABASE)
    connection.insert(f"INSERT INTO {LOG_TABLE} ({LOG_TABLE_FIELDS}) VALUES ('{timestamp}', '{input}', '{query}', '{number}')")
    connection.close()