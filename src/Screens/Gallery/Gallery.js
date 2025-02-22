import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Share,
  Alert,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
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
import DropdownList from '../../Components/DropdownList';
import TextInputComp from '../../Components/TextInputComp';
import Encrypt from '../../Utils/Encrypt';
import urlSafeEncode from '../../Utils/UrlSafeEncode';

const Gallery = ({route}) => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  let {albumId} = route.params;
  let {sharedType} = route.params;
  let {sharedUid} = route.params;

  const flatlistRef = useRef(null);

  const [image, setImage] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [favoriteImages, setFavoriteImages] = useState(null);
  const [isAddImageModalVisible, setIsAddImageModalVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [sharedId, setSharedId] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isRenderItemButtonsVisible, setIsRenderItemButtonsVisible] =
    useState(null);

  useFocusEffect(
    useCallback(() => {
      if (albumId !== -1) {
        fetchData();
      }

      return () => {
        navigation.setParams({albumId: -1});
        setShowAlbum(false);
      };
    }, [navigation, fetchData, albumId]),
  );

  useEffect(() => {
    if (!sharedType) {
      return;
    }
    if (!sharedUid) {
      return;
    }
    let decodedId = urlSafeEncode.decodeUrlSafeBase64(sharedUid);
    setDropdownValue(sharedType);
    setSharedId(decodedId);
  }, [sharedType, sharedUid, albumId]);

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

  const onShare = async item => {
    const imageIdEncrpyted = await Encrypt(item.Uid);
    const encryptedHex = urlSafeEncode.encodeUrlSafeBase64(imageIdEncrpyted);

    const deepLink = `questionbank://Gallery/${encryptedHex}/${Enums.OpenImageList.Image}`;

    try {
      await Share.share({
        title: 'QuestionBank',
        message: deepLink,
        url: deepLink,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
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
          onLongPress={() => {
            setIsRenderItemButtonsVisible(item);
          }}
          style={styles.FlatlistItemContainer}>
          {isRenderItemButtonsVisible === item && (
            <View style={styles.FlatlistItemButtonContainer}>
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
                style={styles.FlatlistItemButton}>
                <FontAwesome6
                  style={styles.FlatlistItemFavoriteButton}
                  name="heart"
                  iconStyle={item.IsFavorite ? 'solid' : 'regular'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  onShare(item);
                }}
                style={styles.FlatlistItemButton}>
                <FontAwesome6
                  style={styles.FlatlistItemShareButton}
                  name="share"
                  iconStyle={'solid'}
                />
              </TouchableOpacity>
            </View>
          )}
          <Image style={styles.ImageComp} source={{uri: item.ImageURL}} />
          <View style={styles.FlatlistItemNameContainer}>
            <Text style={styles.FlatlistItemNameText}>{item.Name}</Text>
          </View>
        </TouchableOpacity>
      </ReanimatedSwipeable>
    );
  };

  const renderAlbum = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(item);
        }}
        style={styles.FlatlistItemContainer}>
        <Image style={styles.ImageComp} source={{uri: item.ImageURL}} />
        <View style={styles.FlatlistItemNameContainer}>
          <Text style={styles.FlatlistItemNameText}>{item.Name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchImageSwitch = async () => {
    switch (dropdownValue) {
      case Enums.OpenImageList.Album:
        let images = await albumService.fetchImagesInAlbum(sharedId);
        if (typeof images === 'object') {
          setFavoriteImages(images.filter(item => item.IsFavorite));
          setImagesData(images);
          setShowAlbum(true);
          setIsVisibleError(false);
        } else {
          setIsVisibleError(true);
          setErrorMsg(images);
        }
        break;
      case Enums.OpenImageList.Image:
        const aloneImage = await albumService.fetchImage(sharedId);
        if (typeof aloneImage === 'object') {
          setSelectedImage(aloneImage);
          setIsVisibleError(false);
        } else {
          setIsVisibleError(true);
          setErrorMsg(aloneImage);
        }
        break;
      default:
        console.log(dropdownValue);
        break;
    }
  };

  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        {albumId === -1 && !showAlbum ? (
          <View style={styles.NoAlbumIdContainer}>
            <View style={styles.NoAlbumIdContent}>
              <DropdownList
                setValue={setDropdownValue}
                value={dropdownValue}
                list={Enums.Lists.OpenImageList}
              />
              {dropdownValue && (
                <TextInputComp
                  label={dropdownValue}
                  onChangeValue={setSharedId}
                  value={sharedId}
                  placeholder={`${dropdownValue} ID`}
                  theme={Enums.TEXTINPUT_TYPES.Primary}
                />
              )}
              <TouchableOpacity
                disabled={dropdownValue === null || sharedId === ''}
                style={
                  dropdownValue === null || sharedId === ''
                    ? styles.NoAlbumButtonDisabled
                    : styles.NoAlbumButton
                }
                onPress={async () => {
                  fetchImageSwitch();
                }}>
                <Text style={styles.NoAlbumButtonText}>
                  {!dropdownValue
                    ? 'Select from list'
                    : `Click to get ${dropdownValue}`}
                </Text>
              </TouchableOpacity>
              {isVisibleError && (
                <View style={styles.NoAlbumButtonErrorContainer}>
                  <Text style={styles.NoAlbumButtonErrorText}>{errorMsg}</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.AlbumContainer}>
            <FavoriteFlatlist
              favoriteImageList={favoriteImages}
              isLoading={imageLoading}
            />
            {showAlbum && selectedImage && (
              <DisplayImageModal
                isModalVisible={!!selectedImage}
                setSelectedImage={setSelectedImage}
                imageUrl={selectedImage.ImageURL}
                title={selectedImage.Name}
              />
            )}
            {!showAlbum && (
              <View style={styles.ButtonRowContainer}>
                <TouchableOpacity
                  style={styles.ImageButton}
                  onPress={() => {
                    ImagePicker.openCamera({
                      width: 512,
                      height: 512,
                      cropping: true,
                      freeStyleCropEnabled: true,
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
                      freeStyleCropEnabled: true,
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
                {selectedImage && (
                  <DisplayImageModal
                    isModalVisible={!!selectedImage}
                    setSelectedImage={setSelectedImage}
                    imageUrl={selectedImage.ImageURL}
                    title={selectedImage.Name}
                  />
                )}
              </View>
            )}
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
                  renderItem={showAlbum ? renderAlbum : renderItem}
                  columnWrapperStyle={styles.FlatlistColumnWrapperStyle}
                  contentContainerStyle={styles.FlatlistContentContainerStyle}
                />
              )}
            </View>
          </View>
        )}
      </View>
      {selectedImage && albumId === -1 && (
        <DisplayImageModal
          isModalVisible={!!selectedImage}
          setSelectedImage={setSelectedImage}
          imageUrl={selectedImage.ImageURL}
          title={selectedImage.Name}
        />
      )}
    </BackgroundContainer>
  );
};

export default React.memo(Gallery);
