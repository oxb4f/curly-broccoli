const createDraggable = (containerRef, handlerOnDragging, handlerOnStopDragging) => {
  const handleOnPointerMove = (event) => {
    const containerBounds = containerRef.current.containerBounds;

    const { clientX, clientY } = event;
    const offsetX = clientX - containerBounds.left;
    const offsetY = clientY - containerBounds.top;

    handlerOnDragging(offsetX, offsetY);
  };

  const handleOnPointerDown = (event) => {
    const draggableElement = event.currentTarget;
    containerRef.current.containerBounds = containerRef.current?.getBoundingClientRect();

    draggableElement.setPointerCapture(event.pointerId);
    draggableElement.addEventListener('pointermove', handleOnPointerMove);

    draggableElement.onpointerup = () => {
      draggableElement.removeEventListener('pointermove', handleOnPointerMove);
      draggableElement.onpointerup = null;
      handlerOnStopDragging();
    };
  };

  return { startDragging: handleOnPointerDown };
};

export default createDraggable;
