import React from 'react';
import { Appbar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // import your type

type BackProp = { [key: string]: any } | undefined; // accept any object or undefined

type AppBarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  back?: BackProp;
  title: string;
};

const AppBar: React.FC<AppBarProps> = ({ navigation, back, title }) => {
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : (
        <Appbar.Action icon="arrow-right" onPress={() => navigation.navigate('Second')} />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default AppBar;
