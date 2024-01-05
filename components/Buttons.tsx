import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SIZES, TYPOGRAPHY, COLORS, SHADOWS } from "../theme";
import { AppleIcon, GoogleIcon } from "../assets/svg/SvgIcons";

interface ButtonProps {
  text?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTitle?: string;
  style?: {};
  disabled?: boolean;
  onPress?: () => void;
}

export const AuthButton: React.FC<ButtonProps> = ({
  text,
  textColor,
  buttonColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.authButtonContainer}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={{ ...TYPOGRAPHY.h2, fontSize: SIZES.md }}>{text}</Text>
    </TouchableOpacity>
  );
};

export const DefaultButton: React.FC<ButtonProps> = ({
  onPress,
  buttonTitle,
}) => {
  return (
    <TouchableOpacity
      style={styles.defaultBtn}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={styles.defaultBtnText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export const ActionButton: React.FC<ButtonProps> = ({
  style,
  onPress,
  buttonTitle,
  buttonColor,
  textColor,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ ...styles.actionBtn, ...style, backgroundColor: buttonColor }}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={{ ...styles.defaultBtnText, color: textColor }}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export const GoogleButton: React.FC<ButtonProps> = ({
  style,
  onPress,
  buttonTitle,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...SHADOWS.light,
        ...styles.actionBtn,
        ...style,
        backgroundColor: Colors.white,
      }}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.googleBtnInnerContainer}>
        <GoogleIcon />
        <View style={{ marginHorizontal: SIZES.xs }} />
        <Text
          style={{
            ...TYPOGRAPHY.h4,
            textDecorationLine: "none",
          }}
        >
          {buttonTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const AppleButton: React.FC<ButtonProps> = ({
  style,
  onPress,
  buttonTitle,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...SHADOWS.light,
        ...styles.actionBtn,
        ...style,
        backgroundColor: COLORS.white,
      }}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.googleBtnInnerContainer}>
        <AppleIcon />
        <View style={{ marginHorizontal: SIZES.xs }} />
        <Text
          style={{
            ...TYPOGRAPHY.h4,
            textDecorationLine: "none",
          }}
        >
          {buttonTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const DangerButton = () => {
  return (
    <View>
      <Text>AuthButton</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xs,
    width: "90%",
    alignSelf: "center",
  },
  actionBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: "90%",
    alignSelf: "center",
  },
  defaultBtnText: {
    ...TYPOGRAPHY.h4,
    color: COLORS.white,
    textAlign: "center",
    padding: SIZES.sm,
  },
  authButtonContainer: {
    height: 54,
    alignItems: "center",
    marginTop: 24,
    marginStart: 32,
    marginEnd: 32,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#F5C51B",
  },
  forgotPassword: {
    color: COLORS.primary,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  googleBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  googleBtnInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SIZES.sm,
  },
});
