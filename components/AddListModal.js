import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';



export default class AddListModal extends React.Component {
    backgroundColors = [
        '#fbc531',
        '#00a8ff',
        '#e84118',
        '#7f8fa6',
        '#44bd32',
        '#9c88ff',
        '#f6e58d'
    ]
    state = {
        name: "",
        color: this.backgroundColors[0]
    }


    createTodo = () => {
        const { name, color } = this.state;

        const list = { name, color };

        this.props.addList(list);


        this.setState({ name: "" });
        this.props.closeModal();
    }

    renderColors() {
        return this.backgroundColors.map(
            color => {
                return (
                    <TouchableOpacity
                        key={color}
                        style={[styles.colorSelect, { backgroundColor: color }]}
                        onPress={() => this.setState({ color })} />
                );
            }
        );

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={styles.close} onPress={this.props.closeModal}>
                    <AntDesign name='close' size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={styles.containerTitle}>
                    <Text style={styles.title}>
                        Criar Tarefas Todo
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome das Listas"
                        onChangeText={text => this.setState({ name: text })} />
                    <View style={[styles.containerColors]}>
                        {this.renderColors()}
                    </View>


                    <TouchableOpacity style={[styles.btnCriar, {
                        backgroundColor: this.state.color
                    }]}
                        onPress={this.createTodo}>
                        <Text style={styles.titleCriar}>
                            Criar
                        </Text>
                    </TouchableOpacity>
                </View>
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
    close: {
        position: 'absolute',
        top: 30,
        right: 30
    },
    containerTitle: {
        alignSelf: 'stretch',
        marginHorizontal: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        color: colors.blue,
        alignSelf: 'center',
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 58,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 20,
        width: '100%'
    },
    btnCriar: {
        width: '100%',
        height: 58,
        backgroundColor: colors.blue,
        color: colors.white,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    titleCriar: {
        color: colors.white,
        fontSize: 30,
        fontWeight: '800'
    },
    colorSelect: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    containerColors: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 10
    }
});