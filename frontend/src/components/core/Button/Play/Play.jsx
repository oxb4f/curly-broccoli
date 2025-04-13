import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useBookService from '../../../../hooks/useBookService';
import BookPhoto from '../../../../components/core/Book/Photo/Photo';
import Timer from '../../../../components/core/Timer/Timer';
import { useState } from 'react';

const PlayButton = ({ action, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`size-14 flex rounded-full border-2 border-pr-text bg-pr-bg-main transition-all 
						 before:block before:size-full before:bg-pr-main before:hover:bg-pr-main-soft before:active:bg-pr-main-mute before:scale-50 before:origin-right before:transition-all 
						 after:block after:size-full after:bg-pr-main after:hover:bg-pr-main-soft after:active:bg-pr-main-mute after:scale-50 after:origin-left after:transition-all
						  ${
                action === 'start'
                  ? `before:clip-play-first before:origin-right 
									after:clip-play-second after:origin-left`
                  : action === 'pause'
                  ? `before:clip-stop before:scale-x-[0.4] before:-translate-x-[0.1rem] 
									after:clip-stop after:scale-x-[0.4] after:translate-x-[0.1rem]`
                  : `before:clip-stop before:!bg-pr-important before:active:!bg-pr-important-mute  
									after:clip-stop after:!bg-pr-important after:active:!bg-pr-important-mute`
              }
					  ${className}`}
    ></button>
    // <button
    // 	onClick={handleTimerStop}
    // 	className={`absolute top-1 size-12 rounded-full border-2 border-pr-text bg-pr-bg-main transition-all
    // 		after:absolute after:inset-0 after:clip-stop after:bg-pr-important after:hover:bg-pr-important-soft after:scale-50
    // 	 ${timerStatus === 'paused' ? '-translate-x-[130%]' : 'border-transparent after:bg-transparent'}`}
    // ></button>
  );
};

export default PlayButton;
