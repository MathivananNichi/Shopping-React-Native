import { StyleSheet, View } from "react-native";
import { Logo } from "../../assets/svg/logo";
import { useLocalization } from "../../hooks/translation_hooks";
import { Search } from "../../assets/svg/search";
import IconButton from "../IconButton";
import AppText from "../AppText";
import { AppTextStyles } from "../../themes";
import { ImageContainer } from "../ImageContainer";
import { Notification } from "../../assets/svg/notification";

interface HomeHeaderProps {}

export default function HomeHeader(props: HomeHeaderProps) {
  const t = useLocalization();
  return (
    <View style={styles.container}>
      <Logo />
      <View style={{ flex: 1, alignItems: "center" }}>
        <AppText style={AppTextStyles.title}>Shoppify</AppText>
      </View>
      <IconButton icon={<Search />} />
      <IconButton icon={<Notification />} />
      <ImageContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
