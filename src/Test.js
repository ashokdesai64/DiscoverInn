import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

let image2 = `https://images.unsplash.com/photo-1589487674857-1488ace05caf?auto=format&fit=crop&w=200&q=80`;

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: `https://images.unsplash.com/photo-1525184275980-9028ceb8e09f?auto=format&fit=crop&w=200&q=80`,
    };
  }

  makeid(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  downloadImage(mediaStatus) {
    let fileName = this.makeid(6);
    let filePath = RNFetchBlob.fs.dirs.DocumentDir + fileName + '.jpg';
    console.log(fileName + '  =>  ' + filePath);

    let config = {
      fileCache: true,
      path: filePath,
    };
    if (mediaStatus == 'withMedia') {
      config = {
        ...config,
        addAndroidDownloads: {
          mediaScannable: true,
        }
      };
    }

    RNFetchBlob.config(config)
      .fetch('GET', image2)
      .then(response => {
        console.log('image downloaded => ', response);

        let resPath = response.path();
        this.setState({imagePath: "file://"+resPath});


        // response.base64().then((base) => {
        //   console.log("image base64 => ",base)
        //   this.setState({imagePath: `data:image/jpeg;base64,`+base});
        // }).catch((err) => {
        //   console.log("image error => ",err)
        // })
        
      })
      .catch(err => {
        console.log('errror => ', err);
      });
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Image source={{uri: this.state.imagePath}} style={styles.image} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.downloadImage('withMedia')}>
            <Text style={{color: 'white', fontSize: 18}}>
              Download with media
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.downloadImage('noMedia')}>
            <Text style={{color: 'white', fontSize: 18}}>
              Download no media
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'black',
    marginTop: 30,
    padding: 5,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
  },
});
