import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import io from 'socket.io-client';
import {TypeNumber} from '../../number/redux/number.type';
import {TypeRoom} from '../../room/redux/room.type';

export const useWebSockets = ({userId, enabled, onConnected, room}) => {
  const ref = useRef();
  const dispatch = useDispatch();

  const send = (msg, senderId) => {
    ref.current.emit('msgToServer', {
      content: msg,
      senderId: senderId,
      userId,
      date: new Date(),
    });
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const socket = io('http://192.168.1.22:3002/room');

    socket.emit('joinRoom', room);

    socket.on('currentNumber', message => {
      console.log(`message currentNumber`, message);

      // change current my number picked
      dispatch({
        type: TypeNumber.changeCurrentNumberPickerField,
        payload: {
          changeFields: {
            ...message.opts,
          },
        },
      });
    });

    socket.on('totalMember', message => {
      console.log(`message totalMember`, message);

      // change total member in room

      dispatch({
        type: TypeRoom.changeTotalMemberSocket,
        payload: {
          _id: message.opts._id,
          memberTotal: message.opts.memberTotal,
        },
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect', () => {
      if (onConnected) {
        onConnected();
      }
    });

    socket.on('reconnect', () => {
      socket.emit('joinRoom', userId);
    });

    ref.current = socket;

    return () => socket.disconnect();
  }, [enabled, userId, room]);

  return {
    send,
  };
};
