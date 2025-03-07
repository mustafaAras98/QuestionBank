import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

export const createStyles = theme => {
  const isDarkTheme = theme === 'DarkTheme';

  return StyleSheet.create({
    Container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    GlassContainer: {
      flex: 1,
      padding: 10,
      maxHeight: Dimensions.get('window').height * 0.5,
      width: Dimensions.get('window').width * 0.9,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor + '70'
        : Colors.LightTheme.BackgroundColor + '70',
      verticalAlign: 'middle',
      marginBottom: Dimensions.get('window').height * 0.11,
    },
    AlbumContainer: {
      flex: 1,
      paddingTop: '5%',
      justifyContent: 'space-between',
      alignContent: 'center',
      gap: '5%',
    },
    ButtonRowContainer: {
      height: Dimensions.get('window').height * 0.1,
      width: Dimensions.get('window').width * 0.9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
    },
    Flatlist: {
      width: '100%',
      alignContent: 'center',
    },
    FlatlistColumnWrapperStyle: {
      justifyContent: 'space-between',
    },
    FlatlistContentContainerStyle: {
      gap: 20,
    },
    FlatlistItemContainer: {
      overflow: 'hidden',
      position: 'relative',
    },
    FlatlistItemNameContainer: {
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor + '70'
        : Colors.LightTheme.BackgroundColor + '70',
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
      bottom: 0,
      position: 'absolute',
      width: '100%',
      height: '20%',
    },
    FlatlistItemNameText: {
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 20,
      textAlignVertical: 'center',
    },
    FlatlistItemButtonContainer: {
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      right: 5,
      top: 5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      minWidth: '70%',
      minHeight: '25%',
      maxWidth: '70%',
      maxHeight: '25%',
      gap: '25%',
      zIndex: 1,
    },
    FlatlistItemButton: {
      flex: 1,
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor
        : Colors.LightTheme.BackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
      maxWidth: '35%',
      minWidth: '35%',
      borderRadius: '50%',
      zIndex: 1,
    },
    FlatlistItemFavoriteButton: {
      fontSize: 24,
      color: Colors.Message.Error,
    },
    FlatlistItemShareButton: {
      fontSize: 24,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    ImageComp: {
      width: Dimensions.get('window').width * 0.9 * 0.46,
      height: Dimensions.get('window').width * 0.9 * 0.46,
    },
    ImageButton: {
      flexDirection: 'row',
      width: '47%',
      height: '100%',
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.Primary
        : Colors.LightTheme.Primary,
      zIndex: 1,
    },
    ImageButtonText: {
      flex: 3,
      height: '100%',
      width: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      fontWeight: '700',
      fontSize: 18,
      marginLeft: '10%',
    },
    ImageButtonIcon: {
      flex: 1,
      height: '100%',
      width: '100%',
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 24,
      marginRight: '10%',
    },
    NoImageText: {
      fontSize: 18,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
      fontWeight: '700',
    },
    NoAlbumIdContainer: {
      flex: 1,
      padding: 10,
      maxHeight: Dimensions.get('window').height * 0.5,
      width: Dimensions.get('window').width * 0.9,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.BackgroundColor + '70'
        : Colors.LightTheme.BackgroundColor + '70',
      gap: '5%',
    },
    NoAlbumIdText: {
      flex: 3,
      padding: 20,
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 24,
      color: isDarkTheme ? Colors.DarkTheme.Text : Colors.LightTheme.Text,
    },
    NoAlbumButton: {
      width: '100%',
      maxHeight: 100,
      minHeight: 60,
      borderRadius: 12,
      justifyContent: 'center',
      verticalAlign: 'middle',
      alignSelf: 'center',
      backgroundColor: isDarkTheme
        ? Colors.DarkTheme.Secondary
        : Colors.LightTheme.Secondary,
      elevation: 2,
    },
    NoAlbumButtonDisabled: {
      width: '100%',
      maxHeight: 100,
      minHeight: 60,
      borderRadius: 16,
      justifyContent: 'center',
      verticalAlign: 'middle',
      alignSelf: 'center',
      backgroundColor: Colors.Common.Disabled,
      elevation: 2,
    },
    NoAlbumButtonText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      color: Colors.Common.White,
      fontWeight: '700',
      fontSize: 18,
    },
    NoAlbumButtonErrorContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: Colors.Message.Error,
      justifyContent: 'center',
      padding: 15,
      borderRadius: 10,
    },
    NoAlbumButtonErrorText: {
      textAlignVertical: 'center',
      color: Colors.Common.White,
      fontSize: 16,
      fontWeight: '700',
    },
    DropdownlistContainer: {
      flex: 1,
      alignContent: 'center',
      width: '100%',
      height: '100%',
      zIndex: 1,
      top: '3%',
      marginBottom: '3%',
    },
    SharedIdContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignContent: 'center',
    },
    NoAlbumButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
      height: '100%',
    },
  });
};
