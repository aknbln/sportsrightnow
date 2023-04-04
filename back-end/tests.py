import unittest
import app

class Tests(unittest.TestCase):
    def setUp(self):
        app.app.config["TESTING"] = True
        self.client = app.app.test_client()

    def testGetAllTeams(self):
        with self.client:
            response = self.client.get("/teams")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 91)

    def testGetAllEvents(self):
        with self.client:
            response = self.client.get("/events")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 284)

    def testGetTeamsPagination(self):
        with self.client:
            response = self.client.get("/teams?page=1&perPage=25")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 25)

#need to sort the players stuff first
    def testGetAllPlayers(self):
        with self.client:
            response = self.client.get("/players")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 4345)

    def testGetPlayerById(self):
        with self.client:
            response = self.client.get("/players/1")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(data["name"], "Caleb Houstan")

    def testGetTeamById(self):
        with self.client:
            response = self.client.get("/teams/1")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(data["name"], "Boston Celtics")

    def testGetEventById(self):
        with self.client:
            response = self.client.get("/events/1")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(data["name"], "Golden State Warriorss vs. Phoenix Suns")

if __name__ == "__main__":
    unittest.main()

