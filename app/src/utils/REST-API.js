import axios from 'axios';

const seekURL = '/api/seeks';
const gameURL = '/api/game';

export const getAllGames = () => axios.get(seekURL);
export const postNewGame = (name) => axios.post(seekURL, name);
export const postJoinGame = (name, id) => axios.post(`${seekURL}/${id}`, name);

export const getPlayers = (id) => axios.get(`${gameURL}/${id}`);
export const postMoves = (move, id) =>
  axios.post(`${gameURL}/move/${id}`, move);

export const getMoves = (id) => 
  axios.get(`${gameURL}/move/${id}`);
