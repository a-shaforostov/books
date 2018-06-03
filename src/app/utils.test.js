import * as utils from './utils';
import {reservationTime} from "./constants";

// check for exports
test('check for exports', () => {
  expect(utils).toEqual(expect.objectContaining({
    timeFormatHM: expect.any(Function),
    timeFormatHMS: expect.any(Function),
    isReserveActive: expect.any(Function),
    formatDistance: expect.any(Function),
    removeDashes: expect.any(Function),
    isApproxEqual: expect.any(Function),
  }))
});

test('check timeFormatHM in correct way', () => {
  expect(utils.timeFormatHM(
    new Date((new Date()).setHours(0, 10, 50))
  )).toEqual('00:10');
  expect(utils.timeFormatHM(
    new Date((new Date()).setHours(12, 0, 50))
  )).toEqual('12:00');
  expect(utils.timeFormatHM(
    new Date((new Date()).setHours(0, 0, 10))
  )).toEqual('00:00');
  expect(utils.timeFormatHM(
    new Date((new Date()).setHours(23, 59))
  )).toEqual('23:59');
});

test('check timeFormatHM in wrong way', () => {
  expect(utils.timeFormatHM()).toEqual('');
  expect(utils.timeFormatHM('')).toEqual('');
  expect(utils.timeFormatHM([])).toEqual('');
  expect(utils.timeFormatHM({})).toEqual('');
});

test('check timeFormatHMS in correct way', () => {
  expect(utils.timeFormatHMS(
    new Date((new Date()).setHours(0, 10, 50))
  )).toEqual('00:10:50');

  expect(utils.timeFormatHMS(
    new Date((new Date()).setHours(12, 0, 50))
  )).toEqual('12:00:50');

  expect(utils.timeFormatHMS(
    new Date((new Date()).setHours(0, 0, 10))
  )).toEqual('00:00:10');

  const date = new Date();
  const sec = String(date.getSeconds());
  expect(utils.timeFormatHMS(
    new Date(date.setHours(23, 59))
  )).toEqual(`23:59:${sec.padStart(2, '0')}`);
});

test('check timeFormatHMS in wrong way', () => {
  expect(utils.timeFormatHMS()).toEqual('');
  expect(utils.timeFormatHMS('')).toEqual('');
  expect(utils.timeFormatHMS([])).toEqual('');
  expect(utils.timeFormatHMS({})).toEqual('');
});

test('check isReserveActive in correct way', () => {
  const now = new Date();

  const date1 = new Date(now.getTime() - 60*1000);
  expect(utils.isReserveActive(date1)).toEqual(false);

  const date2 = new Date(now.getTime() + 60*1000);
  expect(utils.isReserveActive(date2)).toEqual(true);

  expect(utils.isReserveActive(now)).toEqual(false);
});

test('check isReserveActive in wrong way', () => {
  expect(utils.isReserveActive()).toEqual(false);
  expect(utils.isReserveActive('')).toEqual(false);
  expect(utils.isReserveActive([])).toEqual(false);
  expect(utils.isReserveActive({})).toEqual(false);
});

test('check formatDistance in correct way', () => {
  expect(utils.formatDistance(120983.0392)).toEqual('~120 км ');
  expect(utils.formatDistance(8927.987)).toEqual('8 км 928 м');
  expect(utils.formatDistance(563.8745)).toEqual('564 м');
});

test('check formatDistance in wrong way', () => {
  expect(utils.formatDistance('sdf')).toEqual('');
  expect(utils.formatDistance()).toEqual('');
});

test('check removeDashes in correct way', () => {
  expect(utils.removeDashes('234-34-34-2')).toEqual('23434342');
  expect(utils.removeDashes('---23')).toEqual('23');
  expect(utils.removeDashes('2324-asdds--')).toEqual('2324asdds');
  expect(utils.removeDashes(34534345)).toEqual('34534345');
});

test('check formatDistance in wrong way', () => {
  expect(utils.formatDistance([])).toEqual('');
  expect(utils.formatDistance()).toEqual('');
});

test('check isApproxEqual in correct way', () => {
  expect(utils.isApproxEqual('Львів. Пані. Панянки', 'панянки')).toEqual(true);
  expect(utils.isApproxEqual('Львів. Пані. Панянки', 'понянки')).toEqual(true);
  expect(utils.isApproxEqual('Львів. Пані. Панянки', 'напаки')).toEqual(false);
  expect(utils.isApproxEqual('Червоний горобець', 'Чорний горобець')).toEqual(true);
  expect(utils.isApproxEqual('Червоний горобець', 'блакитний горобець')).toEqual(false);
  expect(utils.isApproxEqual('Червоний горобець', 'блакитний')).toEqual(false);
});

test('check isApproxEqual in wrong way', () => {
  expect(utils.isApproxEqual([])).toEqual(false);
  expect(utils.isApproxEqual()).toEqual(false);
});
