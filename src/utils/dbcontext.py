import mysql.connector

class DbConnection():
    def __init__(self, host, user, password, database):
        self.connection = mysql.connector.connect(host=host, user=user, password=password, database=database)
        self.cursor = self.connection.cursor()

    def insert(self, sql):
        self.cursor.execute(sql)
        self.connection.commit()

    def query(self, sql):
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        return result

    def close(self):
        self.connection.close()
