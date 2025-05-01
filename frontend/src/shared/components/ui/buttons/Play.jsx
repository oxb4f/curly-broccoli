const PlayButton = ({ action, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`size-14 flex rounded-full border-2 border-pr-text bg-pr-bg-main transition-all
						 before:block before:size-full before:bg-pr-main hover:before:bg-pr-main-soft active:before:bg-pr-main-mute before:scale-50 before:origin-right before:transition-all 
						 after:block after:size-full after:bg-pr-main hover:after:bg-pr-main-soft active:after:bg-pr-main-mute after:scale-50 after:origin-left after:transition-all
						  ${
                action === 'start' || action === 'resume'
                  ? `before:clip-play-first before:origin-right 
									after:clip-play-second after:origin-left`
                  : action === 'pause'
                  ? `before:clip-stop before:scale-x-[0.4] before:-translate-x-[0.1rem] 
									after:clip-stop after:scale-x-[0.4] after:translate-x-[0.1rem]`
                  : `before:clip-stop before:!bg-pr-important active:before:bg-pr-important-mute!  
									after:clip-stop after:!bg-pr-important active:after:bg-pr-important-mute!`
              }
					  ${className}`}
    ></button>
  );
};

export default PlayButton;
