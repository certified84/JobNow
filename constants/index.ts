// const version = 'v1';
// const host = 'https://schoolduo-backend-vuofq.ondigitalocean.app/api';

// export const BASEURL = `${host}/${version}`;

export function formatMoney(num = 0) {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
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
  outfit_black: require("../assets/fonts/outfit_black.ttf"),
  outfit_bold: require("../assets/fonts/outfit_bold.ttf"),
  outfit_extra_bold: require("../assets/fonts/outfit_extra_bold.ttf"),
  outfit_extra_light: require("../assets/fonts/outfit_extra_light.ttf"),
  outfit_light: require("../assets/fonts/outfit_light.ttf"),
  outfit_medium: require("../assets/fonts/outfit_medium.ttf"),
  outfit_regular: require("../assets/fonts/outfit_regular.ttf"),
  outfit_semi_bold: require("../assets/fonts/outfit_semi_bold.ttf"),
  outfit_thin: require("../assets/fonts/outfit_thin.ttf"),
};

export const JobStatus = {
  pending: {
    text: "Application Pending",
    color: "#FF802B",
    background: "#FFF0E6",
    update:
      "Your application is currently being reviewed, please wait for the status to change.",
  },
  sent: {
    text: "Application Sent",
    color: "#1472FF",
    background: "#F3F8FF",
    update:
      "Your application is yet to be reviewed, please hold and wait till it gets reviewed by the employer.",
  },
  rejected: {
    text: "Application Rejected",
    color: "#F92020",
    background: "#FFF3F3",
    update:
      "We regret to announce to you that your application has been rejected, we wish you the best in your journey.",
  },
  accepted: {
    text: "Application Accepted",
    color: "#05A308",
    background: "#F8FEF8",
    update:
      "Congratulations, your application has been accepted, please sit tight and wait for a message with information about the interview.",
  },
};
