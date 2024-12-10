import { cn } from '../utilities/cn';

const containerClasses = cn(
   'container',
   'my-[10%]',
   'mx-[35%]',
   'w-[33%]',
   'border-solid',
   'border-custom-gray',
   'border-4',
   'rounded-2xl',
   'shadow-S-card'
);
const addPlayerButtonClasses = cn(
   'border-solid',
   'border-custom-gray',
   'border-2',
   'rounded-lg',
   ' w-full',
   'h-12',
   'shadow-S-button',
   'font-bold',
   'pl-5',
   'text-start'
);
const playerNameInputClasses = cn(
   'border-solid',
   'border-custom-gray',
   'border-2',
   'rounded-lg',
   'h-12',
   'pl-3'
);

const playerListClasses = cn(
   'border-solid',
   'border-custom-gray ',
   'border-2',
   'rounded-lg',
   ' py-3.5',
   'pl-3.5',
   'text-sm',
   'my-2.5'
);
const startGameButtonClasses = (players) =>
   cn(
      'border-solid',
      'border-custom-gray',
      'border-2',
      'rounded-lg',
      'w-full',
      'h-12',
      'font-bold',
      'text-white',
      'shadow-S-button',
      {
         'bg-gradient-to-t from-darkBlue-500 to-lightBlue-100':
            players.length >= 2,
         'bg-gradient-to-t from-gray-500 to-gray-100': players.length < 2,
         'cursor-not-allowed': players.length < 2,
      }
   );

export {
   containerClasses,
   addPlayerButtonClasses,
   playerNameInputClasses,
   playerListClasses,
   startGameButtonClasses,
};
