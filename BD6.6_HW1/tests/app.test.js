const { getAllMovies, getMoviesById } = require('../controllers');
const request = require('supertest');
const http = require('http');
const { app } = require('./index.js');
const express = require('express');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllMovies: jest.fn(),
  getMoviesById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = htpp.createServer(app);
  server.listen(3000);
});

afterAll(async () => {
  server.close();
});

describe('Controller function test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return all employees', async () => {
    let mockMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];
    getAllMovies.mockReturnValue(mockMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockMovies);
    expect(result.length).toBe(3);
  });
  it('should return movies by id', async () => {
    let mockMovie = {
      movieId: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan',
    };
    getMoviesById.mockReturnValue(mockMovie);
    let result = getMoviesById(id);
    expect(result).toEqual(mockMovie);
  });
});

describe('Api endpoints', () => {
  it('should return all the movies', async () => {
    const res = await request(server).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
    movies = [
        {
          movieId: 1,
          title: 'Inception',
          genre: 'Sci-Fi',
          director: 'Christopher Nolan',
        },
        {
          movieId: 2,
          title: 'The Shawshank Redemption',
          genre: 'Drama',
          director: 'Frank Darabont',
        },
        {
          movieId: 3,
          title: 'The Godfather',
          genre: 'Crime',
          director: 'Francis Ford Coppola',
        },
      ]
    });
    expect(res.body.movies.length).toBe(3);
  });
  it('should return movie by particular id',async()=>{
    const res = await request(server).get('/movies/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movieId: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan',
    })
  })
});
