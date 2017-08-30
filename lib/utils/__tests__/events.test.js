import {getAngle} from '../events'

it('should calculate the angle as the input style when not at a threshold', ()=>{
  const event = {};
  const currentStyles = {
    transform: [
      {rotate: 32}
    ]
  };
  const diffAngle = -10;
  const snapThreshold = 1;
  expect(getAngle(event, currentStyles, diffAngle, snapThreshold)).toEqual('42deg');
});

it('should calculate the angle as the input style and snap to the proper positive threshold', ()=>{
  const event = {};
  const currentStyles = {
    transform: [
      {rotate: 97}
    ]
  };
  const diffAngle = 10;
  const snapThreshold = 5;
  expect(getAngle(event, currentStyles, diffAngle, snapThreshold)).toEqual('90deg');
});

it('should calculate the angle as the input style and snap to the proper negative threshold', ()=>{
  const event = {};
  const currentStyles = {
    transform: [
      {rotate: -87}
    ]
  };
  const diffAngle = 10;
  const snapThreshold = 8;
  expect(getAngle(event, currentStyles, diffAngle, snapThreshold)).toEqual('-90deg');
});

it('should calculate the angle even if it is very large', ()=>{
  const event = {};
  const currentStyles = {
    transform: [
      {rotate: 456}
    ]
  };
  const diffAngle = 10;
  const snapThreshold = 5;
  expect(getAngle(event, currentStyles, diffAngle, snapThreshold)).toEqual('90deg');
});

it('should calculate the angle even if it is very large and negative', ()=>{
  const event = {};
  const currentStyles = {
    transform: [
      {rotate: -436}
    ]
  };
  const diffAngle = 10;
  const snapThreshold = 5;
  expect(getAngle(event, currentStyles, diffAngle, snapThreshold)).toEqual('-90deg');
});