import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Share,
  RefreshControl,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import BackgroundContainer from '../../Components/BackgroundContainerComponent/BackgroundContainer';
import FavoriteFlatlist from '../../Components/FavoriteFlatlist';
import AddImageModal from '../../Components/Modals/AddImageModal';
import DisplayImageModal from '../../Components/Modals/DisplayImageModal';
import DeleteItemButton from '../../Components/DeleteItemButton';
import DropdownList from '../../Components/DropdownList';
import TextInputComp from '../../Components/TextInputComp';

import albumService from '../../Services/Album.Service';

import urlSafeEncode from '../../Utils/UrlSafeEncode';
import Encrypt from '../../Utils/Encrypt';

import {createStyles} from './Gallery.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {Enums} from '../../Constants/Enums';
import {Colors} from '../../Constants/Colors';
import {useTranslation} from 'react-i18next';

const Gallery = ({route}) => {
  const {t} = useTranslation();
  const user = useSelector(state => state.user);
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation();

  let {albumId} = route.params;
  let {sharedType} = route.params;
  let {sharedUid} = route.params;

  const flatlistRef = useRef(null);

  const [image, setImage] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [favoriteImages, setFavoriteImages] = useState(null);
  const [isAddImageModalVisible, setIsAddImageModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isRenderItemButtonsVisible, setIsRenderItemButtonsVisible] =
    useState(null);

  const [isSharedAlbum, setIsSharedAlbum] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [sharedId, setSharedId] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [isVisibleError, setIsVisibleError] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    if (albumId === -1 && isSharedAlbum) {
      let images = await albumService.fetchImagesInAlbum(sharedId);
      if (images[0]?.Uid) {
        setFavoriteImages(images.filter(item => item.IsFavorite));
        setImagesData(images);
        setIsSharedAlbum(true);
        setIsVisibleError(false);
      } else {
        setIsVisibleError(true);
        setErrorMsg(images);
      }
    }

    if (albumId !== -1) {
      await fetchData();
    }

    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (albumId !== -1) {
        fetchData();
      }

      return () => {
        navigation.setParams({albumId: -1});
        setIsSharedAlbum(false);
        setSharedId('');
        setDropdownValue(null);
        setErrorMsg(null);
        setIsVisibleError(false);
      };
    }, [navigation, fetchData, albumId]),
  );

  useEffect(() => {
    if (sharedType && sharedUid) {
      const typeList = t('GalleryTypeList', {returnObjects: true}).map(
        item => Object.values(item)[0],
      );
      sharedType === Enums.OpenImageList.Album
        ? setDropdownValue(typeList[0])
        : setDropdownValue(typeList[1]);
      setSharedId(sharedUid);
    }
  }, [sharedType, sharedUid, albumId, t]);

  const reFetchImages = () => {
    fetchData();
  };

  const fetchData = useCallback(async () => {
    if (albumId === -1) {
      setImagesData(null);
      setImageLoading(false);
      return;
    }

    setImageLoading(true);
    try {
      const images = await albumService.fetchImages(user.info.uid, albumId, t);
      if (images[0]?.Uid) {
        const favorites = images.filter(item => item.IsFavorite);
        setFavoriteImages(favorites);
        setImagesData(images);
      } else {
        setFavoriteImages([]);
        setImagesData(t('album.albumErrors.NoImageError'));
      }
    } catch (error) {
      console.error(error);
      setImagesData([]);
    }
    setImageLoading(false);
  }, [albumId, user.info.uid, t]);

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

    const deepLink = `https://questionbankwebhost.web.app/${Enums.OpenImageList.Image}/${encryptedHex}`;

    try {
      await Share.share({
        title: 'QuestionBank',
        message: deepLink,
        url: deepLink,
      });
    } catch (error) {
      console.error(error);
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
                    t,
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
          {item?.Name ? (
            <View style={styles.FlatlistItemNameContainer}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.FlatlistItemNameText}>
                {item.Name}
              </Text>
            </View>
          ) : null}
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
        {item?.Name ? (
          <View style={styles.FlatlistItemNameContainer}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.FlatlistItemNameText}>
              {item.Name}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const fetchImageSwitch = async typeList => {
    switch (dropdownValue) {
      case typeList[0]:
        let images = await albumService.fetchImagesInAlbum(sharedId, t);
        if (images[0]?.Uid) {
          setFavoriteImages(images.filter(item => item.IsFavorite));
          setImagesData(images);
          setIsSharedAlbum(true);
          setIsVisibleError(false);
        } else {
          setIsVisibleError(true);
          setErrorMsg(images);
        }
        break;
      case typeList[1]:
        const aloneImage = await albumService.fetchImage(sharedId, t);
        if (aloneImage[0]?.Uid) {
          setSelectedImage(aloneImage);
          setIsVisibleError(false);
        } else {
          setIsVisibleError(true);
          setErrorMsg(aloneImage);
        }
        break;
      default:
        break;
    }
  };

  const renderDropDownSection = () => {
    const typeList = t('GalleryTypeList', {returnObjects: true}).map(
      item => Object.values(item)[0],
    );

    return (
      <View style={styles.NoAlbumIdContainer}>
        <View style={styles.DropdownlistContainer}>
          <DropdownList
            setValue={setDropdownValue}
            value={dropdownValue}
            list={typeList}
          />
        </View>
        {dropdownValue && (
          <View style={styles.SharedIdContainer}>
            <TextInputComp
              onChangeValue={setSharedId}
              value={sharedId}
              placeholder={`${dropdownValue} ID`}
              theme={theme}
              multiline={true}
            />
          </View>
        )}
        <View style={styles.NoAlbumButtonContainer}>
          <TouchableOpacity
            disabled={dropdownValue === null || sharedId === ''}
            style={
              dropdownValue === null || sharedId === ''
                ? styles.NoAlbumButtonDisabled
                : styles.NoAlbumButton
            }
            onPress={() => {
              fetchImageSwitch(typeList);
            }}>
            <Text style={styles.NoAlbumButtonText}>
              {!dropdownValue
                ? t('dropdownlist.SelectOne')
                : t('dropdownlist.ClickToGet', {
                    value: dropdownValue,
                  })}
            </Text>
          </TouchableOpacity>
        </View>
        {isVisibleError && (
          <View style={styles.NoAlbumButtonErrorContainer}>
            <Text adjustsFontSizeToFit style={styles.NoAlbumButtonErrorText}>
              {errorMsg}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        {albumId === -1 && !isSharedAlbum ? (
          renderDropDownSection()
        ) : (
          <View style={styles.AlbumContainer}>
            <FavoriteFlatlist
              favoriteImageList={favoriteImages}
              isLoading={imageLoading}
            />
            {isSharedAlbum && selectedImage && (
              <DisplayImageModal
                isModalVisible={!!selectedImage}
                setSelectedImage={setSelectedImage}
                imageUrl={selectedImage.ImageURL}
                title={selectedImage.Name}
              />
            )}
            {!isSharedAlbum && (
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
                  <Text adjustsFontSizeToFit style={styles.ImageButtonText}>
                    {`${t('gallery.TakePhoto').replace(' ', '\n')}`}
                  </Text>
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
                  <Text adjustsFontSizeToFit style={styles.ImageButtonText}>
                    {`${t('gallery.SelectImage').replace(' ', '\n')}`}
                  </Text>
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
                <ActivityIndicator
                  size="large"
                  color={
                    theme === Enums.Themes.DarkTheme
                      ? Colors.DarkTheme.Text
                      : Colors.LightTheme.Text
                  }
                />
              ) : !imagesData ||
                !imagesData[0]?.Uid ||
                imagesData === t('album.albumErrors.NoImageError') ? (
                <Text adjustsFontSizeToFit style={styles.NoImageText}>
                  {imagesData}
                </Text>
              ) : (
                <FlatList
                  style={styles.Flatlist}
                  data={imagesData}
                  ref={flatlistRef}
                  numColumns={2}
                  keyExtractor={item => item.Uid}
                  renderItem={isSharedAlbum ? renderAlbum : renderItem}
                  columnWrapperStyle={styles.FlatlistColumnWrapperStyle}
                  contentContainerStyle={styles.FlatlistContentContainerStyle}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                    />
                  }
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
