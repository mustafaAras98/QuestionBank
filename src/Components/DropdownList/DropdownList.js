import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {styles} from './DropdownList.style';

const DropdownList = ({setValue, value, list}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleItemPress = item => {
    setValue(item);
    toggleDropdown();
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.Item} onPress={() => handleItemPress(item)}>
      <Text adjustsFontSizeToFit style={styles.ItemText}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.SelectBox}>
        <Text adjustsFontSizeToFit style={styles.SelectText}>
          {value ? value : 'Lütfen Seçiniz'}
        </Text>
        <FontAwesome6
          adjustsFontSizeToFit
          style={styles.Icon}
          name="angle-down"
          iconStyle={'solid'}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.Dropdown}>
          <FlatList
            data={list}
            keyExtractor={index => index.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(DropdownList);
