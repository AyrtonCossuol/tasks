import React, { Component } from 'react';
import { 
    View, 
    Modal, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';

const initialState = { 
    desc: '',
    date: new Date(),
    showDatePicker: false,
};

export default class AddTask extends Component {
    state = {
        ...initialState,
    };

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
        };

        this.props.onSave && this.props.onSave(newTask);
        this.setState({ ...initialState });
    };

    getDatePicker = () => {
        let datePicker = <DateTimePicker 
                value={this.state.date}
                onChange={(_, date) => this.setState({ date, showDatePicker: false })}
                mode="date"
            />;

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY');
        
        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            );
        }
        return datePicker;
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
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={this.save}>
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