const primaryColors = ['00', 'FF'];

export const getRandomColor = () => {
   let color = '#';
   for (let i = 0; i < 3; i++) {
      color += primaryColors[Math.floor(Math.random() * primaryColors.length)];
   }
   if (color === '#FFFFFF') {
      return getRandomColor();
   }
   return color;
};
