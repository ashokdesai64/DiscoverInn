import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    ViewPropTypes as RNViewPropTypes, ScrollView
} from 'react-native';

class Autocomplete extends Component {

    static defaultProps = {
        data: [],
        keyboardShouldPersistTaps: 'always',
        onStartShouldSetResponderCapture: () => false,
        renderItem: ({ item }) => <Text>{item}</Text>,
        renderSeparator: null,
        renderTextInput: props => <TextInput {...props} style={styles.formControl} placeholderTextColor={'#828894'} />,
        flatListProps: {}
    };

    constructor(props) {
        super(props);
        this.resultList = null;
        this.textInput = null;

        this.onRefListView = this.onRefListView.bind(this);
        this.onRefTextInput = this.onRefTextInput.bind(this);
        this.onEndEditing = this.onEndEditing.bind(this);
    }

    onEndEditing(e) {
        this.props.onEndEditing && this.props.onEndEditing(e);
    }

    onRefListView(resultList) {
        this.resultList = resultList;
    }

    onRefTextInput(textInput) {
        this.textInput = textInput;
    }

    /**
     * Proxy `blur()` to autocomplete's text input.
     */
    blur() {
        const { textInput } = this;
        textInput && textInput.blur();
    }

    /**
     * Proxy `focus()` to autocomplete's text input.
     */
    focus() {
        const { textInput } = this;
        textInput && textInput.focus();
    }

    /**
     * Proxy `isFocused()` to autocomplete's text input.
     */
    isFocused() {
        const { textInput } = this;
        return textInput && textInput.isFocused();
    }

    renderResultList() {
        const {
            data,
            listStyle,
            renderItem,
            keyExtractor,
            renderSeparator,
            keyboardShouldPersistTaps,
            flatListProps,
            onEndReached,
            onEndReachedThreshold
        } = this.props;

        return (
            <FlatList
                ref={this.onRefListView}
                data={data}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                renderSeparator={renderSeparator}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                style={[styles.list, listStyle]}
                {...flatListProps}
            />
        );
    }

    renderTextInput() {
        const { renderTextInput, style } = this.props;
        const props = {
            style: [styles.input, style],
            ref: this.onRefTextInput,
            onEndEditing: this.onEndEditing,
            ...this.props
        };

        return renderTextInput(props);
    }

    render() {
        const {
            data,
            containerStyle,
            hideResults,
            inputContainerStyle,
            listContainerStyle,
            onShowResults,
            onStartShouldSetResponderCapture
        } = this.props;
        const showResults = data.length > 0;

        // Notify listener if the suggestion will be shown.
        onShowResults && onShowResults(showResults);

        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.inputContainer, inputContainerStyle]}>
                    {this.renderTextInput()}
                </View>
                {!hideResults && (
                    <ScrollView
                        keyboardShouldPersistTaps='always'
                        style={[listContainerStyle]}
                        onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
                        scrollEnabled={true}
                    >
                        {showResults && this.renderResultList()}
                    </ScrollView>
                )}
            </View>
        );
    }
}

const border = {
    borderColor: '#b9b9b9',
    borderRadius: 1,
    borderWidth: 1
};

const androidStyles = {
    container: {
        flex: 1,
        // marginTop: 25
    },
    inputContainer: {
        marginBottom: 0
    },
    list: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        marginTop: 0,
        ...border,
        maxHeight: 180
    }
};

const iosStyles = {
    container: {
        zIndex: 1,
        // marginTop: 25
    },
    list: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        // left: 0,
        // position: 'absolute',
        // right: 0,
        ...border,
        maxHeight: 180
    }
};

const styles = StyleSheet.create({
    formControl: {
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 5,
        height: 48,
        paddingLeft: 25,
        paddingRight: 25,
        fontFamily: 'Montserrat-Medium',
        color: '#4F4F4F',
        fontSize: 14,
    },
    ...Platform.select({
        android: { ...androidStyles },
        ios: { ...iosStyles }
    })
});

export default Autocomplete;