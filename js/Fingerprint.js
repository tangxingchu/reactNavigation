import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  Image,
  StyleSheet,StatusBar, AppState, Vibration,
} from 'react-native';
import Fingerprint from 'react-native-fingerprint-android';

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
		var modalBackgroundStyle = {
		  backgroundColor: 'rgba(0, 0, 0, 0.5)',
		};
		var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};
		var activeButtonStyle = {backgroundColor: '#ddd'};
        return (
            (
            <View 
                style={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        backgroundColor: '#292a38',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <View
                    >
                        <Text
                            style={{textAlign: 'center', fontSize: 16, color: 'rgba(255, 255, 255, 1)', marginTop: 100}}
                        >
                            欢迎回来
                        </Text>
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            <Image 
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginTop: 20
                                }}
                                source={{uri: 'touch'}}
                            >
                            </Image>
                        </View>
                    </View>
                </View>
				<Modal visible={true} transparent={true} onRequestClose={() => {}} >
					<View style={[styles.container, modalBackgroundStyle]}>
						<View style={[styles.innerContainer, innerContainerTransparentStyle]}>
						    <Text>触摸指纹校验.</Text>
							<View></View>
						</View>
					</View>
				</Modal>
            </View>
        )
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	innerContainer: {
		borderRadius: 10,
		alignItems: 'center',
	},
	modalButton: {
		marginTop: 10,
	},
});