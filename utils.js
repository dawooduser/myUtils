https://withfra.me/react-native-tutorials/face-id-authentication-in-react-native

const getDevicePublicKey = async () => {
    const { available } = await rnBiometrics.isSensorAvailable();

    if (available) {
      const { keysExist } = await rnBiometrics.biometricKeysExist();
      if (keysExist) {
        await rnBiometrics.deleteKeys();
      }
      const { publicKey } = await rnBiometrics.createKeys();
      console.log("getDevicePublicKey => data => ", { publicKey });
      setPublicKey(publicKey)
    }
  }
const login = async () => {
    const timestamp = Math.round(new Date().getTime() / 1000,).toString();
    const payload = `${'77445511231321321213'}__${timestamp}`;
    try {

      const { success, signature } = await rnBiometrics.createSignature({ promptMessage: 'Sign in', payload, })
      console.log("login => ", { success, signature })
      if (!success) return console.warn('skip by user')

      console.log('------------------------------------------------------------')
      console.log('login => isVerified => ', {signature, payload})
      console.log('------------------------------------------------------------')
      

    } catch (err) {
      console.log('login => error => ', JSON.stringify(err))
    }
  }
