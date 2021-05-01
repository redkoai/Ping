
import ImageResizer from 'react-native-image-resizer';
let newWidth = 40;
let newHeight = 40;
let compressFormat = 'PNG';
let quality = 100;
let rotation = 0;
let outputPath = null;
let imageUri = this.state.selectedPictureUri;
ImageResizer.createResizedImage(
  imageUri,
  newWidth,
  newHeight,
  compressFormat,
  quality,
  rotation,
  outputPath,
)
  .then((response) => {
    // response.uri is the URI of the new image that can now be displayed, uploaded...
    //resized image uri
    let uri = response.uri;
    //generating image name
    let imageName = 'profile' + this.state.userId;
    //to resolve file path issue on different platforms
    let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    //setting the image name and image uri in the state
    this.setState({
      uploadUri,
      imageName,
    });
  })
  .catch((err) => {
    console.log('image resizing error => ', err);
  });