import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as fabric from 'fabric';

const FabricCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const canvasInstanceRef = useRef(null);
  const deleteIconUrl = 'https://img.icons8.com/ios/50/000000/delete-sign.png';

  useEffect(() => {
    if (!canvasInstanceRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      canvasInstanceRef.current = canvas;
    }

    return () => {
      if (canvasInstanceRef.current) {
        canvasInstanceRef.current.dispose();
        canvasInstanceRef.current = null;
      }
    };
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const canvas = canvasInstanceRef.current;
    const pointer = canvas.getPointer(e);
    if (type === 'textbox') {
      const textbox = new fabric.Textbox('Text', {
        left: pointer.x,
        top: pointer.y,
      });
      addDeleteControl(textbox);
      canvas.add(textbox);
    } else if (type === 'label') {
      const label = new fabric.Text('Label', {
        left: pointer.x,
        top: pointer.y,
      });
      addDeleteControl(label);
      canvas.add(label);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addDeleteControl = (obj) => {
    obj.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
      cornerSize: 24
    });
  };

  const deleteObject = (eventData, transform) => {
    const target = transform.target;
    const canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  };

  const renderIcon = (ctx, left, top, styleOverride, fabricObject) => {
    const size = 20;
    const icon = new Image();

    icon.src = deleteIconUrl;

    icon.onload = function() {
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };

    icon.onerror = function() {
      console.error('Failed to load remove icon image');
    };
  };

  const getData = () => {
    return canvasInstanceRef.current.toJSON();
  };

  useImperativeHandle(ref, () => ({
    getData
  }));

  return (
    <div
    className="canvas-container"
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    >
    <canvas ref={canvasRef} width="900" height="1273"></canvas>
    </div>
  );

});
export default FabricCanvas;