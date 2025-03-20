import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {createStyles} from './FavoriteFlatlist.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import DisplayImageModal from '../Modals/DisplayImageModal';
import {useSelector} from 'react-redux';
import {Colors} from '../../Constants/Colors';
import {Enums} from '../../Constants/Enums';
import {useTranslation} from 'react-i18next';

const FavoriteFlatlist = ({favoriteImageList, isLoading}) => {
  const {t} = useTranslation();
  const favoriteFlatlistRef = useRef(null);
  const [containerSize, setContainerSize] = useState({width: 0, height: 0});
  const [selectedImage, setSelectedImage] = useState(null);

  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const renderFavoriteImages = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => setSelectedImage(item)}
          onLayout={event => {
            const {width, height} = event.nativeEvent.layout;
            setContainerSize({width, height});
          }}
          style={styles.FavoriteImageContainer}>
          <Image
            style={[
              styles.ImageComp,
              {
                width: containerSize.width,
                height: containerSize.height,
              },
            ]}
            source={{uri: item.ImageURL}}
          />
          <View style={styles.FlatlistItemTextBackground}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.FlatlistItemText}>
              {item.Name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [containerSize, styles],
  );

  return (
    <View style={styles.Container}>
      <View style={styles.FavoriteContainer}>
        <View style={styles.FavoriteHeader}>
          <Text adjustsFontSizeToFit style={styles.HeaderText}>
            {t('gallery.FavoriteImage')}
          </Text>
          <FontAwesome6
            adjustsFontSizeToFit
            style={styles.HeaderIcon}
            iconStyle="regular"
            name="heart"
          />
        </View>
        {isLoading ? (
          <ActivityIndicator
            style={styles.FlatlistContainer}
            size="large"
            color={
              theme === Enums.Themes.DarkTheme
                ? Colors.DarkTheme.Text
                : Colors.LightTheme.Text
            }
          />
        ) : !favoriteImageList || favoriteImageList.length === 0 ? (
          <View style={styles.NoFavoriteContainer}>
            <Text adjustsFontSizeToFit style={styles.NoFavoriteText}>
              {t('gallery.NoFavoriteImages')}
            </Text>
          </View>
        ) : (
          <View style={styles.FlatlistContainer}>
            <FlatList
              ref={favoriteFlatlistRef}
              style={styles.Flatlist}
              data={favoriteImageList}
              keyExtractor={item => item.Uid}
              renderItem={renderFavoriteImages}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.FlatlistContentContainer}
            />
          </View>
        )}
        {selectedImage && (
          <DisplayImageModal
            isModalVisible={!!selectedImage}
            setSelectedImage={setSelectedImage}
            imageUrl={selectedImage.ImageURL}
            title={selectedImage.Name}
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(FavoriteFlatlist, (prevProps, nextProps) => {
  return (
    prevProps.favoriteImageList === nextProps.favoriteImageList &&
    prevProps.isLoading === nextProps.isLoading
  );
});
