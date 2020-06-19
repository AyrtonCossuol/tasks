import React from 'react';
import { 
    View, 
    Text, 
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
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

    const getRightContent = () => {
        return(
            <TouchableOpacity 
                style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}
            >
                <Icon name="trash" size={30} color='#fff' />
            </TouchableOpacity>
        );
    };

    const getLeftContent = () => {
        return(
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#fff' style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        );
    };

    return(
        <Swipeable 
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    );
};