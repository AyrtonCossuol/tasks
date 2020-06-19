import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

const initialState = { 
    desc: '' ,
};

export default class AddTask extends Component {
    state = {
        ...initialState,
    };

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
                
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Informa a Descrição..."
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc}
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };
};