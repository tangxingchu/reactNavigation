import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,StatusBar, AppState
} from 'react-native';
import Fingerprint from 'react-native-fingerprint-android';
import { ToastAndroid as Toast } from 'react-native';

export default class FingerprintScreen extends React.Component {
	
	static PHASE_NORMAL = 'rgba(62, 130, 247, 1)';
    static PHASE_WARN = 'rgba(255, 241, 118, 1)';
    static PHASE_FAIL = 'rgba(239, 83, 80, 1)';
    static PHASE_SUCCESS = 'rgba(38, 166, 154, 1)';

    componentDidMount() {
        this.authenticate();

        AppState.addEventListener("change", async(state) => {
            try {
                if(state === "active" && await Fingerprint.isAuthenticationCanceled()) {
                    this.authenticate()
                }
            }
            catch(z) {
                console.error(z)
            }
        })
    }

    state = {
        phase: 'normal',
        message: '',
        cancelled: false
    }
    
    async componentWillUnmount() {
        try {
            if(!Fingerprint.isAuthenticationCanceled()) {
                //stop listening to authentication.
                await Fingerprint.cancelAuthentication();
            }
        } catch(z) {
            console.error(z);
        }
    }
    
    async authenticate() {
        this.setState({
            phase: 'normal', 
            message: ''
        })
        
        try {
            // do sanity checks before starting authentication flow.
            // HIGHLY recommended in real life usage. see more on why you should do this in the readme.md
            const hardware = await Fingerprint.isHardwareDetected();
            const permission = await Fingerprint.hasPermission();
            const enrolled = await Fingerprint.hasEnrolledFingerprints();

            if (!hardware || !permission || !enrolled) {
                let message = !enrolled ? 'No fingerprints registered.' : !hardware ? 'This device doesn\'t support fingerprint scanning.' : 'App has no permission.'
                this.setState({
                    phase: 'fail',
                    message
                });
                return;
            }
            
            await Fingerprint.authenticate(warning => {
                this.setState({
                    phase: 'warn',
                    message: warning.message
                })
            });

            // if we got this far, it means the authentication succeeded.
            this.setState({
                phase: 'success',
                message: ''
            });

            // in real life, we'd probably do something here (process the payment, unlock the vault, whatever)
            // but this is a demo. so restart authentication.
            setTimeout(() => this.authenticate(), 3000);
            
        } catch (error) {
            if(error.code == Fingerprint.FINGERPRINT_ERROR_CANCELED) {
                // we don't show this error to the user.
                // we will check if the auth was cancelled & restart the flow when the appstate becomes active again.
                return;
            }
            this.setState({
                phase: 'fail',
                message: error.message
            })
        }
    }
    
    getPhaseColor(): string {
        return FingerprintScreen['PHASE_'+this.state.phase.toUpperCase()];
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View duration={1000} transition="backgroundColor"
                      style={[styles.container, {backgroundColor: this.getPhaseColor()}]}>
                    <View style={styles.icon}>
                        
                    </View>

                    <Text style={styles.welcome}>
                        {this.state.phase === 'normal' && 'Touch the fingerprint sensor.'}
                        {this.state.phase === 'warn' && 'Try again.'}
                        {this.state.phase === 'fail' && 'Authentication failed.'}
                        {this.state.phase === 'success' && 'Authentication succeeded.'}
                    </Text>
                    <Text>
                        {this.state.message}
                    </Text>
                </View>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent={true}/>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontFamily: 'Roboto',
        color: 'black',
        fontSize: 26,
        textAlign: 'center',
        margin: 10,
        marginTop: 20,
    },
    icon: {
        borderRadius: 100,
        padding: 20,
        backgroundColor: "#fff",
        elevation: 5,
    }
});