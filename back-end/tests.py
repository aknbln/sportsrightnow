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
            self.assertEqual(len(data), 92)

    def testGetAllEvents(self):
        with self.client:
            response = self.client.get("/events")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 30)

    def testGetTeamsPagination(self):
        with self.client:
            response = self.client.get("/teams?page=1&perPage=25")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 25)

#need to sort the players stuff first
    # def testGetAllPlayers(self):
    #     with self.client:
    #         response = self.client.get("/players")
    #         self.assertEqual(response.status_code, 200)
    #         data = response.json["data"]
    #         self.assertEqual(len(data), 4345)


if __name__ == "__main__":
    unittest.main()

