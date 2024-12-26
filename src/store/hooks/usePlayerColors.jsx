import { useState, useEffect, useRef } from 'react';

export const usePlayerColors = (players) => {
   const [playerColors, setPlayerColors] = useState({});
   const colorsRef = useRef({});

   const getRandomColor = () => {
      const letters = '89ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
   };

   useEffect(() => {
      if (players.length > 0) {
         const colors = players.reduce((acc, player) => {
            if (!colorsRef.current[player]) {
               colorsRef.current[player] = getRandomColor();
            }
            acc[player] = colorsRef.current[player];
            return acc;
         }, {});
         setPlayerColors(colors);
      }
   }, [players]);

   return playerColors;
};
