import React from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, ProgressBarAndroid } from 'react-native';
import RNFS from 'react-native-fs'
import forge from 'node-forge'
import {Buffer} from 'buffer'
import zlib from 'react-zlib-js'

const key = forge.random.getBytesSync(16);
const iv = forge.random.getBytesSync(16);
const limit_big = 1024*512;

export default class App extends React.Component {
  state = {
    start_encrypt:'',
    done_encrypt:'',
    start_decrypt:'',
    done_decrypt:'',
    progress_encrypt:0,
    progress_decrypt:0
  }
  async componentWillMount(){
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ])
    }catch (e){
      console.warn(e)
    }
  }
  decryptBigFile(fileUri,start,size,decipher){
    let that = this;
    RNFS.read(fileUri+'.enc',limit_big,start,'ascii')
    .then(r1=>{
      decipher.update(forge.util.createBuffer(r1));
      RNFS.appendFile(fileUri+'.jpg',decipher.output.getBytes(),'ascii')
      .then(r2=>{
        console.log("APPEND BYTES DECRYPTED");
        if((start+limit_big)<=size){
          that.setState({progress_decrypt:(start/size)})
          that.decryptBigFile(fileUri,start+limit_big,size,decipher);
        }else{
          decipher.finish();
          RNFS.appendFile(fileUri+'.jpg',decipher.output.getBytes(),'ascii')
          .then(r3=>{
            that.setState({progress_decrypt:1,done_decrypt:(new Date()).toLocaleTimeString()})
            console.log("SAMPON DI DECRYPT");
          })
        }
      })
    })
  }

  encryptBigFile(fileUri,start,size,cipher,decipher){
    let that = this;
    RNFS.read(fileUri,limit_big,start,'ascii')
    .then(res1=>{
      cipher.update(forge.util.createBuffer(res1));
      RNFS.appendFile(fileUri+'.enc',cipher.output.getBytes(),'ascii')
      .then(r2=>{
        console.log("APPEND BYTES ENCRYPTED");
        if((start+limit_big)<=size){
          that.setState({progress_encrypt:(start/size)})
          that.encryptBigFile(fileUri,start+limit_big,size,cipher,decipher);
        }else{
          cipher.finish();
          RNFS.appendFile(fileUri+'.enc',cipher.output.getBytes(),'ascii')
          .then(r3=>{
            console.log("SAMPON DI ENCRYPT");
            that.setState({progress_encrypt:1,done_encrypt:(new Date()).toLocaleTimeString()});
            RNFS.writeFile(fileUri+'.jpg', '', 'ascii')
            .then(r4=>{
              RNFS.stat(fileUri+'.enc')
              .then(r5=>{
                that.setState({start_decrypt:(new Date()).toLocaleTimeString()});
                that.decryptBigFile(fileUri,0,r5.size,decipher);
              })
            })
            .catch(e=>{
              console.warn(e)
            })
          })
          .catch(e=>{
            console.warn(e)
          })
        }
      })
    })
    .catch(e=>{
      console.warn(e)
    })
  }

  componentDidMount(){
    let that = this;
    let fileUri = RNFS.DownloadDirectoryPath + '/il_794xN.5646922195_cf45.jpg';
    let cipher = forge.cipher.createCipher('AES-CBC', key)
    let decipher = forge.cipher.createDecipher('AES-CBC', key)
    cipher.start({iv: iv});
    decipher.start({iv: iv});
    RNFS.stat(fileUri)
    .then(res=>{
      console.log('fileSize : ',res.size)
      if(res.size>limit_big){
        // RNFS.writeFile(fileUri+'.enc', '', 'ascii')
        // .then((success) => {
        //   console.log('FILE SIAP DI APPEND');
        //   that.setState({start_encrypt:(new Date()).toLocaleTimeString()});
        //   that.encryptBigFile(fileUri,0,res.size,cipher,decipher);
        // })
        // .catch((err) => {
        //   console.warn(err.message);
        // });
      }else{
        RNFS.readFile(fileUri,'ascii')
        .then(r1=>{
          console.log(r1.length);
          cipher.update(forge.util.createBuffer(r1));
          cipher.finish();
          RNFS.writeFile(fileUri+'.enc',cipher.output.getBytes(),'ascii')
          .then(r2=>{
            console.log(r2)
            console.log("FILE ENKRIPSI SUDAH OKE")
            RNFS.readFile(fileUri+'.enc','ascii')
            .then(r3=>{
              decipher.update(forge.util.createBuffer(r3));
              decipher.finish();
              RNFS.writeFile(fileUri+'.jpg',decipher.output.getBytes(),'ascii')
              .then(r4=>{
                console.log("FILE DECRYPT SUDAH OKE")
              })
              .catch(e2=>{
                console.warn(e2)
              })
            })
          })
          .catch(e1=>{
            console.warn(e1)
          })
        })
      }
    })
  }

  render(){
    const {start_decrypt,start_encrypt,done_decrypt,done_encrypt,progress_encrypt,progress_decrypt} = this.state;
    return (
      <View style={styles.container}>
        <ProgressBarAndroid
          style={{width:400}}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress_encrypt}
        />
        <Text>START ENCRYPT : {start_encrypt.toString()}</Text>
        <Text>DONE ENCRYPT : {done_encrypt.toString()}</Text>
        <Text>START DECRYPT : {start_decrypt.toString()}</Text>
        <Text>DONE DECRYPT : {done_decrypt.toString()}</Text>
        <ProgressBarAndroid
          style={{width:400}}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress_decrypt}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
