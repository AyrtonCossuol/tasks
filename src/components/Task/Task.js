import React from 'react';
import { View, Text, TouchableWithoutFeedback  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

import moment from 'moment';
import 'moment/locale/pt-br';

function getCheckView(doneAt) {
    if(doneAt !== null){
        return(
            <View style={styles.done}>
                <Icon name="check" size={20} color='#fff' />
            </View>
        );
    } else {
        return(
            <View style={styles.pending}>
                
            </View>
        );
    }
}

export default props => {
    const doneOrNotStyle = props.doneAt !== null 
            ? { textDecorationLine: 'line-through' }
            : {};

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date)
        .locale('pt-br')
        .format('ddd, D [de] MMMM');

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
        </View>
    );
};