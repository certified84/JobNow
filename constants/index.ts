// const version = 'v1';
// const host = 'https://schoolduo-backend-vuofq.ondigitalocean.app/api';

// export const BASEURL = `${host}/${version}`;

export function formatMoney(num = 0) {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '0';
  }
}

export const is_email = (emailAdress: string) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regex)) {
    return true;
  } else {
    return false;
  }
};

export const customFontLocation = {
  outfit_black: require('../assets/fonts/outfit_black.ttf'),
  outfit_bold: require('../assets/fonts/outfit_bold.ttf'),
  outfit_extra_bold: require('../assets/fonts/outfit_extra_bold.ttf'),
  outfit_extra_light: require('../assets/fonts/outfit_extra_light.ttf'),
  outfit_light: require('../assets/fonts/outfit_light.ttf'),
  outfit_medium: require('../assets/fonts/outfit_medium.ttf'),
  outfit_regular: require('../assets/fonts/outfit_regular.ttf'),
  outfit_semi_bold: require('../assets/fonts/outfit_semi_bold.ttf'),
  outfit_thin: require('../assets/fonts/outfit_thin.ttf'),
};
