import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BackgroundContainer from '../../Components/BackgroundContainerComponent/BackgroundContainer';
import {styles} from './Gallery.style';
import albumService from '../../Services/Album.Service';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import FavoriteFlatlist from '../../Components/FavoriteFlatlist';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import AddImageModal from '../../Components/AddImageModal';
import {Enums} from '../../Constants/Enums';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import DisplayImageModal from '../../Components/DisplayImageModal';
import DeleteItemButton from '../../Components/DeleteItemButton';

const Gallery = ({route}) => {
  const user = useSelector(state => state.user);

  const navigation = useNavigation();
  let {albumId} = route.params;
  const flatlistRef = useRef(null);

  const [image, setImage] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [favoriteImages, setFavoriteImages] = useState(null);
  const [isAddImageModalVisible, setIsAddImageModalVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (albumId !== -1) {
        fetchData();
      }
      return () => {
        navigation.setParams({albumId: -1});
      };
    }, [navigation, fetchData, albumId]),
  );

  const reFetchImages = () => {
    fetchData();
  };

  const fetchData = useCallback(async () => {
    setImageLoading(true);
    if (albumId === -1) {
      setImagesData(null);
      setImageLoading(false);
      return;
    }
    try {
      const images = await albumService.fetchImages(user.info.uid, albumId);
      if (images !== Enums.MESSAGE.Errors.NoImageError) {
        const favorites = images.filter(item => item.IsFavorite);
        setFavoriteImages(favorites);
        setImagesData(images);
      } else {
        setFavoriteImages([]);
        setImagesData([]);
      }
    } catch (error) {
      console.error('Image fetch error:', error);
      setImagesData(Enums.MESSAGE.Errors.NoImageError);
    }
    setImageLoading(false);
  }, [albumId, user.info.uid]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const RightAction = (userId, albumUid, imageId) => {
    return (
      <DeleteItemButton
        reFetch={reFetchImages}
        userId={userId}
        albumId={albumUid}
        imageId={imageId}
      />
    );
  };

  const renderItem = ({item}) => {
    return (
      <ReanimatedSwipeable
        containerStyle={styles.FlatlistItemContainer}
        friction={2}
        rightThreshold={40}
        renderRightActions={() =>
          RightAction(user.info.uid, albumId, item.Uid)
        }>
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(item);
          }}
          style={styles.FlatlistItemContainer}>
          <TouchableOpacity
            onPress={async () => {
              await albumService.ImageFavoriteStatusChange(
                user.info.uid,
                albumId,
                item.Uid,
                item.IsFavorite,
              );
              reFetchImages();
            }}
            style={styles.FlatlistItemFavoriteButtonContainer}>
            <FontAwesome6
              style={styles.FlatlistItemFavoriteButton}
              name="heart"
              iconStyle={item.IsFavorite ? 'solid' : 'regular'}
            />
          </TouchableOpacity>
          <Image style={styles.ImageComp} source={{uri: item.ImageURL}} />
          <View style={styles.FlatlistItemNameContainer}>
            <Text style={styles.FlatlistItemNameText}>{item.Name}</Text>
          </View>
        </TouchableOpacity>
      </ReanimatedSwipeable>
    );
  };

  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        {albumId === -1 ? (
          <View style={styles.NoAlbumIdContainer}>
            <Text style={styles.NoAlbumIdText}>Please select an album</Text>
          </View>
        ) : (
          <View style={styles.AlbumContainer}>
            <FavoriteFlatlist
              favoriteImageList={favoriteImages}
              isLoading={imageLoading}
            />
            <View style={styles.ButtonRowContainer}>
              <TouchableOpacity
                style={styles.ImageButton}
                onPress={() => {
                  ImagePicker.openCamera({
                    width: 512,
                    height: 512,
                    cropping: true,
                    compressImageQuality: 0.8,
                  }).then(returnedImage => {
                    setImage(returnedImage);
                    setIsAddImageModalVisible(true);
                  });
                }}>
                <Text style={styles.ImageButtonText}>Open Camera</Text>
                <FontAwesome6
                  style={styles.ImageButtonIcon}
                  name="camera"
                  iconStyle={'solid'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ImageButton}
                onPress={() => {
                  ImagePicker.openPicker({
                    width: 512,
                    height: 512,
                    cropping: true,
                    compressImageQuality: 0.8,
                  }).then(returnedImage => {
                    setImage(returnedImage);
                    setIsAddImageModalVisible(true);
                  });
                }}>
                <Text style={styles.ImageButtonText}>Select Image</Text>
                <FontAwesome6
                  style={styles.ImageButtonIcon}
                  name="file-image"
                  iconStyle={'solid'}
                />
              </TouchableOpacity>
              {selectedImage && (
                <DisplayImageModal
                  isModalVisible={!!selectedImage}
                  setSelectedImage={() => setSelectedImage(null)}
                  imageUrl={selectedImage.ImageURL}
                  title={selectedImage.Name}
                />
              )}
              <AddImageModal
                albumId={albumId}
                userId={user.info.uid}
                image={image}
                isModalVisible={isAddImageModalVisible}
                setModalVisible={() =>
                  setIsAddImageModalVisible(!isAddImageModalVisible)
                }
                reFetch={reFetchImages}
              />
            </View>
            <View style={styles.GlassContainer}>
              {imageLoading ? (
                <ActivityIndicator size="large" color="darkslategrey" />
              ) : (typeof imagesData === 'string' &&
                  imagesData === Enums.MESSAGE.Errors.NoImageError) ||
                !imagesData ||
                imagesData.length === 0 ? (
                <Text style={styles.NoImageText}>
                  {Enums.MESSAGE.Errors.NoImageError}
                </Text>
              ) : (
                <FlatList
                  style={styles.Flatlist}
                  data={imagesData}
                  ref={flatlistRef}
                  numColumns={2}
                  keyExtractor={item => item.Uid}
                  renderItem={renderItem}
                  columnWrapperStyle={styles.FlatlistColumnWrapperStyle}
                  contentContainerStyle={styles.FlatlistContentContainerStyle}
                />
              )}
            </View>
          </View>
        )}
      </View>
    </BackgroundContainer>
  );
};

export default React.memo(Gallery);
