import { useState } from 'react';
import Dropzone from 'react-dropzone';

const UploadImage = ({ image, handleImageUpload, handleImageRemove }) => {
  const [dropzone, setDropzone] = useState({
    disabled: false,
    hovering: false,
    error: '',
    showImageUploading: false,
  });

  const dropZoneClass = dropzone.hovering
    ? 'drop-border-color image-drop'
    : 'image-drop';

  function onDrop(acceptedFile) {
    setDropzone({
      ...dropzone,
      hovering: false,
      error: '',
      showImageUploading: true,
      disabled: true,
    });
    /*
     ** If file is less than a MB
     **    If image is not square
     */
    const file = acceptedFile[0];

    if (!file) setDropzone({ ...dropzone, error: 'Unsupported file.' });
    else {
      var img = new Image();
      img.onload = () => {
        if (img.height !== img.width)
          setDropzone({ ...dropzone, error: 'Please use a square image.' });
        else
          handleImageUpload(file, () =>
            setDropzone({ ...dropzone, showImageUploading: false })
          );
      };
      img.src = URL.createObjectURL(file);
    }
  }

  if (image)
    return (
      <div className="i-wrapper">
        <span
          onClick={() => {
            setDropzone({ ...dropzone, disabled: false });
            handleImageRemove();
          }}
          className="btn-danger btn i-rem-btn"
        >
          x
        </span>
        <img className="img-fluid" src={image} alt="food" />
      </div>
    );

  return (
    <div className="i-wrapper">
      <Dropzone
        accept="image/png,image/jpeg"
        onDrop={onDrop}
        multiple={false}
        disabled={dropzone.disabled}
        onDragEnter={() => {
          setDropzone({ ...dropzone, hovering: true });
        }}
        onDragLeave={() => {
          setDropzone({ ...dropzone, hovering: false });
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={dropZoneClass}>
            <input {...getInputProps()} />
            {dropzone.showImageUploading ? (
              <span className="drop-caption text-muted">
                Image uploading Please wait...
              </span>
            ) : (
              <span className="drop-caption text-muted">
                <i className="fas fa-plus"></i>{' '}
                {dropzone.hovering ? 'Drop your image.' : 'Upload dish image.'}
              </span>
            )}
            {dropzone.error && (
              <p className="alert alert-danger">{dropzone.error}</p>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadImage;
