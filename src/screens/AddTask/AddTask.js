import React, { Component } from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

export default class AddTask extends Component {
    render() {
        return(
            <Modal 
                transparent={true} 
                visible={this.props.isVisible} 
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };
};