import React, { Component } from 'react';
import { View, Text, ImageBackground, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import styles from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';

import todayImage from '../../../assets/imgs/today.jpg';

import moment from 'moment';
import 'moment/locale/pt-br';

import Task from '../../components/Task/Task';
import AddTask from '../AddTask/AddTask';

export default class TaskList extends Component {
    state = {
        showDoneTasks: true,
        showAddTask: true,
        visibleTasks: [],
        tasks: [{
            id: Math.random(),
            desc: 'Comprar livro',
            estimateAt: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Ler livro',
            estimateAt: new Date(),
            doneAt: null,
        }]
    };

    componentDidMount = () => {
        this.filterTasks();
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    };

    filterTasks = () => {
        let visibleTasks = null;

        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks];
        } else {
            const pending = task => task.doneAt === null;

            visibleTasks = this.state.tasks.filter(pending);
        }

        this.setState({ visibleTasks });
    };

    toggleTask = taskId => {
        const tasks = [...this.state.tasks];
        tasks.forEach(task => {
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date();
            }
        });

        this.setState({ tasks }, this.filterTasks);
    };

    render() {
        const today = moment()
            .locale('pt-br')
            .format('ddd, D [de] MMMM');

        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} />
                <ImageBackground 
                    style={styles.background} 
                    source={todayImage}
                >
                    <SafeAreaView style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon style={styles.icon} name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} />
                        </TouchableOpacity>
                    </SafeAreaView>
                    
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                
                <View style={styles.taskList}> 
                    <FlatList 
                        data={this.state.visibleTasks} 
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />}
                    />
                </View>
            </View>
        );
    };
};