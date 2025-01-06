const letters = '89ABCDEF';

export const getRandomColor = () => {
   let color = '#';
   for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
   }
   return color;
};
