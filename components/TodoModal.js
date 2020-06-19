import React from 'react';
import {
    Keyboard,
    TextInput,
    KeyboardAvoidingView,
    View,
    FlatList,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Animated
} from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import colors from '../Colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';



export default class TodoModal extends React.Component {
    state = {
        newTodo: ""
    };

    toggleTodoCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    };



    addTodo = () => {
        let list = this.props.list;

        if(!list.todos.some( todo => todo.title === this.state.newTodo)){
            list.todos.push({ title: this.state.newTodo, completed: false });

            this.props.updateList(list);
        }
        

        
        this.setState({ newTodo: "" });
        Keyboard.dismiss();
    };

    deleteTodo = index => {
        let list = this.props.list;

        list.todos.splice(index,1);

        this.props.updateList(list);
    }


    renderTodo = (todo, index) => {
        return (
            <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                        <Ionicons
                            name={todo.completed ? "ios-square" : "ios-square-outline"}
                            size={24}
                            color={colors.gray}
                            style={{ width: 32 }}
                        />

                    </TouchableOpacity>
                    <Text
                        style={[styles.titleTasks,
                        {
                            textDecorationLine: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? colors.blue : colors.red
                        }]}>{todo.title}</Text>


                </View>
                <TouchableOpacity onPress={() => this.deleteTodo(index)}>
                        <FontAwesome
                            name="trash"
                            size={24}
                            color={colors.gray}
                            style={{ width: 32 }}
                        />

                    </TouchableOpacity>
            </Swipeable>
        );
    };

    rightActions = (dragX, index) => {
        return (
            <TouchableOpacity>
                <Animated.View>
                    <Animated.Text>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }

    render() {
        const list = this.props.list;

        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">


                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={styles.closeModal}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign name="close" size={24} color={colors.white} />
                    </TouchableOpacity>
                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} de {taskCount} tarefas
                        </Text>
                        </View>
                    </View>


                    <View style={[styles.section, { flex: 3 }]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({ item, index }) => this.renderTodo(item, index)}
                            keyExtractor={ item  => item.title }
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }} />
                    </View>


                    <View
                        style={[styles.section, styles.footer]}
                        behavior="padding"
                    >
                        <TextInput
                            placeholder="Digite a Tarefa"
                            onChangeText={text => this.setState({ newTodo: text })}
                            value={this.state.newTodo}
                            style={[styles.input, { borderColor: list.color }]} />
                        <TouchableOpacity
                            style={[styles.addTodo, { backgroundColor: list.color }]}
                            onPress={() => this.addTodo()}
                        >
                            <AntDesign name="plus" size={18} color={colors.white} />
                        </TouchableOpacity>
                    </View>




                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeModal: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: colors.blue,
        borderRadius: 20,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    section: {
        flex: 1,
        alignSelf: 'stretch'
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: '600'
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleTasks: {
        fontWeight: '600',
        fontSize: 22,
        color: colors.blue
    }

});