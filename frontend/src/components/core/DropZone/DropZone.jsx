import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const DropZone = ({ onDropHandler, className = '' }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      onDropHandler(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`relative flex justify-center p-8 items-center bg-pr-bg-secondary text-pr-border ${
        isDragActive ? 'text-pr-text-darker before:border-pr-text-darker' : ''
      }
      before:content-[''] before:absolute before:inset-4 before:border-4 before:border-dashed before:border-pr-border
      ${className}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

/* <div
ref="dropZoneRef"
class="drop-zone relative size-full border-4 border-dashed border-project-border-color text-project-border-color"
:class="{
	'!border-project-text-color !text-project-text-color': isOverDropZone
}"
>
<div class="size-full flex justify-center items-center">
	<input type="file" class="absolute inset-0 opacity-0 z-10" @input="onFileChange" />
	<span>Select or drop files here</span>
</div>
</div> */

export default DropZone;
