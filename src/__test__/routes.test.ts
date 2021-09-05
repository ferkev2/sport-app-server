import request from "supertest";
import app from "../app";
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/sports');
})

afterAll(async () => {
  await mongoose.disconnect();
})

describe('app', () => {
  it('should dispay app homepage', async () => {
    const result = await request(app).get('/api').send();
    expect(result.status).toBe(200);
  })
})

describe('get leagues', () => {
  it('should display all ligues', async () => {
    const result = await request(app).get("/api/leagues").send();
    expect(result.header["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(result.status).toBe(200);
  })

  it("should display all ligues", async () => {
    const result = await request(app)
      .get("/api/leagues")
      .set("Content-type", "application/json")
      .send()

    expect(result.body).toEqual([
      {
        "_id": "5d2cdcf7da07b95bb8f16ed1",
        "name": "English Premier League",
        "sport": "soccer",
        "teams": [
          "5d2d01fdda07b95bb8f16f0a",
          "5d2d02d7da07b95bb8f16f2a",
          "5d2d8f60da07b95bb8f17170",
          ],
      },
      {
        "_id": "5d2cdd30da07b95bb8f16ed9",
        "name": "French Ligue 1",
        "sport": "soccer",
        "teams": [],
      },
      {
        "_id": "5d2d00d7da07b95bb8f16eed",
        "name": "Supercopa de Espana",
        "sport": "soccer",
        "teams": [],
      }
    ])
  });

  describe('get a team', () => {
    it('should display player list', async() => {
      const id = "5d2d01fdda07b95bb8f16f0a";
      const result = await request(app)
        .get(`/api/team/${id}`)
        .set("Content-type", "application/json")
        .send();

        expect(result.status).toBe(200);
    })
  })

  describe('make a search', () => {
    it('should search a league', async () => {
      const result = await request(app).get("/api/search?league=english").send();
      console.log(result)
      expect(result.status).toBe(200);
    })
  })
})
