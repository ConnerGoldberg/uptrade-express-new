import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Lightbox from 'react-images';
import * as blobUtil from 'blob-util'
import checkInAPI from '../../api/check-in/checkIn';

export default class ImageUploadComponent extends PureComponent {
    static propTypes = {
        updateImage: PropTypes.func.isRequired,
        pictureURL: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
    };

    state = {
        lightboxIsOpen: false,
        picture: null,
        pictureURL: null,
        error: false,
        disabled: false,
        imagePreviewUrl:''
    };

    onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            this.setState({ picture: null, error: true, imagePreviewUrl:'' })
        }
        else {
            this.setState({ picture: acceptedFiles && acceptedFiles[0], error: false }, () => {
                this.props.updateImage(acceptedFiles && acceptedFiles[0]);
                this.preLoadImages(acceptedFiles[0]);
            });
        }
    };

    closeLightbox = (e) => {
        this.setState({ lightboxIsOpen: false });
    };

    previewImage = (e) => {
        this.setState({ lightboxIsOpen: true });
    };

    preLoadImages = (blob) => {
        let context = this;

        blobUtil.blobToBase64String(blob).then(function (base64String) {
          // success
          let mimetype="image/jpeg"
          // return "data:"+mimetype+";base64,"+b64encoded
          let srcr = "data:"+mimetype+";base64," + base64String;
          // let srcr = "data:image;base64," + base64;
          context.setState({imagePreviewUrl: srcr});
        }).catch(function (err) {
          // error
          console.log(err);
        });


    }

    removeImage = () => {
        this.setState({ picture: null, error: null, imagePreviewUrl: '' });
    };

    dropzoneRef = React.createRef();

    getPicture = () => {
        const { picture } = this.state;
        return picture && URL.createObjectURL(picture);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { pictureURL } = nextProps;
        if (nextProps.pictureURL !== prevState.pictureURL) {
            return { pictureURL };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.pictureURL && this.state.pictureURL !== prevState.pictureURL) {
            checkInAPI.fetchImage(this.state.pictureURL)
                .then(({ data }) => {
                    this.preLoadImages(data);
                    this.setState({ picture: data });
                });
        }
    }

    componentDidMount() {
        if (this.state.pictureURL) {
            checkInAPI.fetchImage(this.state.pictureURL)
                .then(({ data }) => {
                    this.preLoadImages(data);
                    this.setState({ picture: data });
                });
        }
    }

    render() {
        return (
            <div style={style.container}>
                {this.state.imagePreviewUrl && (
                    <img style={style.img} src={this.state.imagePreviewUrl} onClick={this.previewImage}/>
                ) }
                <Dropzone
                    ref={this.dropzoneRef}
                    accept="image/*"
                    onDrop={this.onDrop}
                    maxSize="20971520"
                    disableClick
                >
                    {({getRootProps, getInputProps})=> (
                        !this.state.picture && <div className="mt-1" {...getRootProps()} style={style.dropzone}>
                            <input {...getInputProps()} />
                            <div style={style.imageBoxContainer}>
                                <div style={Object.assign({}, style.imageBox, this.props.disabled ? style.disabled : '')} onClick={() => this.dropzoneRef.current.open()}>
                                    {this.state.picture ? 'Change image' : 'Upload Weekly Progress Photo'}
                                </div>
                            </div>
                        </div>
                    )}
                </Dropzone>
                { this.state.picture && (
                    <div style={{marginTop: '1em'}}>
                      {/*
                        <a style={style.previewImage} onClick={this.previewImage}>
                            Preview image
                        </a>
                        */}
                        {!this.props.disabled && (
                            <a style={style.removeImage} onClick={this.removeImage}>
                                Remove
                            </a>
                        )}
                    </div>
                )}
                { this.state.error && (
                    <h3 style={style.error}>Error: Invalid file. File must be an image that has a size that is smaller than 20MB</h3>
                )}
                <div>
                    <Lightbox
                        images={[
                            { src: this.getPicture() }
                        ]}
                        isOpen={this.state.lightboxIsOpen}
                        onClose={this.closeLightbox}
                    >
                    </Lightbox>
                </div>

            </div>
        )
    }
}

const style = {
    container: {
        marginBottom: "15px",
    },
    uploadButton: {
        background: "#007bff",
        border: "#007bff",
    },
    dropzone: {
        marginBottom: "5px",
    },
    previewImage: {
        textDecoration: 'underline',
        cursor: 'pointer',
        marginRight: "15px",
        color: 'rgb(185, 40, 49)',
    },
    removeImage: {
        textDecoration: 'underline',
        cursor: 'pointer',
        marginRight: "15px"
    },
    error: {
        color: 'red',
        fontWeight: 700,
    },
    img: {
        width: '100%',
        height: 'auto',
        cursor: 'pointer',
    },
    imageBoxContainer: {
      display: 'flex',
      flexDirection: 'row',
      // justifyContent: 'center',
    },
    imageBox: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#0d243d',
        borderStyle: 'dashed',
        padding: 20,
        textAlign: 'center',
        cursor: 'pointer',
    },
    disabled: {
        cursor: 'not-allowed',
        display: 'none',
    }
};
