const PlayButton = ({ action, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex justify-center items-center rounded-full border-2 border-pr-text transition-all ${className}`}
    >
      <span
        className={`block h-[50%] w-[25%] bg-pr-main origin-right transition-all ${
          action === 'start' || action === 'resume'
            ? `clip-play-first`
            : action === 'pause'
            ? `clip-stop scale-x-[0.7] -translate-x-[0.2rem]`
            : `translate-x-[0.5px] clip-stop bg-pr-important! group-active:bg-pr-important-mute!`
        }
        group-hover:bg-pr-main-soft 
        group-active:bg-pr-main-mute`}
      ></span>
      <span
        className={`block h-[50%] w-[25%] bg-pr-main origin-left transition-all ${
          action === 'start' || action === 'resume'
            ? `clip-play-second`
            : action === 'pause'
            ? `clip-stop scale-x-[0.7] translate-x-[0.2rem]`
            : `-translate-x-[0.5px] clip-stop bg-pr-important! group-active:bg-pr-important-mute!`
        }
        group-hover:bg-pr-main-soft 
        group-active:bg-pr-main-mute`}
      ></span>
    </button>
  );
};

export default PlayButton;
